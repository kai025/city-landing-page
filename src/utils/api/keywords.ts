import axios from "axios";
import { API_BASE_URL } from "../../infrastructure/config";

// Helper function to convert string to proper case
const toProperCase = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

/**
 * Fetch allowed keywords based on state, location, locationType, and currentKeyword from the backend.
 * @param {string} state - The state name (e.g., 'Alaska').
 * @param {string} [location] - The location name (e.g., 'Anchorage').
 * @param {string} [locationType] - The type of location (e.g., 'city', 'state').
 * @param {string} [currentKeyword] - The current keyword.
 * @returns {Promise<string[]>} - A promise that resolves to an array of allowed keywords.
 */
export const getAllowedKeywords = async (
  state: string,
  location?: string,
  locationType?: string,
  currentKeyword?: string
): Promise<string[]> => {
  // Ensure state, location, and locationType are properly cased
  const properCasedState = toProperCase(state);
  const properCasedLocation = toProperCase(location || "");
  const properCasedLocationType = toProperCase(locationType || "");
  // Convert currentKeyword to an array of lowercase strings
  const lowerCasedKeywords = currentKeyword?.trim().toLowerCase();

  const response = await axios.get(`${API_BASE_URL}/keywords`, {
    params: {
      state: properCasedState,
      location: properCasedLocation || undefined,
      locationType: properCasedLocationType || undefined,
      currentKeywords: lowerCasedKeywords,
    },
  });
  return response.data.keywords;
};
