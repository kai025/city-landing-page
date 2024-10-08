import React, { useState, useEffect } from "react";
import DotsIcon from "assets/icons/dots.svg";

interface CardProps {
  title: string;
  description?: string;
  url: string;
  city: string;
  image?: string;
  category?: string[];
  keywords?: string[];
  onClick?: () => void; // Optional onClick prop
}

const Card: React.FC<CardProps> = ({
  title,
  description,
  url,
  city,
  image,
  category,
  keywords,
  onClick,
}) => {
  // State to track image orientation
  const [isHorizontal, setIsHorizontal] = useState(true);

  useEffect(() => {
    if (image) {
      // Create a new Image object to determine the dimensions
      const img = new Image();
      img.src = image;

      img.onload = () => {
        setIsHorizontal(img.width > img.height);
      };
    }
  }, [image]);

  // Mapping of category values to labels and colors
  const categoryMappings: { [key: string]: { label: string; color: string } } =
    {
      hotels: { label: "Hotels", color: "#5AC1EA" },
      cruises: { label: "Cruises", color: "#5AC1EA" },
      tour_guides: { label: "Tour Guides", color: "#26bea7" },
      destinations: { label: "Destinations", color: "#ddcd70" },
      hiking: { label: "Hiking", color: "#5AC1EA" },
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

  // Main card click handler
  const handleCardClick = () => {
    console.log("Card clicked:", title);
    if (displayedCategory?.key === "place" && onClick) {
      console.log("Calling onClick prop for:", title);
      onClick();
    } else if (url) {
      console.log("Opening URL for:", title);
      window.open(url, "_blank");
    }
  };

  // Individual button click handler to prevent event propagation
  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); // Prevent the event from bubbling up to the parent div
    handleCardClick();
  };

  // Button Configuration Based on Category
  const buttonConfig = () => {
    if (
      displayedCategory?.key === "hotels" ||
      displayedCategory?.key === "tour_guides"
    ) {
      return { text: "Book" };
    } else if (displayedCategory?.key === "place") {
      return { text: "Explore" };
    }
    return { text: "" };
  };

  const { text } = buttonConfig();

  // Conditional Rendering Variable for Button Section
  const showButton = !!text;

  return (
    <div
      className={`relative group ${image ? "bg-white" : "bg-deepblue-100"} ${
        isHorizontal ? "min-h-[300px]" : "min-h-[700px]"
      } rounded-3xl overflow-hidden sm:w-full md:w-[400px] shadow-lg hover:shadow-md hover:shadow-brandblue active:shadow-lg active:shadow-brandgold transition-shadow duration-300 cursor-pointer`}
      onClick={handleCardClick} // Attach the handler directly to the card
    >
      {/* Image Background with Blur Effect on Hover */}
      {image && (
        <div
          className="absolute inset-0 bg-center bg-cover transition-all duration-200 group-hover:blur-md"
          style={{ backgroundImage: `url(${image})` }}
        />
      )}

      {/* Gradient Overlay */}
      {image && (
        <div className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-black to-transparent pointer-events-none z-10" />
      )}

      {/* Single Category Button */}
      {displayedCategory && (
        <div className="absolute top-4 right-4 z-50">
          <button
            type="button"
            className="px-2 py-1 text-white rounded-lg hover:opacity-80 transition-opacity duration-300"
            style={{ backgroundColor: displayedCategory.color }}
            onClick={
              onClick &&
              (displayedCategory.key === "destinations" ||
                displayedCategory.key === "place")
                ? onClick
                : undefined
            }
            aria-label={`Filter by ${displayedCategory.label}`}
          >
            {displayedCategory.label}
          </button>
        </div>
      )}

      {/* Title Section */}
      <div className="absolute bottom-5 left-0 w-full px-5 z-20">
        <button
          type="button"
          className={`font-medium text-2xl text-left ${
            image ? "text-white" : "text-black"
          } line-clamp-2 cursor-pointer transition-transform duration-300 transform group-hover:-translate-y-15`}
          onClick={handleCardClick}
          aria-label={`Explore ${title}`}
        >
          {title}
        </button>
      </div>

      {/* Description and Button Section with Conditional Rendering */}
      {description && (
        <div className="absolute text-left inset-0 bottom-0 flex flex-col items-center justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20 pb-5">
          <p
            className={`px-5 text-left line-clamp-2 ${
              image ? "text-white " : "text-black "
            }
            ${showButton ? " " : "-translate-y-7"}
            `}
          >
            {description}
          </p>

          {/* Conditional Rendering of Button Section */}
          {showButton && (
            <div className="mt-3 w-full flex justify-end gap-2 items-center px-5">
              <button
                type="button"
                className={`px-4 py-2 text-white rounded-full bg-deepblue-500 font-medium"
                }`}
                onClick={handleButtonClick} // Use the separate button click handler
              >
                {text}
              </button>
              <button
                type="button"
                className="w-7 h-7 text-white rounded-full bg-deepblue-500 flex justify-center items-center"
                onClick={handleButtonClick} // Prevent parent card click
              >
                <DotsIcon />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Card;
