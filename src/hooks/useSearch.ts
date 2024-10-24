import { useState, useCallback } from "react";
import { searchLocationsByParams } from "../utils/api/search";
import type { SearchParams, ItemData } from "./types"; // Ensure proper import paths

interface SearchHookReturn {
  locations: ItemData; // Use ItemData type directly
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
export const useSearch = (initialParams?: SearchParams): SearchHookReturn => {
  const [locations, setLocations] = useState<ItemData>([]); // State for storing search results as ItemData
  const [error, setError] = useState<string | null>(null); // State for storing error message
  const [loading, setLoading] = useState<boolean>(false); // Loading state to indicate if the API call is in progress
  const [params, setParams] = useState<SearchParams | undefined>(initialParams); // The current search parameters

  // Function to fetch data from the API
  const fetchData = useCallback(async (newParams: SearchParams) => {
    setLoading(true);
    setError(null); // Reset error before making the request
    try {
      const result = await searchLocationsByParams(newParams); // Make the API call to searchLocationsByParams
      setLocations(result as ItemData); // Set the search results, ensuring they match the ItemData type
      setParams(newParams); // Update the current search parameters
    } catch (err) {
      console.error("Error fetching locations:", err); // Log the error details
      setError("Failed to fetch locations. Please try again.");
    } finally {
      setLoading(false); // Stop loading state once the API call completes
    }
  }, []);

  // Refetch function uses the latest params stored in the hook
  const refetch = useCallback(() => {
    if (params) {
      fetchData(params); // Re-fetch using the latest parameters
    }
  }, [params, fetchData]);

  return {
    locations,
    error,
    loading,
    fetchData, // Function to initiate a new search with different parameters
    refetch, // Function to refetch the data using the current parameters
  };
};
