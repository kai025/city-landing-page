import { useState, useEffect, useRef } from "react";
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

const App: React.FC = () => {
  const { location, error: locationError } = useUserLocation();
  const [searchTerm, setSearchTerm] = useState<string>("Berlin");
  const [filteredBlogs, setFilteredBlogs] = useState<BlogData>(blogData);
  const [paddingPixel, setPaddingPixel] = useState<number>(
    window.innerHeight * 0.3
  );

  useEffect(() => {
    const handleResize = () => {
      setPaddingPixel(window.innerHeight * 0.3);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    filterBlogs(searchTerm);
  };

  const filterBlogs = (term: string) => {
    const filtered = blogData.filter((blog) =>
      blog.title.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredBlogs(filtered);
  };
  const breakpointColumnsObj = {
    default: 3,
    1400: 3,
    900: 2,
    500: 1,
  };

  return (
    <main className="relative min-h-screen bg-black">
      <header className="relative w-full" style={{ height: "60vh" }}>
        <div className="absolute inset-0 z-40">
          <MapComponent blogData={filteredBlogs} />
        </div>
        <div className="absolute top-0 left-0 right-0 mx-auto mt-4 w-full max-w-screen-lg flex items-center justify-center">
          <div className="flex items-center justify-between space-x-4 w-full">
            <form
              onSubmit={handleSearchSubmit}
              className="flex justify-center w-full mx-auto z-50"
            >
              <div className="relative w-full flex items-center px-8">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  placeholder="Search for blogs..."
                  className="py-1 px-4 w-full text-xl rounded-l-full rounded-r-full text-white bg-white bg-opacity-40"
                />
                <button
                  type="submit"
                  className="absolute right-8 p-2 text-xl rounded-r-full flex items-center justify-center h-full w-7 text-white hover:text-brandblue opacity-70 mr-2"
                >
                  <SearchIcon />
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="justify-between w-full">
          <ScrollWheelLeft />
          <ScrollWheelRight />
        </div>
      </header>
      <div
        id="gradient"
        className="relative -inset-y-[170px] z-50 h-[120px]  "
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
