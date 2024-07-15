import React from "react";
import { UnsplashImage } from "types/types";

interface CardProps {
  image: UnsplashImage;
}

const Card: React.FC<CardProps> = ({ image }) => {
  return (
    <div className="relative bg-white rounded-lg overflow-hidden">
      <img
        src={image.urls.small}
        alt={image.alt_description}
        className="w-full h-auto"
      />
      <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 w-full text-white p-2">
        <p className="text-sm">{image.alt_description}</p>
      </div>
    </div>
  );
};

export default Card;
