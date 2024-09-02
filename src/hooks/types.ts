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
  title: string;
  url: string;
  image?: string;
}

export type BlogData = BlogEntry[];
