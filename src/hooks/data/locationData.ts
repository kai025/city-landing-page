interface LocationInfo {
  center: { lat: number; lng: number };
  zoom: number;
}
export const locationData: Record<string, LocationInfo> = {
  Anywhere: {
    center: { lat: 0, lng: 0 },
    zoom: 2, // Zoom level for a global view
  },
  NorthAmerica: {
    center: { lat: 54.526, lng: -105.2551 }, // Center of North America
    zoom: 3, // Zoom level for the continent
  },
  Alaska: {
    center: { lat: 64.2008, lng: -149.4937 }, // General center of Alaska
    zoom: 5, // Zoom level for Alaska state
  },
  Anchorage: {
    center: { lat: 61.2181, lng: -149.9003 },
    zoom: 12,
  },
};
