import React from "react";
import { UnsplashImage } from "hooks/types";

interface CardProps {
  image: UnsplashImage;
}

const Card: React.FC<CardProps> = ({ image }) => {
  return (
    <div className="relative bg-white rounded-2xl overflow-hidden sm:w-full md:w-[350px] shadow-lg">
      <div className="relative">
        <img
          src={image.urls.small}
          alt={image.alt_description}
          className="w-full h-auto"
        />
        <div className="w-full absolute top-4 flex items-center space-x-2 justify-between px-4">
          <div className="flex items-center space-x-2">
            {image.profileImage && (
              <img
                src={image.profileImage}
                alt={image.name}
                className="w-7 h-7 rounded-full"
              />
            )}
            <span className=" text-xs line-clamp-2 max-w-[90px]">
              {image.name}
            </span>
          </div>
          <span className=" text-sm">90% Match</span>
        </div>
      </div>
      <div className="absolute bottom-2 left-0 w-full px-4 pb-2 ">
        <p className="font-medium text-lg line-clamp-2">
          {image.alt_description}
        </p>
      </div>
    </div>
  );
};

export default Card;
