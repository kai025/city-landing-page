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

        // Transform the data into the desired format
        const transformedImages: UnsplashImage[] = response.data.results.map(
          (image: any) => ({
            id: image.id,
            alt_description: image.alt_description || "No description",
            name: image.user.name,
            profileImage: image.user.profile_image.small,
            urls: {
              full: image.urls.full,
              small: image.urls.small,
            },
          })
        );

        setImages(transformedImages);
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
