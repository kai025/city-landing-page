import React, { useRef, useEffect } from "react";
import {
  APIProvider,
  // biome-ignore lint/suspicious/noShadowRestrictedNames: <explanation>
  Map,
  AdvancedMarker,
  Pin,
} from "@vis.gl/react-google-maps";
import type { BlogData } from "hooks/types";

interface GoogleMapComponentProps {
  blogData: BlogData;
  center: { lat: number; lng: number };
  zoom: number;
}

const GoogleMapComponent: React.FC<GoogleMapComponentProps> = ({
  blogData,
  center,
  zoom,
}) => {
  return (
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAP_API_KEY}>
      <Map
        center={center}
        zoom={zoom}
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
