import React, { useRef, useEffect } from "react";
import {
  APIProvider,
  // biome-ignore lint/suspicious/noShadowRestrictedNames: <explanation>
  Map,
  AdvancedMarker,
  Pin,
} from "@vis.gl/react-google-maps";
import type { BlogData } from "hooks/types";

const center = {
  lat: 52.52, // Latitude for Berlin
  lng: 13.405, // Longitude for Berlin
};

interface GoogleMapComponentProps {
  blogData: BlogData;
}

const GoogleMapComponent: React.FC<GoogleMapComponentProps> = ({
  blogData,
}) => {
  // Function to handle marker click and display the title
  const handleMarkerClick = (title: string) => {
    alert(`Marker title: ${title}`);
  };

  return (
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAP_API_KEY}>
      <Map
        center={center}
        zoom={13}
        mapId={import.meta.env.VITE_GOOGLE_MAP_ID}
        disableDefaultUI={true}
        clickableIcons={false}
      >
        {blogData.map((blog) =>
          blog.markers?.map((marker, index) => (
            <AdvancedMarker
              key={`${blog.title}-${index}`}
              position={{ lat: marker.lat, lng: marker.lng }}
              clickable={true}
              onClick={() => handleMarkerClick(blog.title)}
            >
              <img
                src="https://www.svgrepo.com/show/469486/pin-drop.svg"
                alt="Pin"
                className="w-8 h-8"
              />
            </AdvancedMarker>
          ))
        )}
      </Map>
    </APIProvider>
  );
};

export default React.memo(GoogleMapComponent);
