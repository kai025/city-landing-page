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

  const scrollRef = useRef<HTMLDivElement>(null);

  // Duplicate the list items multiple times to ensure sufficient content height
  const repeatedCategories = Array(5).fill(categories).flat();

  useEffect(() => {
    const container = scrollRef.current;
    if (container) {
      const contentHeight = container.scrollHeight / 2;

      const handleScroll = () => {
        const maxScrollTop = container.scrollHeight - container.clientHeight;

        if (container.scrollTop >= maxScrollTop) {
          container.scrollTop = container.scrollTop - contentHeight;
        } else if (container.scrollTop <= 0) {
          container.scrollTop = container.scrollTop + contentHeight;
        }
      };

      container.addEventListener("scroll", handleScroll);

      // Initialize scrollTop to contentHeight to allow infinite scrolling in both directions
      container.scrollTop = contentHeight;

      return () => {
        container.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  return (
    <div className="scroll-wheel-left">
      <div ref={scrollRef} className="scroll-wheel-content">
        <ul>
          {repeatedCategories.map((category, index) => (
            <li key={index} onClick={() => onClick(category)}>
              {category.label}
            </li>
          ))}
        </ul>
      </div>
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

  const scrollRef = useRef<HTMLDivElement>(null);

  const repeatedKeywords = Array(3).fill(keywords).flat();

  useEffect(() => {
    const container = scrollRef.current;
    if (container) {
      const contentHeight = container.scrollHeight / 2;

      const handleScroll = () => {
        const maxScrollTop = container.scrollHeight - container.clientHeight;

        if (container.scrollTop >= maxScrollTop) {
          container.scrollTop = container.scrollTop - contentHeight;
        } else if (container.scrollTop <= 0) {
          container.scrollTop = container.scrollTop + contentHeight;
        }
      };

      container.addEventListener("scroll", handleScroll);

      container.scrollTop = contentHeight;

      return () => {
        container.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  return (
    <div className="scroll-wheel-right">
      <div ref={scrollRef} className="scroll-wheel-content">
        <ul>
          {repeatedKeywords.map((keyword, index) => (
            <li key={index} onClick={() => onClick(keyword)}>
              {keyword.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
interface LocationInfo {
  center: { lat: number; lng: number };
  zoom: number;
}

interface ScrollWheelTopProps {
  locationData: Record<string, LocationInfo>;
  onLocationChange: (location: string) => void;
}

export const ScrollWheelTop: React.FC<ScrollWheelTopProps> = ({
  locationData,
  onLocationChange,
}) => {
  const locations = Object.keys(locationData);

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
