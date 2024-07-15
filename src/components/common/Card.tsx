import React from "react";
import { UnsplashImage } from "hooks/types";

interface CardProps {
  image: UnsplashImage;
}

const Card: React.FC<CardProps> = ({ image }) => {
  return (
    <div className="bg-white bg-opacity-75 p-4 rounded-lg">
      <img
        src={image.urls.small}
        alt={image.alt_description}
        className="rounded-lg"
      />
      <p className="mt-2 text-gray-700">{image.alt_description}</p>
    </div>
  );
};

export default Card;
