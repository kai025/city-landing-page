import type React from "react";
import { useState, useEffect } from "react";
import useUserLocation from "hooks/getLocation"; // Import the custom hook for location
import type { BlogData } from "hooks/types";
import { blogData } from "hooks/data"; // Import the blog data
import Masonry from "react-masonry-css";
import Card from "components/common/Card"; // Assume this component will be adapted to handle blog data
import "./app.css"; // Add any custom CSS for Masonry here
import SearchIcon from "assets/icons/compass.svg";

const App: React.FC = () => {
  const { location, error: locationError } = useUserLocation(); // Use the custom hook
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
    <main
      className="relative min-h-screen bg-cover bg-center "
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.5) 20%, rgba(0,0,0,1) 35%), url('https://destinationwellknown.com/wp-content/uploads/2022/10/berlin-city.jpg')`,
      }}
    >
      <header
        className="relative z-10 max-w-[1700px] flex flex-col items-center justify-center mx-auto"
        style={{ paddingTop: `${paddingPixel}px` }}
      >
        <form
          onSubmit={handleSearchSubmit}
          className="flex justify-center mb-8 max-w-screen-lg w-full "
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
              className="absolute right-8 p-2 text-xl rounded-r-full flex items-center justify-center h-full w-6 text-brandblue hover:text-brandgold"
            >
              <SearchIcon />
            </button>
          </div>
        </form>
        {locationError && (
          <p className="text-red-500 text-center">{locationError}</p>
        )}
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
      </header>
    </main>
  );
};

export default App;
