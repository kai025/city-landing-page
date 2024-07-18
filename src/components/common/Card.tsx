import React, { useState } from "react";
import type { UnsplashImage } from "hooks/types";
import HeartIcon from "assets/icons/heart.svg";
import HeartFilledIcon from "assets/icons/heartfilled.svg";

interface CardProps {
  image: UnsplashImage;
}

const Card: React.FC<CardProps> = ({ image }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative bg-white rounded-3xl overflow-hidden sm:w-full md:w-[450px] shadow-lg hover:shadow-md hover:shadow-brandblue active:shadow-lg active:shadow-brandgold">
      <div className="relative">
        <img
          src={image.urls.small}
          alt={image.alt_description}
          className="w-full h-auto"
        />
        <div className="w-full absolute top-4 flex items-center space-x-2 justify-between px-5">
          <div className="flex items-center space-x-2">
            {image.profileImage && (
              <img
                src={image.profileImage}
                alt={image.name}
                className="w-7 h-7 rounded-full"
              />
            )}
            <span className="text-sm font-medium line-clamp-2 max-w-[90px] text-white">
              {image.name}
            </span>
          </div>
          <div
            className="w-6 h-6 text-white"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {isHovered ? <HeartFilledIcon /> : <HeartIcon />}
          </div>
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black to-transparent" />
      <div className="absolute bottom-4 left-0 w-full px-5 pb-2">
        <p className="font-medium text-xl text-white line-clamp-2">
          {image.alt_description}
        </p>
      </div>
    </div>
  );
};

export default Card;
