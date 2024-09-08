import { useRef, useEffect } from "react";
import type { LocationData } from "hooks/types";

interface ScrollWheelProps {
  onClick: (tag: { label: string; value: string }) => void;
}

export const ScrollWheelLeft: React.FC<ScrollWheelProps> = ({ onClick }) => {
  const categories = [
    { label: "Hotels", value: "hotels" },
    { label: "Cruises", value: "cruises" },
    { label: "Tour Guides", value: "tour_guides" },
    { label: "Destinations", value: "destinations" },
    { label: "Hiking", value: "hiking" },
  ];

  const scrollRef = useRef<HTMLUListElement>(null);

  // Infinite scroll logic for left wheel
  useEffect(() => {
    const listElement = scrollRef.current;
    if (listElement) {
      const handleScroll = () => {
        // When the scroll reaches the end of the first set, reset to the top of the second set
        if (listElement.scrollTop >= listElement.scrollHeight / 2) {
          listElement.scrollTop = 0;
        }
      };

      listElement.addEventListener("scroll", handleScroll);

      return () => {
        listElement.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  return (
    <div className="scroll-wheel-left z-40 text-white max-h-[300px] rounded-xl p-2 overflow-hidden">
      <ul ref={scrollRef} className="scrolling-list">
        {/* Duplicate the list items */}
        {[...categories, ...categories].map((category, index) => (
          <li
            key={index}
            onClick={() => onClick(category)}
            className="cursor-pointer"
          >
            {category.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export const ScrollWheelRight: React.FC<ScrollWheelProps> = ({ onClick }) => {
  const keywords = [
    { label: "Mountains", value: "mountains" },
    { label: "Lakes", value: "lakes" },
    { label: "Street Arts", value: "street_arts" },
    { label: "Music", value: "music" },
    { label: "Culture", value: "culture" },
    { label: "Food", value: "food" },
    { label: "Events", value: "events" },
    { label: "History", value: "history" },
    { label: "Art", value: "art" },
    { label: "Science", value: "science" },
  ];

  const scrollRef = useRef<HTMLUListElement>(null);

  // Infinite scroll logic for right wheel
  useEffect(() => {
    const listElement = scrollRef.current;
    if (listElement) {
      const handleScroll = () => {
        // When the scroll reaches the end of the first set, reset to the top of the second set
        if (listElement.scrollTop >= listElement.scrollHeight / 2) {
          listElement.scrollTop = 0;
        }
      };

      listElement.addEventListener("scroll", handleScroll);

      return () => {
        listElement.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  return (
    <div className="scroll-wheel-right z-40 text-white max-h-[300px] rounded-xl p-2 overflow-hidden">
      <ul ref={scrollRef} className="scrolling-list">
        {/* Duplicate the list items */}
        {[...keywords, ...keywords].map((keyword, index) => (
          <li
            key={index}
            onClick={() => onClick(keyword)}
            className="cursor-pointer"
          >
            {keyword.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

interface LocationInfo {
  center: { lat: number; lng: number };
  zoom: number;
}

interface ScrollWheelTopProps {
  locationData: Record<string, LocationInfo>; // Add locationData as a prop
  onLocationChange: (location: string) => void;
}

export const ScrollWheelTop: React.FC<ScrollWheelTopProps> = ({
  locationData,
  onLocationChange,
}) => {
  const locations = Object.keys(locationData); // Use locationData from props

  return (
    <div className="scroll-wheel-top text-white w-full overflow-hidden whitespace-nowrap rounded-xl p-2">
      <ul className="inline-flex justify-center w-full space-x-4">
        {locations.map((location) => (
          <li
            key={location}
            onClick={() => onLocationChange(location)}
            className="cursor-pointer"
          >
            {location}
          </li>
        ))}
      </ul>
    </div>
  );
};
