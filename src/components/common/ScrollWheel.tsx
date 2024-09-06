import { useRef, useEffect } from "react";

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

  // Remove the automatic scrolling logic

  return (
    <div className="scroll-wheel-left z-40 text-white max-h-[300px] rounded-xl p-2 overflow-hidden">
      <ul ref={scrollRef} className="scrolling-list">
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

  // Remove the automatic scrolling logic

  return (
    <div className="scroll-wheel-right z-40 text-white max-h-[300px] rounded-xl p-2 overflow-hidden">
      <ul ref={scrollRef} className="scrolling-list">
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

export const ScrollWheelTop: React.FC = () => {
  return (
    <div className="scroll-wheel-top text-white w-full overflow-hidden whitespace-nowrap rounded-xl p-2">
      <ul className="inline-flex justify-center w-full space-x-4">
        <li>Anywhere</li>
        <li>Europe</li>
        <li>Germany</li>
        <li>Berlin</li>
      </ul>
    </div>
  );
};
