import { useRef, useEffect, useState } from "react";
import { useKeywords } from "../../hooks/useKeywords";

// Utility function to convert a string to Proper Case
const toProperCase = (str: string) => {
  return str
    .toLowerCase()
    .replace(/(^|\s)\S/g, (letter) => letter.toUpperCase());
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
  // **currentKeyword state** to control API fetching
  const [currentKeyword, setCurrentKeyword] = useState<string | undefined>(
    undefined
  );

  // **selectedKeyword** for UI display without affecting `currentKeyword`
  const [selectedKeyword, setSelectedKeyword] = useState<string | undefined>(
    undefined
  );

  // Use the custom hook to fetch keywords based on state, location, locationType, and currentKeyword
  const { keywords, loading, error } = useKeywords(
    state,
    location,
    locationType,
    currentKeyword // Use currentKeyword for fetching
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
  }, [keywords]); // Only refresh on keywords change

  // **Handle keyword clicks**
  const handleKeywordClick = (keyword: string) => {
    // Update both selected and current keyword
    setSelectedKeyword(keyword);
    setCurrentKeyword(keyword); // Trigger re-fetch with the clicked keyword

    // Trigger the onClick callback to add the keyword as a tag
    onClick({ label: toProperCase(keyword), value: keyword });
  };

  return (
    <div className="scroll-wheel-right">
      <div ref={scrollRef} className="scroll-wheel-content">
        <ul>
          {repeatedKeywords.map((keyword, index) => (
            <li key={index} onClick={() => handleKeywordClick(keyword)}>
              {toProperCase(keyword)}
            </li>
          ))}
        </ul>
        {selectedKeyword && (
          <div className="selected-keyword">
            Selected: {toProperCase(selectedKeyword)}
          </div>
        )}
      </div>
    </div>
  );
};
