import React, { useRef } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { mapStyle } from "components/style/GoogleMap";

const containerStyle = {
  width: "100%",
  height: "100%", // Ensure the map takes up the full height of its container
};

const center = {
  lat: 52.52, // Latitude for Berlin
  lng: 13.405, // Longitude for Berlin
};

const mapOptions = {
  disableDefaultUI: true,
  styles: mapStyle, // Use your custom map style
};

const MapComponent: React.FC<{ setMap: (map: google.maps.Map) => void }> = ({
  setMap,
}) => {
  const mapRef = useRef<google.maps.Map | null>(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_API_KEY, // Replace with your API key
  });

  const onLoad = (map: google.maps.Map) => {
    mapRef.current = map;
    setMap(map);
  };

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={12}
      options={mapOptions}
      onLoad={onLoad}
    >
      {/* Add markers or other components if needed */}
    </GoogleMap>
  );
};

export default React.memo(MapComponent);
