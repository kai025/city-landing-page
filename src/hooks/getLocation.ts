import { useState, useEffect } from "react";
import axios from "axios";

const useUserLocation = () => {
  const [location, setLocation] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLocation = async (latitude: number, longitude: number) => {
      try {
        const response = await axios.get(
          `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${
            import.meta.env.VITE_GEO_API_KEY
          }`
        );
        const location = response.data.results[0].components;
        const country = location.country;
        setLocation(country || "nature");
      } catch (error) {
        console.error("Error fetching location:", error);
        setError("Unable to fetch location");
        setLocation("nature");
      }
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchLocation(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          console.error("Error getting geolocation:", error);
          setError("Geolocation not available");
          setLocation("nature");
        }
      );
    } else {
      setError("Geolocation not supported");
      setLocation("nature");
    }
  }, []);

  return { location, error };
};

export default useUserLocation;
