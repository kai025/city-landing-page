import React, { useState, useEffect } from "react";
import SearchIcon from "assets/icons/compass.svg";
import LoadingIcon from "assets/icons/loading.svg";
import useUnsplashImages from "hooks/getImages";
import useUserLocation from "hooks/getLocation"; // Import the custom hook
import Card from "components/common/Card";
import Masonry from "react-masonry-css";
import "./app.css"; // Add any custom CSS for Masonry here

const App: React.FC = () => {
  const { location, error: locationError } = useUserLocation(); // Use the custom hook
  const [searchTerm, setSearchTerm] = useState<string>(location || "nature");
  const [searchQuery, setSearchQuery] = useState<string>(location || "nature");
  const { images, loading, error } = useUnsplashImages(searchQuery);
  const [backgroundImage, setBackgroundImage] = useState<string>("");
  const [paddingPixel, setPaddingPixel] = useState<number>(
    window.innerHeight * 0.3
  );

  useEffect(() => {
    if (location) {
      setSearchTerm(location);
      setSearchQuery(location);
    }
  }, [location]);

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
    setSearchQuery(searchTerm);
  };

  const breakpointColumnsObj = {
    default: 4,
    1600: 4,
    1400: 3,
    800: 2,
    500: 1,
  };

  return (
    <main
      className="relative min-h-screen bg-cover bg-center "
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.5) 20%, rgba(0,0,0,1) 35%), url(${backgroundImage})`,
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
          <div className="relative w-full  flex items-center px-8">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search for images..."
              className="p-2 w-full text-xl rounded-l-full rounded-r-full text-gray"
            />
            <button
              type="submit"
              className="absolute right-8 p-2 text-xl rounded-r-full flex items-center justify-center h-full w-9 text-tahiti-700 hover:text-tahiti-300"
            >
              {loading ? <LoadingIcon /> : <SearchIcon />}
            </button>
          </div>
        </form>
        {locationError && (
          <p className="text-red-500 text-center">{locationError}</p>
        )}
        {error && <p className="text-red-500 text-center">{error}</p>}
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
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
