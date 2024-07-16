import { useState, useEffect } from "react";
import axios from "axios";
import type { UnsplashImage } from "./types";

const useUnsplashImages = (query: string) => {
  const [images, setImages] = useState<UnsplashImage[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          "https://api.unsplash.com/search/photos",
          {
            params: { query, per_page: 20 },
            headers: {
              Authorization: `Client-ID ${
                import.meta.env.VITE_UNSPLASH_ACCESS_KEY
              }`,
            },
          }
        );
        setImages(response.data.results);
      } catch (error) {
        setError("Error fetching images from Unsplash.");
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [query]);

  return { images, loading, error };
};

export default useUnsplashImages;
