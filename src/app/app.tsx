// App.tsx

import type React from "react";
import { useState, useEffect, useMemo } from "react";
import { locationData } from "hooks/data/locationData";
import Masonry from "react-masonry-css";
import Card from "components/common/Card";
import "./app.css";
import SearchIcon from "assets/icons/search.svg";
import MapComponent from "components/common/GoogleMap";
import { ScrollWheelRight } from "components/common/ScrollWheelRight";
import { ScrollWheelLeft } from "components/common/ScrollWheelLeft";
import { ScrollWheelTop } from "components/common/ScrollWheelTop";
import Logo from "assets/icons/logo.svg";
import MenuIcon from "assets/icons/menu.svg";
import ArrowDownIcon from "assets/icons/arrowdown.svg";
import HeartIcon from "assets/icons/heart.svg";
import LoadingIcon from "assets/icons/loading.svg";
import ExploreCover from "components/common/ExploreCover";
import { useSearch } from "hooks/useSearch";
import { defaultCover } from "../infrastructure/config";
import type { ItemEntry, SearchParams, Tag, LocationInfo } from "hooks/types";

const App: React.FC = () => {
  const defaultLocation = (import.meta.env.VITE_CITY as string) || "Anchorage";
  const defaultState = (import.meta.env.VITE_STATE as string) || "Alaska";

  const initialLocation =
    locationData[defaultState] || (locationData.Alaska as LocationInfo);
  const [selectedLocationType, setSelectedLocationType] =
    useState<string>("state");
  const [selectedLocationName, setSelectedLocationName] = useState<string>(
    defaultState === defaultLocation ? "" : defaultLocation
  );

  // State variables
  const [tags, setTags] = useState<Tag[]>([]);
  const [searchInput, setSearchInput] = useState<string>("");
  const [isExploreMode, setIsExploreMode] = useState<boolean>(false);
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [selectedLocationImage, setSelectedLocationImage] = useState<
    string | undefined
  >(undefined);
  const [submittedSearchTerm, setSubmittedSearchTerm] = useState<string>("");

  // Map state
  const [mapCenter, setMapCenter] = useState<{ lat: number; lng: number }>(
    initialLocation.center
  );
  const [mapZoom, setMapZoom] = useState<number>(initialLocation.zoom);

  const [items, setItems] = useState<ItemEntry[]>([]);

  // Use the custom search hook with only 'state' as a parameter
  const {
    locations,
    error: searchError,
    loading: searchLoading,
    fetchData: fetchSearchData,
  } = useSearch();

  // Memoized values for performance optimization
  const memoizedMapCenter = useMemo(() => mapCenter, [mapCenter]);
  const memoizedMapZoom = useMemo(() => mapZoom, [mapZoom]);
  const memoizedItems = useMemo(() => items, [items]);

  // Initial data fetch on component mount
  useEffect(() => {
    const initialSearchParams: SearchParams = {
      state: defaultState,
      keywords: ["hiking", "cruises"],
      userInput: "",
    };
    fetchSearchData(initialSearchParams);
  }, [fetchSearchData, defaultState]);

  const handleLocationChange = (location: string): void => {
    const locationInfo = locationData[location] as LocationInfo;
    if (locationInfo) {
      setMapCenter(locationInfo.center);
      setMapZoom(locationInfo.zoom);
      setSelectedLocation(location);
      if (locationInfo.locationType === "state") {
        setSelectedLocationType("state");
        setSelectedLocationName(locationInfo.name);
      } else {
        setSelectedLocationType(locationInfo.locationType);
        setSelectedLocationName(locationInfo.name);
      }
    } else {
      // Reset to default state if location data is not found
      setSelectedLocation("");
      setSelectedLocationImage(undefined);
      setSelectedLocationName(defaultState);
      setSelectedLocationType(""); // Reset locationType
    }
  };

  // Handle the Explore button click
  const handleExploreClick = (location: string, image?: string): void => {
    setIsExploreMode(true);
    setSelectedLocation(location);
    setSelectedLocationImage(image);
    window.scrollTo({ top: 0, behavior: "smooth" });

    const locationInfo = locationData[location] as LocationInfo;
    if (locationInfo) {
      setMapCenter(locationInfo.center);
      setMapZoom(locationInfo.zoom);
    }
  };

  // Exit explore mode
  const handleBack = (): void => {
    setIsExploreMode(false);
    setSelectedLocation("");
    setSelectedLocationImage(undefined);
    setItems([]);
    setMapCenter(initialLocation.center);
    setMapZoom(initialLocation.zoom);
  };

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchInput(e.target.value);
  };

  // Add a tag to the tags state
  const addTag = (type: Tag["type"], label: string): void => {
    setTags((prevTags) => {
      if (!prevTags.some((tag) => tag.type === type && tag.label === label)) {
        return [...prevTags, { type, label }];
      }
      return prevTags;
    });
  };

  // Remove a tag from the tags state
  const removeSearchTag = (tagToRemove: Tag): void => {
    setTags((prevTags) => prevTags.filter((tag) => tag !== tagToRemove));
  };

  // Handle nodeType and keyword clicks
  const handleNodeTypeClick = (tag: { label: string; value: string }): void =>
    addTag("nodeTypes", tag.label);
  const handleKeywordClick = (tag: { label: string; value: string }): void =>
    addTag("keywords", tag.label);

  // Handle search form submission
  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setIsExploreMode(false);
    setSelectedLocationImage(undefined);

    if (searchInput.trim() !== "") {
      addTag("userInput", searchInput.trim());
      setSearchInput("");
    }
  };

  // Update search results when tags change
  useEffect(() => {
    const nodeTypes = tags
      .filter((tag) => tag.type === "nodeTypes")
      .map((tag) => tag.label);
    const keywords = tags
      .filter((tag) => tag.type === "keywords")
      .map((tag) => tag.label);
    const userInput = tags
      .filter((tag) => tag.type === "userInput")
      .map((tag) => tag.label)
      .join(" ");

    setSubmittedSearchTerm([...nodeTypes, ...keywords, userInput].join(" "));

    const searchParams: SearchParams = {
      state: defaultState,
      keywords,
      userInput,
    };
    fetchSearchData(searchParams);
  }, [tags, fetchSearchData, defaultState]);

  // Handle search results
  useEffect(() => {
    if (isExploreMode) return;

    if (locations.length > 0) {
      setItems(locations);
    } else {
      setItems([]);
    }
  }, [locations, isExploreMode]);

  // Masonry grid breakpoint configuration
  const breakpointColumnsObj = {
    default: 3,
    1400: 3,
    900: 2,
    500: 1,
  };

  return (
    <main className="relative min-h-screen bg-black w-full">
      {/* Header */}
      <header
        className="relative w-full flex items-center justify-center"
        style={{ height: "70vh" }}
      >
        {/* Map Component */}
        <div className="absolute inset-0 z-30">
          <MapComponent
            itemData={memoizedItems}
            center={memoizedMapCenter}
            zoom={memoizedMapZoom}
          />
        </div>

        {/* Top Navigation */}
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
            <div className="relative w-full flex items-center px-8">
              <div className="relative w-full flex items-center backdrop-blur-lg">
                <div className="flex items-center flex-wrap w-full bg-white bg-opacity-40 rounded-full border border-transparent backdrop-blur-lg px-2 py-1">
                  {tags.map((tag, index) => (
                    <div
                      key={index}
                      className={`flex items-center py-1 px-2 rounded-full m-1 text-sm border ${
                        tag.type === "nodeTypes"
                          ? "border-blue-500 text-black"
                          : tag.type === "keywords"
                          ? "border-green-500 text-black"
                          : "border-gray-500 text-black"
                      }`}
                    >
                      {tag.label}
                      <button
                        type="button"
                        className="ml-2 text-sm"
                        onClick={() => removeSearchTag(tag)}
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                  <input
                    type="text"
                    value={searchInput}
                    onChange={handleSearchChange}
                    placeholder="Search anything..."
                    className="py-1 px-2 text-sm text-white bg-transparent flex-grow outline-none border border-transparent rounded-full"
                    style={{ minWidth: "150px" }}
                  />
                </div>
                {searchLoading ? (
                  <div className="absolute right-2 p-2 text-xl rounded-r-full flex items-center justify-center w-7 h-7 text-white mr-2">
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

        {/* Scroll Wheels */}
        <div className="z-40 w-full flex max-w-2xl items-center justify-center absolute top-0 mt-14 align-middle">
          <ScrollWheelTop
            locationData={locationData}
            onLocationChange={handleLocationChange}
          />
        </div>
        <div className="justify-between w-full">
          <ScrollWheelLeft onClick={handleNodeTypeClick} />
          <ScrollWheelRight
            state={defaultState}
            location={
              selectedLocationType === "state" ? undefined : selectedLocation
            }
            onClick={handleKeywordClick}
          />
        </div>
      </header>

      {/* Gradient Overlay */}
      <div
        id="gradient"
        className="relative -inset-y-[170px] z-30 h-[120px]"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0, 0, 0, 0) 5%, rgba(0, 0, 0, 1) 50%)",
        }}
      />

      {/* Main Content */}
      <section
        className="relative flex flex-col items-center justify-center mx-auto -inset-y-[200px]"
        style={{
          backgroundColor: "black",
          color: "white",
          minHeight: "30vh",
        }}
      >
        {searchLoading && <p>Loading...</p>}
        {searchError && <p className="text-red-500">{searchError}</p>}
        <div className="z-50 max-w-[1500px]">
          {isExploreMode && (
            <div className="relative w-full -inset-y-[600px]">
              <ExploreCover
                location={selectedLocation}
                image={selectedLocationImage || defaultCover}
                onClose={handleBack}
              />
            </div>
          )}
          {items.length === 0 && !searchLoading && submittedSearchTerm && (
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
            {items.map((item) => (
              <div key={item.title}>
                <Card
                  title={item.title}
                  description={item.description}
                  url={item.url}
                  image={item.image}
                  nodeTypes={item.nodeTypes}
                  keywords={item.keywords}
                  onClick={() =>
                    handleExploreClick(item.title || "", item.image)
                  }
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
