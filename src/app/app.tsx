import { useState, useEffect } from "react";
import useUserLocation from "hooks/getLocation";
import type { BlogData } from "hooks/types";
import { blogData } from "hooks/data";
import Masonry from "react-masonry-css";
import Card from "components/common/Card";
import "./app.css";
import SearchIcon from "assets/icons/search.svg";
import MapComponent from "components/common/GoogleMap";
import {
  ScrollWheelLeft,
  ScrollWheelRight,
} from "components/common/ScrollWheel";
import Logo from "assets/icons/logo.svg"; // Make sure to replace with the correct path to your logo
import MenuIcon from "assets/icons/menu.svg";
import ArrowDownIcon from "assets/icons/arrowdown.svg";
import HeartIcon from "assets/icons/heart.svg";

const App: React.FC = () => {
  const { location, error: locationError } = useUserLocation();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [tags, setTags] = useState<{ label: string; value: string }[]>([]);
  const [filteredBlogs, setFilteredBlogs] = useState<BlogData>(blogData);

  useEffect(() => {
    filterBlogs(searchTerm, tags);
  }, [searchTerm, tags]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    filterBlogs(searchTerm, tags);
  };

  const filterBlogs = (
    term: string,
    tags: { label: string; value: string }[]
  ) => {
    const lowerCaseTerm = term.toLowerCase();
    const filtered = blogData.filter((blog) => {
      const matchesSearchTerm = blog.title
        .toLowerCase()
        .includes(lowerCaseTerm);
      const matchesTags = tags.every(
        (tag) =>
          blog.category?.includes(tag.value) ||
          blog.keywords?.includes(tag.value)
      );
      return matchesSearchTerm && matchesTags;
    });
    setFilteredBlogs(filtered);
  };

  const addTag = (tag: { label: string; value: string }) => {
    if (!tags.find((t) => t.value === tag.value)) {
      setTags([...tags, tag]);
    }
  };

  const removeTag = (tagToRemove: { label: string; value: string }) => {
    setTags(tags.filter((tag) => tag.value !== tagToRemove.value));
  };

  const breakpointColumnsObj = {
    default: 3,
    1400: 3,
    900: 2,
    500: 1,
  };

  return (
    <main className="relative min-h-screen bg-black w-full">
      <header className="relative w-full" style={{ height: "60vh" }}>
        <div className="absolute inset-0 z-40">
          <MapComponent blogData={filteredBlogs} />
        </div>
        <div className="absolute top-0 mt-4 w-full flex items-center justify-between  space-x-2">
          <div className="h-10 text-white z-50 flex items-center">
            <Logo />
          </div>
          <div className="z-50 flex items-center -mt-1 px-2">
            <span className="text-white  text-xl">Explore</span>
          </div>
          <form
            onSubmit={handleSearchSubmit}
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
                <button
                  type="submit"
                  className="absolute right-2 p-2 text-xl rounded-r-full flex items-center justify-center h-full w-7 text-white hover:text-brandblue opacity-70 mr-2"
                >
                  <SearchIcon />
                </button>
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
                className="w-8 h-8 rounded-full"
                src="https://thirdparty-public-apps-media.canva-apps.com/v2/BAFQ3grMMX4/UAD4fzC6B1c/AAFuTC_kRuA/3/thumbnail/9dd5e1fe-16eb-43bb-904d-5152f1fc6847.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAQYCGKMUH2E7WUW5F%2F20240903%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240903T113150Z&X-Amz-Expires=360351&X-Amz-Signature=a50bc9d5924935692b78510277a5279bfa8f29ee0b55889f9c8be6bac2693050&X-Amz-SignedHeaders=host&response-expires=Sat%2C%2007%20Sep%202024%2015%3A37%3A41%20GMT"
                alt="search"
              />
            </button>
            <div className="z-50 text-white w-5 h-5 flex-none flex items-center justify-center">
              <MenuIcon />
            </div>
          </div>
        </div>
        <div className="justify-between w-full">
          <ScrollWheelLeft onClick={addTag} />
          <ScrollWheelRight onClick={addTag} />
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
        className="relative z-10 flex flex-col items-center justify-center mx-auto -inset-y-[190px]"
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
          {filteredBlogs.map((blog, index) => (
            <div key={blog.title}>
              <Card
                title={blog.title}
                url={blog.url}
                city={blog.city}
                image={blog.image}
              />
            </div>
          ))}
        </Masonry>
      </section>
    </main>
  );
};

export default App;
