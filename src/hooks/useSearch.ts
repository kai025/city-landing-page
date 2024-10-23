import { useState, useCallback } from "react";
import { searchLocationsByParams } from "../utils/api/search";

interface SearchParams {
  state: string;
  location?: string;
  locationType?: string; // Assuming you need locationType as well
  nodeTypes: string[];
  keywords: string[];
  userInput: string;
}

interface SearchHookReturn<T> {
  locations: T[];
  error: string | null;
  loading: boolean;
  fetchData: (params: SearchParams) => Promise<void>;
  refetch: () => void;
}

/**
 * Custom hook to fetch locations based on search parameters
 * @param initialParams - The initial search parameters (optional)
 * @returns {SearchHookReturn} - State variables and actions to trigger search and refetch
 */
export const useSearch = <T = any>(
  initialParams?: SearchParams
): SearchHookReturn<T> => {
  const [locations, setLocations] = useState<T[]>([]); // Search results with generic type
  const [error, setError] = useState<string | null>(null); // Error state
  const [loading, setLoading] = useState<boolean>(false); // Loading state
  const [params, setParams] = useState<SearchParams | undefined>(initialParams); // The search parameters

  // Function to fetch data from the API
  const fetchData = useCallback(async (newParams: SearchParams) => {
    setLoading(true);
    setError(null); // Reset error before making the request
    try {
      const result = await searchLocationsByParams(newParams); // API call
      setLocations(result); // Set the search results
      setParams(newParams); // Update the current search parameters
    } catch (err) {
      console.error("Error fetching locations:", err); // Log the error details
      setError("Failed to fetch locations. Please try again.");
    } finally {
      setLoading(false); // Stop loading state
    }
  }, []);

  // Refetch function uses the latest params stored in the hook
  const refetch = useCallback(() => {
    if (params) {
      fetchData(params);
    }
  }, [params, fetchData]);

  return {
    locations,
    error,
    loading,
    fetchData, // Call this to search with new parameters
    refetch, // Call this to refetch the data with the latest parameters
  };
};
