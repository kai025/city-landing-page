import React, { useState, useEffect } from "react";
import SearchIcon from "assets/icons/compass.svg";
import LoadingIcon from "assets/icons/loading.svg";
import useUnsplashImages from "hooks/getImages";
import Card from "components/common/Card";
import Masonry from "react-masonry-css";
import "./app.css"; // Add any custom CSS for Masonry here

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("nature");
  const [searchQuery, setSearchQuery] = useState<string>("nature"); // New state for the actual search query
  const { images, loading, error } = useUnsplashImages(searchQuery); // Use searchQuery instead of searchTerm
  const [backgroundImage, setBackgroundImage] = useState<string>("");
  const [paddingPixel, setPaddingPixel] = useState<number>(
    window.innerHeight * 0.3
  );

  useEffect(() => {
    if (images.length > 0) {
      setBackgroundImage(images[0].urls.full);
    }
  }, [images]);

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
    setSearchQuery(searchTerm); // Update the search query state
  };

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  return (
    <main
      className="relative min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.5) 20%, rgba(0,0,0,1) 35%), url(${backgroundImage})`,
      }}
    >
      <header
        className="relative z-10 max-w-screen-lg xl:max-w-screen-xl mx-auto"
        style={{ paddingTop: `${paddingPixel}px` }}
      >
        <form
          onSubmit={handleSearchSubmit}
          className="flex justify-center mb-12"
        >
          <div className="relative w-full max-w-screen-lg flex items-center px-8">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search for images..."
              className="p-2 w-full text-xl rounded-l-full rounded-r-full"
            />
            <button
              type="submit"
              className="absolute right-8 p-2 text-xl rounded-r-full flex items-center justify-center h-full w-9 text-tahiti-700  hover:text-tahiti-300"
            >
              {loading ? <LoadingIcon /> : <SearchIcon />}
            </button>
          </div>
        </form>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid px-6"
          columnClassName="my-masonry-grid_column"
        >
          {images.slice(1).map((image) => (
            <Card key={image.id} image={image} />
          ))}
        </Masonry>
      </header>
    </main>
  );
};

export default App;
