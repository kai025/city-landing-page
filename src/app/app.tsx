import React, { useState, useEffect, useCallback, useMemo } from "react";
import type { BlogData } from "hooks/types";
import { locationData } from "hooks/data/locationData";
import { blogData } from "hooks/data/locationData"; // Corrected import
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
import Logo from "assets/icons/logo.svg";
import MenuIcon from "assets/icons/menu.svg";
import ArrowDownIcon from "assets/icons/arrowdown.svg";
import HeartIcon from "assets/icons/heart.svg";
import LoadingIcon from "assets/icons/loading.svg";
import getDirections from "hooks/getDirections";
import ExploreCover from "components/common/ExploreCover";

// Import a default cover image
import defaultCover from "assets/images/coverimage.jpg";

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [submittedSearchTerm, setSubmittedSearchTerm] = useState<string>("");
  const [tags, setTags] = useState<{ label: string; value: string }[]>([]);
  const [isExploreMode, setIsExploreMode] = useState<boolean>(false);

  // New state to keep track of selected city and its image
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [selectedCityImage, setSelectedCityImage] = useState<
    string | undefined
  >(undefined);

  // Use the getDirections hook
  const { processSearch, results, extractedKeywords, loading, error } =
    getDirections();

  // Initialize the results state with the default blog data
  const [filteredBlogs, setFilteredBlogs] = useState<BlogData>(blogData);

  // Set a default location name
  const defaultLocation = import.meta.env.VITE_DEFAULT_LOCATION || "Anchorage";
  const initialLocation = locationData[defaultLocation];

  if (!initialLocation) {
    console.error(
      `Initial location not found for defaultLocation: ${defaultLocation}`
    );
    // Provide fallback values or handle the error accordingly
    return null; // Or render an error message
  }

  const [mapCenter, setMapCenter] = useState(initialLocation.center);
  const [mapZoom, setMapZoom] = useState(initialLocation.zoom);

  // State to keep track of the selected location name
  const [selectedLocationName, setSelectedLocationName] =
    useState<string>(defaultLocation);

  // Function to handle location changes
  const handleLocationChange = (location: string) => {
    if (locationData[location]) {
      setMapCenter(locationData[location].center);
      setMapZoom(locationData[location].zoom);
      setSelectedLocationName(location);
    } else {
      console.error("Location not found in locationData:", location);
    }
  };

  // Function to handle the "Explore" button click
  const handleExploreClick = (city: string, image?: string) => {
    setIsExploreMode(true);
    setSelectedCity(city);
    setSelectedCityImage(image);
    // Filter the blogs by the city
    const filtered = blogData.filter((blog) => blog.city === city);
    setFilteredBlogs(filtered);
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Update the map to center on the selected city
    if (locationData[city]) {
      setMapCenter(locationData[city].center);
      setMapZoom(locationData[city].zoom);
    }
  };

  // Function to handle going back from Explore mode
  const handleBack = () => {
    setIsExploreMode(false);
    setSelectedCity("");
    setSelectedCityImage(undefined);
    setFilteredBlogs(blogData); // Reset to the original blog data

    // Reset the map to the default location
    setMapCenter(initialLocation.center);
    setMapZoom(initialLocation.zoom);
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
    addTag(category);
  };

  // Filter by keyword from ScrollWheelRight
  const filterByKeyword = (keyword: { label: string; value: string }) => {
    addTag(keyword);
  };

  // Handle search input changes
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Handle search form submission
  const handleSearchSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsExploreMode(false);
    setSelectedCity("");
    setSelectedCityImage(undefined);
    // Update the submitted search term
    setSubmittedSearchTerm(searchTerm);

    // Call processSearch with the search term
    await processSearch(searchTerm);
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

  // Update filteredBlogs when results from getDirections change
  useEffect(() => {
    if (isExploreMode) {
      // Do not overwrite filteredBlogs when in explore mode
      return;
    }
    if (results.length > 0) {
      // If we have results from getDirections, use them
      setFilteredBlogs(results);
    } else if (submittedSearchTerm !== "") {
      // No results found for the search term
      setFilteredBlogs([]);
    } else if (tags.length > 0) {
      // If no results from getDirections, filter locally based on tags
      filterBlogs();
    } else {
      // If no search term, no tags, and not in explore mode, show all blogs
      setFilteredBlogs(blogData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [results, submittedSearchTerm, tags, isExploreMode, filterBlogs]);

  // Re-filter blogs when tags change
  useEffect(() => {
    if (tags.length > 0 && submittedSearchTerm === "" && !isExploreMode) {
      filterBlogs();
    }
  }, [tags, filterBlogs, submittedSearchTerm, isExploreMode]);

  const breakpointColumnsObj = {
    default: 3,
    1400: 3,
    900: 2,
    500: 1,
  };

  // Memoize mapCenter, mapZoom, and filteredBlogs
  const memoizedMapCenter = useMemo(() => mapCenter, [mapCenter]);
  const memoizedMapZoom = useMemo(() => mapZoom, [mapZoom]);
  const memoizedFilteredBlogs = useMemo(() => filteredBlogs, [filteredBlogs]);

  // Get the cover image URL for the selected city
  let coverImageUrl = selectedCityImage;

  // If no cover image is found, use a default cover image
  if (!coverImageUrl) {
    coverImageUrl = defaultCover;
  }

  return (
    <main className="relative min-h-screen bg-black w-full">
      {/* Header and other components */}
      <header
        className="relative w-full flex items-center justify-center"
        style={{ height: "70vh" }}
      >
        <div className="absolute inset-0 z-30">
          <MapComponent
            blogData={memoizedFilteredBlogs}
            center={memoizedMapCenter}
            zoom={memoizedMapZoom}
          />
        </div>
        <div className="absolute top-0 mt-4 w-full flex items-center justify-between space-x-2">
          <div className="h-10 text-white z-40 flex items-center">
            <Logo />
          </div>
          <button type="button" className="z-50 flex items-center -mt-1 px-2">
            <span className="text-white opacity-60 text-xl">Explore</span>
          </button>
          <form
            onSubmit={handleSearchSubmit}
            className="flex justify-center items-center z-40 w-full"
          >
            <div className="relative w-full flex items-center px-8 ">
              <div className="relative w-full flex items-center backdrop-blur-lg">
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
          <div className="z-40 flex items-center justify-center w-1/4 space-x-4 mx-4 pr-4">
            <button
              type="button"
              className="flex items-center rounded-full p-2 w-7 h-7 bg-white bg-opacity-40 justify-center hover:bg-opacity-60"
            >
              <div className="z-40 text-white w-5 h-5 flex-none">
                <HeartIcon />
              </div>
            </button>

            <button type="button" className="flex items-center space-x-2">
              <div className="z-40 text-white w-4 h-4 flex-none opacity-60">
                <ArrowDownIcon />
              </div>
              <span className="text-white opacity-60">Hannah</span>
              <img
                className="w-8 h-8 rounded-full object-cover"
                src="your-profile-image-url"
                alt="profile"
              />
            </button>
            <div className="z-40 text-white w-5 h-5 flex-none flex items-center justify-center">
              <MenuIcon />
            </div>
          </div>
        </div>
        <div className="z-40 w-full flex max-w-2xl items-center justify-center absolute top-0 mt-14 align-middle">
          <ScrollWheelTop
            locationData={locationData}
            onLocationChange={handleLocationChange}
          />
        </div>
        <div className="justify-between w-full">
          <ScrollWheelLeft onClick={filterByCategory} />
          <ScrollWheelRight onClick={filterByKeyword} />
        </div>
      </header>
      <div
        id="gradient"
        className="relative -inset-y-[170px] z-30 h-[120px]"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0, 0, 0, 0) 5%, rgba(0, 0, 0, 1) 50%)",
        }}
      />
      <section
        className="relative flex flex-col items-center justify-center mx-auto -inset-y-[200px]"
        style={{
          backgroundColor: "black",
          color: "white",
          minHeight: "30vh",
        }}
      >
        {loading && <p>Loading...</p>}
        <div className="z-50 max-w-[1500px]">
          {isExploreMode && (
            <div className="relative w-full -inset-y-[600px]">
              <ExploreCover
                city={selectedCity}
                image={selectedCityImage || defaultCover}
                onClose={handleBack}
              />
            </div>
          )}
          {filteredBlogs.length === 0 && !loading && (
            <p className="text-white">
              No results found for "{submittedSearchTerm}"
            </p>
          )}
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className={`my-masonry-grid -mt-10 relative ${
              isExploreMode ? "-inset-y-[500px]" : ""
            }`}
            columnClassName="my-masonry-grid_column"
          >
            {filteredBlogs.map((blog) => (
              <div key={blog.title}>
                <Card
                  title={blog.title}
                  description={blog.description}
                  url={blog.url}
                  city={blog.city}
                  image={blog.image}
                  category={blog.category}
                  keywords={blog.keywords}
                  onClick={() => handleExploreClick(blog.city, blog.image)}
                />
              </div>
            ))}
          </Masonry>
        </div>
      </section>
    </main>
  );
};

export default App;
