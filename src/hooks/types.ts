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

export interface BlogEntry {
  city: string;
  description?: string;
  title: string;
  url: string;
  image?: string;
  category?: string[];
  keywords?: string[];
  markers?: { lat: number; lng: number }[];
}

export type BlogData = BlogEntry[];

export type LocationData = Record<
  string,
  { center: { lat: number; lng: number }; zoom: number }
>;
