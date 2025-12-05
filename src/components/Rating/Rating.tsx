import { FC } from "react";
import { FaStar, FaStarHalf } from "react-icons/fa";

type Props = {
  rating: number;
};

const Rating: FC<Props> = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const decimalPart = rating - fullStars;

  return (
    <>
      {/* Render full stars with unique keys */}
      {Array.from({ length: fullStars }, (_, i) => (
        <FaStar key={`full-${i}`} />
      ))}

      {/* Render half star if applicable */}
      {decimalPart > 0 && <FaStarHalf key="half" />}
    </>
  );
};

export default Rating;
