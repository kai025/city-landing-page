interface ScrollWheelProps {
  onClick: (value: string) => void;
}

export const ScrollWheelLeft: React.FC<ScrollWheelProps> = ({ onClick }) => {
  const categories = [
    { label: "Hotels", value: "hotels" },
    { label: "Cruises", value: "cruises" },
    { label: "Tour Guides", value: "tour_guides" },
    { label: "Destinations", value: "destinations" },
    { label: "Hiking", value: "hiking" },
  ];

  return (
    <div className="scroll-wheel-left z-40 text-white max-h-[300px] bg-black bg-opacity-40 rounded-xl p-2">
      <ul>
        {categories.map((category, index) => (
          <li
            key={index}
            onClick={() => onClick(category.value)}
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

  return (
    <div className="scroll-wheel-right z-40 text-white max-h-[300px] bg-black bg-opacity-40 rounded-xl p-2">
      <ul>
        {keywords.map((keyword, index) => (
          <li
            key={index}
            onClick={() => onClick(keyword.value)}
            className="cursor-pointer"
          >
            {keyword.label}
          </li>
        ))}
      </ul>
    </div>
  );
};
