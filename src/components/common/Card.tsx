// src/components/common/Card.tsx

import React from "react";

interface CardProps {
  title: string;
  url: string;
  city: string;
  image?: string;
  category?: string[];
  keywords?: string[];
  onClick?: () => void; // Optional onClick prop
}

const Card: React.FC<CardProps> = ({
  title,
  url,
  city,
  image,
  category,
  keywords,
  onClick,
}) => {
  // Mapping of category values to labels and colors
  const categoryMappings: { [key: string]: { label: string; color: string } } =
    {
      hotels: { label: "Hotels", color: "#5AC1EA" },
      cruises: { label: "Cruises", color: "#5AC1EA" },
      tour_guides: { label: "Tour Guides", color: "#26bea7" },
      destinations: { label: "Destinations", color: "#ddcd70" },
      hiking: { label: "Hiking", color: "#8D33FF" },
      place: { label: "Places", color: "#01243e" },
    };

  // Determine the category to display (only one)
  let displayedCategory: { key: string; label: string; color: string } | null =
    null;

  if (category && category.length > 0) {
    for (const cat of category) {
      const mapping = categoryMappings[cat];
      if (mapping) {
        displayedCategory = { key: cat, ...mapping };
        break; // Stop after finding the first valid category
      }
    }
  }

  // Determine if the "Book" button should be displayed
  const showBookButton =
    category?.includes("hotels") || category?.includes("tour_guides");

  const handleCardClick = () => {
    console.log("Card clicked:", title);
    if (displayedCategory?.key === "place" && onClick) {
      console.log("Calling onClick prop for:", title);
      onClick();
    } else {
      console.log("Opening URL for:", title);
      window.open(url, "_blank");
    }
  };

  return (
    <div
      className={`relative ${
        image ? "bg-white" : "bg-deepblue-100"
      } min-h-[130px] rounded-3xl overflow-hidden sm:w-full md:w-[400px] shadow-lg hover:shadow-md hover:shadow-brandblue active:shadow-lg active:shadow-brandgold`}
    >
      {image && (
        <div className="relative cursor-pointer" onClick={handleCardClick}>
          <img src={image} alt={title} className="w-full h-auto" />
        </div>
      )}
      {image && (
        <div className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-black to-transparent pointer-events-none" />
      )}

      {/* Book Button (if applicable) */}
      {showBookButton && (
        <div className="absolute top-4 left-4 z-50">
          <a href={url} target="_blank" rel="noopener noreferrer">
            <button
              type="button"
              className="px-2 py-1 bg-brandblue text-white rounded-lg"
            >
              Book
            </button>
          </a>
        </div>
      )}

      {/* Single Category Button */}
      {displayedCategory && (
        <div className="absolute top-4 right-4 z-50">
          <button
            type="button"
            className="px-1 text-white rounded-lg"
            style={{ backgroundColor: displayedCategory.color }}
            onClick={
              onClick &&
              (displayedCategory.key === "destinations" ||
                displayedCategory.key === "place")
                ? onClick
                : undefined
            }
          >
            {displayedCategory.label}
          </button>
        </div>
      )}

      <div className="absolute bottom-4 left-0 w-full px-5 pb-2">
        <p
          className={`font-medium text-xl ${
            image ? "text-white" : "text-black"
          } line-clamp-2 cursor-pointer`}
          onClick={handleCardClick}
        >
          {title}
        </p>
      </div>
    </div>
  );
};

export default Card;
