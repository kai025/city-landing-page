import React, { useState, useEffect } from "react";
import useUserLocation from "hooks/getLocation";
import type { BlogData } from "hooks/types";
import { blogData } from "hooks/data";
import Masonry from "react-masonry-css";
import Card from "components/common/Card";
import "./app.css";
import SearchIcon from "assets/icons/compass.svg";
import MapComponent from "components/common/GoogleMap";

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
      <header className="relative w-full" style={{ height: "66vh" }}>
        <div className="absolute inset-0">
          <MapComponent />
        </div>
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0, 0, 0, 0.5) 80%, rgba(0, 0, 0, 1) 100%)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 mx-auto"
          style={{ paddingBottom: `${paddingPixel / 4}px` }}
        >
          <form
            onSubmit={handleSearchSubmit}
            className="flex justify-center mb-4 max-w-screen-lg w-full mx-auto"
          >
            <div className="relative w-full flex items-center px-8">
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search for blogs..."
                className="p-2 w-full text-xl rounded-l-full rounded-r-full text-gray"
              />
              <button
                type="submit"
                className="absolute right-8 p-2 text-xl rounded-r-full flex items-center justify-center h-full w-9 text-brandblue hover:text-brandgold"
              >
                <SearchIcon />
              </button>
            </div>
          </form>
          {locationError && (
            <p className="text-red-500 text-center">{locationError}</p>
          )}
        </div>
      </header>

      <section
        className="relative z-10 flex flex-col items-center justify-center mx-auto pt-2"
        style={{
          backgroundColor: "black",
          color: "white",
          minHeight: "34vh",
        }}
      >
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
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
