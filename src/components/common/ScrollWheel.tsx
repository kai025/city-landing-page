import { useRef, useEffect } from "react";
import { useKeywords } from "../../hooks/useKeywords";

// Utility function to convert a string to Proper Case
const toProperCase = (str: string) => {
  return str
    .toLowerCase()
    .replace(/(^|\s)\S/g, (letter) => letter.toUpperCase());
};

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

interface ScrollWheelProps {
  state: string;
  location?: string; // Optional location
  locationType?: string; // Optional locationType
  onClick: (keyword: { label: string; value: string }) => void;
}

export const ScrollWheelRight: React.FC<ScrollWheelProps> = ({
  state,
  location,
  locationType,
  onClick,
}) => {
  // Use the custom hook to fetch keywords based on state, location, and locationType
  const { keywords, loading, error } = useKeywords(
    state,
    location,
    locationType
  );

  const scrollRef = useRef<HTMLDivElement>(null);

  // Repeat the keywords multiple times to ensure sufficient content height
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

      // Initialize scrollTop to contentHeight for infinite scroll behavior
      container.scrollTop = contentHeight;

      return () => {
        container.removeEventListener("scroll", handleScroll);
      };
    }
  }, [keywords]);

  // Render loading or error states if needed
  if (loading) return <p>Loading keywords...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="scroll-wheel-right">
      <div ref={scrollRef} className="scroll-wheel-content">
        <ul>
          {repeatedKeywords.map((keyword, index) => (
            <li
              key={index}
              onClick={() =>
                onClick({ label: toProperCase(keyword), value: keyword })
              }
            >
              {toProperCase(keyword)}
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
