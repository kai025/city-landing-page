interface CardProps {
  title: string;
  url: string;
  city: string;
  image?: string;
  category?: string[];
  keywords?: string[];
}

const Card: React.FC<CardProps> = ({ title, url, city, image, category }) => {
  // Mapping of category values to labels
  const categoryMappings: { [key: string]: string } = {
    hotels: "Hotels",
    cruises: "Cruises",
    tour_guides: "Tour Guides",
    destinations: "Destinations",
    hiking: "Hiking",
  };

  // Get the labels for the categories
  const categoryLabels = category
    ?.map((cat) => categoryMappings[cat])
    .filter(Boolean); // Filter out any undefined values

  // Join the labels into a string
  const categoryText = categoryLabels?.join(", ");

  // Determine if the "Book" button should be displayed
  const showBookButton =
    category?.includes("hotels") || category?.includes("tour_guides");

  return (
    <div
      className={`relative ${
        image ? "bg-white" : "bg-deepblue-100"
      } min-h-[130px] rounded-3xl overflow-hidden sm:w-full md:w-[400px] shadow-lg hover:shadow-md hover:shadow-brandblue active:shadow-lg active:shadow-brandgold`}
    >
      {image && (
        <div className="relative">
          <a href={url} target="_blank" rel="noopener noreferrer">
            <img src={image} alt={title} className="w-full h-auto" />
          </a>
        </div>
      )}
      {image && (
        <div className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-black to-transparent" />
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

      {/* Category Button */}
      {categoryText && (
        <div className="absolute top-4 right-4 z-50">
          <button
            type="button"
            className="px-1 bg-brandgold text-white rounded-lg"
          >
            {categoryText}
          </button>
        </div>
      )}

      <div className="absolute bottom-4 left-0 w-full px-5 pb-2">
        <a href={url} target="_blank" rel="noopener noreferrer">
          <p
            className={`font-medium text-xl ${
              image ? "text-white" : "text-black"
            } line-clamp-2`}
          >
            {title}
          </p>
        </a>
      </div>
    </div>
  );
};

export default Card;
