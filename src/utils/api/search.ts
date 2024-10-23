import axios from "axios";
import { API_BASE_URL } from "../../infrastructure/config";

// Helper function to convert string to proper case
const toProperCase = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

interface SearchParams {
  state: string; // Added state to the interface
  location?: string;
  locationType?: string;
  nodeTypes?: string[];
  keywords?: string[];
  userInput?: string;
}

/**
 * Fetch locations based on search parameters from the backend.
 * @param {SearchParams} params - The search parameters
 * @returns {Promise<object[]>} - A promise that resolves to the list of locations
 */
export const searchLocationsByParams = async (params: SearchParams) => {
  // Ensure state, location, and locationType are properly cased
  const properCasedState = toProperCase(params.state);
  const properCasedLocation = toProperCase(params.location || "");
  const properCasedLocationType = toProperCase(params.locationType || "");

  const response = await axios.post(`${API_BASE_URL}/search`, {
    ...params,
    state: properCasedState,
    location: properCasedLocation,
    locationType: properCasedLocationType,
  });
  return response.data;
};

/**
 * Fetch allowed keywords based on state, location, and location type from the backend.
 * @param {string} state - The state name (e.g., 'Alaska').
 * @param {string} location - The location name (e.g., 'Anchorage').
 * @param {string} locationType - The type of location (e.g., 'city', 'state').
 * @returns {Promise<string[]>} - A promise that resolves to an array of allowed keywords.
 */
export const getAllowedKeywords = async (
  state: string,
  location?: string,
  locationType?: string
): Promise<string[]> => {
  // Ensure state, location, and locationType are properly cased
  const properCasedState = toProperCase(state);
  const properCasedLocation = toProperCase(location || "");
  const properCasedLocationType = toProperCase(locationType || "");

  const response = await axios.get(`${API_BASE_URL}/keywords`, {
    params: {
      state: properCasedState,
      location: properCasedLocation,
      locationType: properCasedLocationType,
    },
  });
  return response.data.keywords;
};
