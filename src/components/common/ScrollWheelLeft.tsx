import { useRef, useEffect, useState } from "react";
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
