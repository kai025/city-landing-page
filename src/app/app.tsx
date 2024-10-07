import React, { useState, useEffect, useCallback, useMemo } from "react";
import type { BlogData } from "hooks/types";
import { locationData } from "hooks/data/anchorage";
import { blogData } from "hooks/data/anchorage";
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

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [submittedSearchTerm, setSubmittedSearchTerm] = useState<string>("");
  const [tags, setTags] = useState<{ label: string; value: string }[]>([]);

  // Use the getDirections hook
  const { processSearch, results, extractedKeywords, loading, error } =
    getDirections();

  // Initialize the results state with the default blog data
  const [filteredBlogs, setFilteredBlogs] = useState<BlogData>(blogData);

  const initialLocation =
    locationData[import.meta.env.VITE_CITY as keyof typeof locationData] ||
    locationData["DefaultCity"]; // Fallback to a default city if VITE_CITY is not set

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
    } else if (submittedSearchTerm !== "") {
      // No results found for the search term
      setFilteredBlogs([]);
    } else if (tags.length > 0) {
      // If no results from getDirections, filter locally based on tags
      filterBlogs();
    } else {
      // If no search term and no tags, show all blogs
      setFilteredBlogs(blogData);
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
  }, [tags, filterBlogs, submittedSearchTerm]);

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

  return (
    <main className="relative min-h-screen bg-black w-full">
      <header
        className="relative w-full flex items-center justify-center"
        style={{ height: "70vh" }}
      >
        <div className="absolute inset-0 z-40">
          <MapComponent
            blogData={memoizedFilteredBlogs}
            center={memoizedMapCenter}
            zoom={memoizedMapZoom}
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
                src="your-profile-image-url"
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
          <ScrollWheelLeft onClick={filterByCategory} />
          <ScrollWheelRight onClick={filterByKeyword} />
        </div>
      </header>
      <div
        id="gradient"
        className="relative -inset-y-[170px] z-40 h-[120px]"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0, 0, 0, 0) 5%, rgba(0, 0, 0, 1) 50%)",
        }}
      />
      <section
        className="relative z-10 flex flex-col items-center justify-center mx-auto -inset-y-[190px]"
        style={{
          backgroundColor: "black",
          color: "white",
          minHeight: "30vh",
        }}
      >
        <div className="relative -inset-y-[90px] z-50">
          {extractedKeywords.length > 0 && (
            <div className="text-white text-center mb-4">
              <p>Search Keywords: [{extractedKeywords.join(", ")}]</p>
            </div>
          )}
          {filteredBlogs.length === 0 && !loading && (
            <p className="text-white">
              No results found for "{submittedSearchTerm}"
            </p>
          )}
        </div>
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid -mt-10"
          columnClassName="my-masonry-grid_column"
        >
          {loading && <p>Loading...</p>}
          {filteredBlogs.map((blog) => (
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
