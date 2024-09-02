export const mapStyle: google.maps.MapTypeStyle[] = [
  {
    elementType: "geometry",
    stylers: [
      {
        color: "#336c63", // Darker blue background
      },
    ],
  },
  {
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#8ec3b9", // Light grey labels
      },
    ],
  },
  {
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#1a3646", // Darker stroke for text
      },
    ],
  },
  {
    featureType: "administrative",
    elementType: "geometry",
    stylers: [
      {
        color: "#1a2b48", // Slightly different dark blue for borders
      },
    ],
  },
  {
    featureType: "administrative.country",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#6b9a76", // Subtle green for country labels
      },
    ],
  },
  {
    featureType: "administrative.land_parcel",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#64779e", // Neutral blue-grey for land parcels
      },
    ],
  },
  {
    featureType: "administrative.locality",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#d1d1d1", // Lighter grey for locality labels
      },
    ],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [
      {
        color: "#304a7d", // Darker blue for roads
      },
    ],
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#98a5be", // Light blue-grey for road labels
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [
      {
        color: "#2c6675", // Slightly darker for highways
      },
    ],
  },
  {
    featureType: "transit",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#8ec3b9", // Light cyan for transit labels
      },
    ],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [
      {
        color: "#17263c", // Dark blue for water bodies
      },
    ],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#4e6d70", // Grey-blue for water labels
      },
    ],
  },
  // Remove POI labels (including shopping malls and other POIs)
  {
    featureType: "poi",
    elementType: "labels",
    stylers: [
      {
        visibility: "off", // Turn off labels for POIs
      },
    ],
  },
  // Remove POI icons
  {
    featureType: "poi",
    elementType: "geometry",
    stylers: [
      {
        visibility: "off", // Turn off icons for POIs
      },
    ],
  },
  // Specifically targeting shopping malls (optional)
  {
    featureType: "poi.business",
    elementType: "labels",
    stylers: [
      {
        visibility: "off", // Turn off labels for businesses like shopping malls
      },
    ],
  },
];
