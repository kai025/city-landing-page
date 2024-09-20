import { useState, useEffect, type SetStateAction } from "react";
import Papa from "papaparse";

export interface CSVDataItem {
  place_id: string;
  keywords: string;
  country: string;
  city: string;
  location_name: string;
  location_address: string;
  lat: number; // Changed from string to number
  lng: number; // Changed from string to number
  location_rating: number; // Ensure this is also a number
  blog_url: string;
  location_google_types: string;
  postcode: string;
  photo_uri: string;
}

const getCSVData = (csvFilePath: string) => {
  const [data, setData] = useState<CSVDataItem[]>([]);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetch(csvFilePath)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.text();
      })
      .then((csvText) => {
        Papa.parse<CSVDataItem>(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            setData(results.data);
          },
          error: (err: SetStateAction<Error | null>) => {
            setError(err);
          },
        });
      })
      .catch((err) => {
        setError(err);
      });
  }, [csvFilePath]);

  return { data, error };
};

export default getCSVData;
