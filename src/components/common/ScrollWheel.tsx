import "app/app.css";

export const ScrollWheelLeft: React.FC = () => {
  return (
    <div className="scroll-wheel-left z-40 text-white max-h-[300px] bg-black bg-opacity-40 rounded-xl  p-2">
      <ul>
        <li>Hotels</li>
        <li>Cruises</li>
        <li>Tour Guides</li>
        <li>Destinations</li>
        <li>Hiking</li>
      </ul>
    </div>
  );
};

export const ScrollWheelRight: React.FC = () => {
  return (
    <div className="scroll-wheel-right z-40 text-white max-h-[300px] bg-black bg-opacity-40 rounded-xl  p-2">
      <ul>
        <li>Mountains</li>
        <li>Lakes</li>
        <li>Street Arts</li>
        <li>Music</li>
        <li>Culture</li>
        <li>Food</li>
        <li>Events</li>
        <li>History</li>
        <li>Art</li>
        <li>Science</li>
      </ul>
    </div>
  );
};

export default ScrollWheelRight;
