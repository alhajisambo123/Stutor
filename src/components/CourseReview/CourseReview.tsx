import axios from "axios";
import { FC } from "react";
import useSWR from "swr";

import { Review } from "@/models/review";
import Rating from "../Rating/Rating";

const CourseReview: FC<{ courseId: string }> = ({ courseId }) => {
  const fetchCourseReviews = async () => {
    const { data } = await axios.get<Review[]>(`/api/course-reviews/${courseId}`);
    return data;
  };

  const {
    data: courseReviews,
    error,
    isLoading,
  } = useSWR("/api/course-reviews", fetchCourseReviews);

  if (error) throw new Error("Cannot fetch data");
  if (typeof courseReviews === "undefined" && !isLoading)
    throw new Error("Cannot fetch data");

  console.log(courseReviews);

  return (
    <>
      {courseReviews &&
        courseReviews.map((review) => (
          <div
            className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg"
            key={review._id}
          >
            <div className="font-semibold mb-2 flex">
              <p>{review.user.name}</p>
              <div className="ml-4 flex items-center text-tertiary-light text-lg">
                <Rating rating={review.userRating} />
              </div>
            </div>

            <p>{review.text}</p>
          </div>
        ))}
    </>
  );
};

export default CourseReview;
