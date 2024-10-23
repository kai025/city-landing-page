// Determine the API base URL based on the environment
const getApiBaseUrl = () => {
  if (import.meta.env.VITE_ENV === "development") {
    return "http://localhost:8000/api";
  }
  if (import.meta.env.VITE_ENV === "production") {
    return "https://travelzoom-backend-dev-acehd6d6gxd7eyc9.westeurope-01.azurewebsites.net/api";
  }
  return "http://localhost:8000/api";
};

// Export the API base URL
export const API_BASE_URL = getApiBaseUrl();

// Import a default cover image
export const defaultCover = "assets/images/coverimage.jpg";
