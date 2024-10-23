import React, { useState, useEffect, useMemo } from "react";
import { locationData } from "hooks/data/locationData";
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
import ExploreCover from "components/common/ExploreCover";
import { useSearch } from "hooks/useSearch";
import { defaultCover } from "../infrastructure/config";

interface Tag {
  type: "nodeTypes" | "keywords" | "userInput";
  label: string;
}

const App: React.FC = () => {
  const [tags, setTags] = useState<Tag[]>([]);
  const [searchInput, setSearchInput] = useState<string>("");
  const [submittedSearchTerm, setSubmittedSearchTerm] = useState<string>("");
  const [isExploreMode, setIsExploreMode] = useState<boolean>(false);

  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [selectedLocationImage, setSelectedLocationImage] = useState<
    string | undefined
  >(undefined);

  const {
    locations,
    error: searchError,
    loading: searchLoading,
    fetchData: fetchSearchData,
  } = useSearch();

  const [items, setItems] = useState<any[]>([]); // Renamed from blogs
  const defaultLocation = import.meta.env.VITE_CITY;
  const defaultLocationType = "city";
  const defaultState = import.meta.env.VITE_STATE;
  const initialLocation = locationData[defaultLocation];

  if (!initialLocation) {
    console.error(
      `Initial location not found for defaultLocation: ${defaultLocation}`
    );
    return null;
  }

  const [mapCenter, setMapCenter] = useState(initialLocation.center);
  const [mapZoom, setMapZoom] = useState(initialLocation.zoom);

  const [selectedLocationName, setSelectedLocationName] =
    useState<string>(defaultLocation);

  const handleLocationChange = (location: string) => {
    if (locationData[location]) {
      setMapCenter(locationData[location].center);
      setMapZoom(locationData[location].zoom);
      setSelectedLocationName(location);
    } else {
      console.error("Location not found in locationData:", location);
    }
  };

  const handleExploreClick = (location: string, image?: string) => {
    setIsExploreMode(true);
    setSelectedLocation(location);
    setSelectedLocationImage(image);
    window.scrollTo({ top: 0, behavior: "smooth" });

    if (locationData[location]) {
      setMapCenter(locationData[location].center);
      setMapZoom(locationData[location].zoom);
    }
  };

  const handleBack = () => {
    setIsExploreMode(false);
    setSelectedLocation("");
    setSelectedLocationImage(undefined);
    setItems([]);

    setMapCenter(initialLocation.center);
    setMapZoom(initialLocation.zoom);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const handleSearchSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsExploreMode(false);
    setSelectedLocation("");
    setSelectedLocationImage(undefined);

    // Add searchInput to tags if it's not empty
    if (searchInput.trim() !== "") {
      setTags((prevTags) => {
        if (
          !prevTags.some(
            (tag) =>
              tag.type === "userInput" && tag.label === searchInput.trim()
          )
        ) {
          return [
            ...prevTags,
            { type: "userInput", label: searchInput.trim() },
          ];
        }
        return prevTags;
      });
      setSearchInput("");
    }

    // Construct the search parameters
    const nodeTypes = tags
      .filter((tag) => tag.type === "nodeTypes")
      .map((tag) => tag.label);
    const keywords = tags
      .filter((tag) => tag.type === "keywords")
      .map((tag) => tag.label);
    const userInputs = tags
      .filter((tag) => tag.type === "userInput")
      .map((tag) => tag.label);

    const searchParams = {
      state: defaultState,
      location: selectedLocationName,
      nodeTypes,
      keywords,
      userInput: userInputs.join(" "),
    };

    const searchTerm = [...nodeTypes, ...keywords, ...userInputs].join(" ");
    setSubmittedSearchTerm(searchTerm);
    await fetchSearchData(searchParams);
  };

  // Function to handle nodeTypes clicks from the left scroll wheel
  const handleNodeTypeClick = (tag: { label: string; value: string }) => {
    setTags((prevTags) => {
      if (
        !prevTags.some(
          (existingTag) =>
            existingTag.type === "nodeTypes" && existingTag.label === tag.label
        )
      ) {
        return [...prevTags, { type: "nodeTypes", label: tag.label }];
      }
      return prevTags;
    });
  };

  // Function to handle keyword clicks from the right scroll wheel
  const handleKeywordClick = (tag: { label: string; value: string }) => {
    setTags((prevTags) => {
      if (
        !prevTags.some(
          (existingTag) =>
            existingTag.type === "keywords" && existingTag.label === tag.label
        )
      ) {
        return [...prevTags, { type: "keywords", label: tag.label }];
      }
      return prevTags;
    });
  };

  const removeSearchTag = (tagToRemove: Tag) => {
    setTags((prevTags) => prevTags.filter((tag) => tag !== tagToRemove));
  };

  // Update search when tags change
  useEffect(() => {
    const nodeTypes = tags
      .filter((tag) => tag.type === "nodeTypes")
      .map((tag) => tag.label);
    const keywords = tags
      .filter((tag) => tag.type === "keywords")
      .map((tag) => tag.label);
    const userInputs = tags
      .filter((tag) => tag.type === "userInput")
      .map((tag) => tag.label);

    const searchParams = {
      state: defaultState,
      location: selectedLocationName,
      nodeTypes,
      keywords,
      userInput: userInputs.join(" "),
    };

    const searchTerm = [...nodeTypes, ...keywords, ...userInputs].join(" ");
    setSubmittedSearchTerm(searchTerm);

    if (tags.length > 0) {
      fetchSearchData(searchParams);
    } else {
      // If no tags, clear the items
      setItems([]);
    }
  }, [tags]);

  useEffect(() => {
    if (isExploreMode) {
      return;
    }
    if (locations.length > 0) {
      const transformedItems = locations.map((item) => ({
        title: item.name,
        description: item.description,
        url: item.url,
        location: item.location,
        image: item.imageUrl,
        nodeTypes: item.nodeType, // Updated from nodeType to nodeTypes
        keywords: item.keywords,
      }));
      setItems(transformedItems);
    } else if (submittedSearchTerm !== "") {
      setItems([]);
    } else {
      setItems([]);
    }
  }, [locations, submittedSearchTerm, isExploreMode]);

  const breakpointColumnsObj = {
    default: 3,
    1400: 3,
    900: 2,
    500: 1,
  };

  const memoizedMapCenter = useMemo(() => mapCenter, [mapCenter]);
  const memoizedMapZoom = useMemo(() => mapZoom, [mapZoom]);
  const memoizedItems = useMemo(() => items, [items]);

  return (
    <main className="relative min-h-screen bg-black w-full">
      {/* Header and other components */}
      <header
        className="relative w-full flex items-center justify-center"
        style={{ height: "70vh" }}
      >
        <div className="absolute inset-0 z-30">
          <MapComponent
            itemData={memoizedItems}
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
                <div className="flex items-center flex-wrap w-full bg-white bg-opacity-40 rounded-full border border-transparent backdrop-blur-lg px-2 py-1">
                  {tags.map((tag, index) => (
                    <div
                      // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
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
        <div className="z-40 w-full flex max-w-2xl items-center justify-center absolute top-0 mt-14 align-middle">
          <ScrollWheelTop
            locationData={locationData}
            onLocationChange={handleLocationChange}
          />
        </div>
        <div className="justify-between w-full">
          <ScrollWheelLeft state={defaultState} onClick={handleNodeTypeClick} />
          <ScrollWheelRight
            state={defaultState} // Pass defaultState here
            locationType={defaultLocationType} // Pass defaultLocationType here
            onClick={handleKeywordClick}
          />{" "}
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
                  location={item.location}
                  image={item.image}
                  nodeTypes={item.nodeTypes}
                  keywords={item.keywords}
                  onClick={() => handleExploreClick(item.location, item.image)}
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
