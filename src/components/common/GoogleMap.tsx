import React from "react";
import { APIProvider, Map, AdvancedMarker } from "@vis.gl/react-google-maps";
import type { ItemData } from "hooks/types";

interface GoogleMapComponentProps {
  itemData: ItemData;
  center: { lat: number; lng: number };
  zoom: number;
}

const GoogleMapComponent: React.FC<GoogleMapComponentProps> = ({
  itemData,
  center,
  zoom,
}) => {
  const mapKey = `${center.lat}-${center.lng}-${zoom}`;

  return (
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAP_API_KEY}>
      <Map
        key={mapKey} // Add key prop to force re-render
        defaultCenter={center}
        defaultZoom={zoom}
        mapId={import.meta.env.VITE_GOOGLE_MAP_ID}
        disableDefaultUI={true}
        clickableIcons={false}
      >
        {itemData.map((item) =>
          item.markers?.map((loc, index) => (
            <AdvancedMarker
              key={`${item.title}-${index}`}
              position={{ lat: loc.lat, lng: loc.lng }}
              clickable={true}
            >
              <div className="marker-content">
                <img
                  src="https://www.svgrepo.com/show/469486/pin-drop.svg"
                  alt="Pin"
                  className="w-8 h-8"
                />
              </div>
            </AdvancedMarker>
          ))
        )}
      </Map>
    </APIProvider>
  );
};

export default React.memo(GoogleMapComponent);
