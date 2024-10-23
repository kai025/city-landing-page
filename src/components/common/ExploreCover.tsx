interface ExploreCoverProps {
  location: string;
  image: string;
  onClose: () => void;
}

const ExploreCover: React.FC<ExploreCoverProps> = ({
  location,
  image,
  onClose,
}) => {
  return (
    <div className="w-full ">
      <img
        src={image}
        alt={`Cover for ${location}`}
        className="w-full object-cover rounded-3xl shadow-xl h-[500px]"
      />
      <button
        type="button"
        className="absolute top-4 right-4 text-white text-3xl font-bold bg-black bg-opacity-50 rounded-full w-6 h-6 flex items-center justify-center"
        onClick={onClose}
        aria-label="Close Explore Mode"
      >
        &times;
      </button>
      <div className="absolute bottom-8 left-8 text-white">
        <span className="text-xl italic">Explore</span>
        <br />
        <span className="text-5xl font-bold">{location}</span>
      </div>
    </div>
  );
};

export default ExploreCover;
