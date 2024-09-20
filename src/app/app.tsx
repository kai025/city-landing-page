import { useState, useEffect, useCallback } from "react";
import useUserLocation from "hooks/getLocation";
import type { BlogData, LocationData } from "hooks/types";
import { locationData } from "hooks/data/anchorage";
import { blogData } from "hooks/data/anchorage"; // Import blog data
import Masonry from "react-masonry-css";
import Card from "components/common/Card";
import "./app.css";
import SearchIcon from "assets/icons/search.svg";
import MapComponent from "components/common/GoogleMap";
import {
  ScrollWheelLeft,
  ScrollWheelRight,
  ScrollWheelTop,
} from "components/common/ScrollWheel";
import Logo from "assets/icons/logo.svg"; // Replace with the correct path to your logo
import MenuIcon from "assets/icons/menu.svg";
import ArrowDownIcon from "assets/icons/arrowdown.svg";
import HeartIcon from "assets/icons/heart.svg";
import LoadingIcon from "assets/icons/loading.svg";
import getDirections from "hooks/getDirections"; // Import the getDirections hook

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  // New state variable to hold the submitted search term
  const [submittedSearchTerm, setSubmittedSearchTerm] = useState<string>("");

  const [tags, setTags] = useState<{ label: string; value: string }[]>([]);

  // Use the getDirections hook
  const { processSearch, results, loading, error, extractedKeywords } =
    getDirections();

  // Initialize the results state with the default blog data
  const [filteredBlogs, setFilteredBlogs] = useState<BlogData>(blogData);

  const initialLocation =
    locationData[import.meta.env.VITE_CITY as keyof typeof locationData];
  const [mapCenter, setMapCenter] = useState(initialLocation.center);
  const [mapZoom, setMapZoom] = useState(initialLocation.zoom);

  // Function to handle location changes
  const handleLocationChange = (location: string) => {
    if (locationData[location]) {
      setMapCenter(locationData[location].center);
      setMapZoom(locationData[location].zoom);
    } else {
      console.error("Location not found in locationData:", location);
    }
  };

  // Mapping of keyword values to labels
  const keywordOptions = [
    { label: "Mountains", value: "mountains" },
    { label: "Lakes", value: "lakes" },
    { label: "Street Arts", value: "street_arts" },
    { label: "Music", value: "music" },
    { label: "Culture", value: "culture" },
    { label: "Food", value: "food" },
    { label: "Events", value: "events" },
    { label: "History", value: "history" },
    { label: "Art", value: "art" },
    { label: "Science", value: "science" },
    // Add more keywords as needed
  ];

  // Add a tag
  const addTag = (tag: { label: string; value: string }) => {
    if (!tags.some((t) => t.value === tag.value)) {
      setTags((prevTags) => [...prevTags, tag]);
    }
  };

  const removeTag = (tagToRemove: { label: string; value: string }) => {
    setTags((prevTags) =>
      prevTags.filter((tag) => tag.value !== tagToRemove.value)
    );
  };

  // State to control whether to show all tags or limit to 3
  const [showAllTags, setShowAllTags] = useState<boolean>(false);

  // Filter by category from ScrollWheelLeft
  const filterByCategory = (category: { label: string; value: string }) => {
    addTag(category); // Add the category as a tag
  };

  // Filter by keyword from ScrollWheelRight
  const filterByKeyword = (keyword: { label: string; value: string }) => {
    addTag(keyword); // Add the keyword as a tag
  };

  // Handle search input changes
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Handle search form submission
  const handleSearchSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Update the submitted search term
    setSubmittedSearchTerm(searchTerm);

    // Clear previous results and extracted keywords
    setFilteredBlogs([]);
    // If you have setExtractedKeywords in your getDirections hook
    // setExtractedKeywords([]);

    // Call processSearch with the search term
    await processSearch(searchTerm);

    // After processSearch completes, perform filtering
    if (results.length > 0) {
      setFilteredBlogs(results);
    } else if (tags.length > 0) {
      filterBlogs();
    } else {
      setFilteredBlogs(blogData);
    }
  };

  // Filter blogs based on tags
  const filterBlogs = useCallback(() => {
    const filtered = blogData.filter((blog) => {
      const matchesTags = tags.every(
        (tag) =>
          blog.category?.includes(tag.value) ||
          blog.keywords?.includes(tag.value)
      );
      return matchesTags;
    });
    setFilteredBlogs(filtered);
  }, [tags]);

  // Add extracted keywords as tags after form submission
  useEffect(() => {
    if (extractedKeywords && extractedKeywords.length > 0) {
      extractedKeywords.forEach((keyword) => {
        const tagExists = tags.some((t) => t.value === keyword);
        if (!tagExists) {
          const keywordOption = keywordOptions.find(
            (opt) => opt.value === keyword
          );
          if (keywordOption) {
            addTag(keywordOption);
          } else {
            // If label not found, use value as label (capitalize first letter)
            addTag({
              label: keyword.charAt(0).toUpperCase() + keyword.slice(1),
              value: keyword,
            });
          }
        }
      });
      // After adding extracted keywords as tags, filter the blogs
      if (tags.length > 0) {
        filterBlogs();
      }
    }
  }, [extractedKeywords]);

  const breakpointColumnsObj = {
    default: 3,
    1400: 3,
    900: 2,
    500: 1,
  };

  return (
    <main className="relative min-h-screen bg-black w-full">
      <header
        className="relative w-full flex items-center justify-center"
        style={{ height: "70vh" }}
      >
        <div className="absolute inset-0 z-40">
          <MapComponent
            blogData={filteredBlogs}
            center={mapCenter}
            zoom={mapZoom}
          />
        </div>
        <div className="absolute top-0 mt-4 w-full flex items-center justify-between space-x-2">
          <div className="h-10 text-white z-50 flex items-center">
            <Logo />
          </div>
          <div className="z-50 flex items-center -mt-1 px-2">
            <span className="text-white opacity-60 text-xl">Explore</span>
          </div>
          <form
            onSubmit={handleSearchSubmit}
            className="flex justify-center items-center z-50 w-full"
          >
            <div className="relative w-full flex items-center px-8 ">
              <div className="relative w-full flex items-center  backdrop-blur-lg">
                <div className="flex items-center flex-wrap w-full bg-white bg-opacity-40 rounded-l-full rounded-r-full border border-transparent backdrop-blur-lg">
                  {/* Render up to 3 tags or all tags based on showAllTags state */}
                  {(showAllTags ? tags : tags.slice(0, 3)).map((tag) => (
                    <div
                      key={tag.value}
                      className="flex items-center bg-white bg-opacity-50 text-black py-1 px-2 rounded-full m-1"
                    >
                      {tag.label}
                      <button
                        type="button"
                        className="ml-2 text-sm"
                        onClick={() => removeTag(tag)}
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    placeholder="Search anything..."
                    className="py-1 px-4 text-xl text-white bg-transparent flex-grow outline-none border border-transparent rounded-full"
                    style={{ minWidth: "150px" }}
                  />
                </div>
                {loading ? (
                  <div className="absolute right-2 p-2 text-xl rounded-r-full flex items-center justify-center  w-7 h-7 text-white mr-2">
                    <LoadingIcon />
                  </div>
                ) : (
                  <button
                    type="submit"
                    className="absolute right-2 p-2 text-xl rounded-r-full flex items-center justify-center h-full w-7 text-white hover:text-brandblue opacity-70 mr-2"
                  >
                    <SearchIcon />
                  </button>
                )}
              </div>
            </div>
          </form>
          <div className="z-50 flex items-center justify-center w-1/4 space-x-4 mx-4 pr-4">
            <button
              type="button"
              className="flex items-center rounded-full p-2 w-7 h-7 bg-white bg-opacity-40 justify-center hover:bg-opacity-60"
            >
              <div className="z-50 text-white w-5 h-5 flex-none">
                <HeartIcon />
              </div>
            </button>

            <button type="button" className="flex items-center space-x-2">
              <div className="z-50 text-white w-4 h-4 flex-none opacity-60">
                <ArrowDownIcon />
              </div>
              <span className="text-white opacity-60">Hannah</span>
              <img
                className="w-8 h-8 rounded-full object-cover"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6Hb5xzFZJCTW4cMqmPwsgfw-gILUV7QevvQ&s"
                alt="profile"
              />
            </button>
            <div className="z-50 text-white w-5 h-5 flex-none flex items-center justify-center">
              <MenuIcon />
            </div>
          </div>
        </div>
        <div className="z-50 w-full flex max-w-2xl items-center justify-center absolute top-0 mt-14 align-middle">
          <ScrollWheelTop
            locationData={locationData}
            onLocationChange={handleLocationChange}
          />
        </div>
        <div className="justify-between w-full">
          <ScrollWheelLeft onClick={filterByCategory} />{" "}
          {/* Filter by category */}
          <ScrollWheelRight onClick={filterByKeyword} />{" "}
          {/* Filter by keyword */}
        </div>
      </header>
      <div
        id="gradient"
        className="relative -inset-y-[170px] z-50 h-[120px]"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0, 0, 0, 0) 5%, rgba(0, 0, 0, 1) 50%)",
        }}
      />
      <section
        className="relative z-10 flex flex-col items-center justify-center mx-auto -inset-y-[200px]"
        style={{
          backgroundColor: "black",
          color: "white",
          minHeight: "30vh",
        }}
      >
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid -mt-10"
          columnClassName="my-masonry-grid_column"
        >
          {loading && <p>Loading...</p>}
          {filteredBlogs.map((blog, index) => (
            <div key={blog.title}>
              <Card
                title={blog.title}
                url={blog.url}
                city={blog.city}
                image={blog.image}
                category={blog.category}
                keywords={blog.keywords}
              />
            </div>
          ))}
        </Masonry>
      </section>
    </main>
  );
};

export default App;
