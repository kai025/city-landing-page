import { useState, useEffect, useCallback } from "react";
import { getAllowedKeywords } from "../utils/api/search";

// Helper function to convert string to proper case
const toProperCase = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

/**
 * Custom hook to fetch allowed keywords based on state, location, and location type from the backend.
 * @param {string} state - The state name (e.g., 'Alaska').
 * @param {string} [location] - The location name (e.g., 'Anchorage'). Optional.
 * @param {string} [locationType] - The type of the location (e.g., 'city', 'state'). Optional.
 * @returns {object} - An object containing keywords, loading, error, and a refetch function.
 */
export const useKeywords = (
  state: string,
  location?: string,
  locationType?: string
) => {
  const [keywords, setKeywords] = useState<string[]>([]); // State for storing keywords
  const [loading, setLoading] = useState<boolean>(false); // State for loading
  const [error, setError] = useState<string | null>(null); // State for error

  // Function to fetch keywords from the backend based on state, location, and locationType
  const fetchKeywords = useCallback(async () => {
    setLoading(true);
    setError(null); // Reset error state before making the request

    try {
      // Ensure state, location, and locationType are properly cased
      const properCasedState = toProperCase(state);
      const properCasedLocation = location ? toProperCase(location) : undefined;
      const properCasedLocationType = locationType
        ? toProperCase(locationType)
        : undefined;

      const fetchedKeywords = await getAllowedKeywords(
        properCasedState,
        properCasedLocation,
        properCasedLocationType
      );
      setKeywords(fetchedKeywords); // Update the keywords state
    } catch (err) {
      setError("Failed to fetch keywords from the backend.");
    } finally {
      setLoading(false); // Stop loading state
    }
  }, [state, location, locationType]);

  // Fetch keywords when state, location, or locationType changes
  useEffect(() => {
    if (state) {
      fetchKeywords();
    }
  }, [state, location, locationType, fetchKeywords]);

  return {
    keywords,
    loading,
    error,
    refetch: fetchKeywords, // Refetch function for manual re-trigger
  };
};
