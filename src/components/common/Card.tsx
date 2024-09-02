import type React from "react";
import { useState } from "react";
import HeartIcon from "assets/icons/heart.svg";
import HeartFilledIcon from "assets/icons/heartfilled.svg";

interface CardProps {
  title: string;
  url: string;
  city: string;
  image?: string;
}

const Card: React.FC<CardProps> = ({ title, url, city, image }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className="block">
      <div
        className={`relative ${
          image ? "bg-white" : "bg-deepblue-100"
        } min-h-[130px] rounded-3xl overflow-hidden sm:w-full md:w-[400px] shadow-lg hover:shadow-md hover:shadow-brandblue active:shadow-lg active:shadow-brandgold`}
      >
        {image && (
          <div className="relative">
            <img src={image} alt={title} className="w-full h-auto" />
          </div>
        )}
        {image && (
          <div className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-black to-transparent" />
        )}
        <div className="w-full absolute top-4 flex items-center space-x-2 justify-end px-5">
          <div
            className="w-6 h-6 text-white"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {isHovered ? <HeartFilledIcon /> : <HeartIcon />}
          </div>
        </div>

        <div className="absolute bottom-4 left-0 w-full px-5 pb-2">
          <p
            className={`font-medium text-xl ${
              image ? "text-white" : "text-black"
            } line-clamp-2`}
          >
            {title}
          </p>
        </div>
      </div>
    </a>
  );
};

export default Card;
