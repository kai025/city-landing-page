import type { LocationInfo } from "../../hooks/types";

interface ScrollWheelTopProps {
  locationData: Record<string, LocationInfo>;
  onLocationChange: (location: string) => void;
}

export const ScrollWheelTop: React.FC<ScrollWheelTopProps> = ({
  locationData,
  onLocationChange,
}) => {
  const locations = Object.keys(locationData);

  return (
    <div className="scroll-wheel-top text-white w-full overflow-hidden whitespace-nowrap rounded-xl p-2">
      <ul className="inline-flex justify-center w-full space-x-4">
        {locations.map((location) => (
          <li
            key={location}
            onClick={() => onLocationChange(location)}
            className="cursor-pointer"
          >
            {location}
          </li>
        ))}
      </ul>
    </div>
  );
};
