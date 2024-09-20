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
  const { processSearch, results, loading, error } = getDirections();

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

  // Add a tag and filter the blogs accordingly
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

  // Filter by category from ScrollWheelLeft
  const filterByCategory = (category: { label: string; value: string }) => {
    addTag(category); // Add the category as a tag
    // No need to call filterBlogs here because useEffect will handle it
  };

  // Filter by keyword from ScrollWheelRight
  const filterByKeyword = (keyword: { label: string; value: string }) => {
    addTag(keyword); // Add the keyword as a tag
    // No need to call filterBlogs here because useEffect will handle it
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

    // Call processSearch with the search term
    await processSearch(searchTerm);
  };

  // Update filteredBlogs when results from getDirections change
  useEffect(() => {
    if (results.length > 0) {
      // If we have results from getDirections, use them
      setFilteredBlogs(results);
    } else if (submittedSearchTerm === "" && tags.length === 0) {
      // If no search term and no tags, show all blogs
      setFilteredBlogs(blogData);
    } else {
      // If no results from getDirections, filter locally based on tags
      filterBlogs();
    }
  }, [results, submittedSearchTerm, tags]);

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

  // Re-filter blogs when tags change
  useEffect(() => {
    if (tags.length > 0 && submittedSearchTerm === "") {
      filterBlogs();
    }
  }, [tags, filterBlogs]);

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
            onSubmit={handleSearchSubmit} // Handle search when form is submitted
            className="flex justify-center items-center z-50 w-full"
          >
            <div className="relative w-full flex items-center px-8 ">
              <div className="relative w-full flex items-center  backdrop-blur-lg">
                <div className="flex items-center flex-wrap w-full bg-white bg-opacity-40 rounded-l-full rounded-r-full border border-transparent backdrop-blur-lg">
                  {tags.map((tag) => (
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
                    style={{ minWidth: "150px" }} // Ensures some space for typing even when tags are present
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
                src="data:image/jpeg;base64,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"
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
