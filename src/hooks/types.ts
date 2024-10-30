export interface UnsplashImage {
  id: string;
  alt_description: string;
  name: string;
  profileImage: string;
  urls: {
    full: string;
    small: string;
  };
}

export interface ItemEntry {
  city: string;
  description?: string;
  title: string;
  url: string;
  image?: string;
  nodeTypes?: string[];
  keywords?: string[];
  markers?: { lat: number; lng: number }[];
}

export type ItemData = ItemEntry[];

export interface MapLocation {
  center: { lat: number; lng: number };
  zoom: number;
}

export type LocationDataMap = Record<string, MapLocation>;

export interface SearchParams {
  state: string;
  location?: string;
  locationType?: string;
  nodeTypes?: string[];
  keywords: string[];
  userInput: string;
}

export interface Tag {
  type: "nodeTypes" | "keywords" | "userInput";
  label: string;
}

export interface LocationDataItem {
  center: { lat: number; lng: number };
  zoom: number;
  locationType: string;
  name: string;
}

export interface LocationInfo {
  center: { lat: number; lng: number };
  zoom: number;
  locationType?: string;
  name?: string;
}
