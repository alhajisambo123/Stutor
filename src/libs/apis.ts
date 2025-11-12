import { CreateReviewDto, Review } from "./../models/review";
import axios from "axios";

import {  Course } from "@/models/course";
import sanityClient from "./sanity";
import * as queries from "./sanityQueries";
import { UpdateReviewDto } from "@/models/review";

export async function getFeaturedCourse() {
  const result = await sanityClient.fetch<Course>(
    queries.getFeaturedCourseQuery,
    {},
    { cache: "no-cache" }
  );

  return result;
}

export async function getCourses() {
  const result = await sanityClient.fetch<Course[]>(
    queries.getCoursesQuery,
    {},
    { cache: "no-cache" }
  );
  return result;
}

export async function getCourse(slug: string) {
  const result = await sanityClient.fetch<Course>(
    queries.getCourse,
    { slug },
    { cache: "no-cache" }
  );

  return result;
}


  

export const updateCouRse= async (couRseId: string) => {
  const mutation = {
    mutations: [
      {
        patch: {
          id: couRseId,
          set: {
            isBooked: true,
          },
        },
      },
    ],
  };

  const { data } = await axios.post(
    `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-10-21/data/mutate/${process.env.NEXT_PUBLIC_SANITY_DATASET}`,
    mutation,
    { headers: { Authorization: `Bearer ${process.env.SANITY_STUDIO_TOKEN}` } }
  );

  return data;
};

export async function getUserData(userId: string) {
  const result = await sanityClient.fetch(
    queries.getUserDataQuery,
    { userId },
    { cache: "no-cache" }
  );

  return result;
}

export async function checkReviewExists(
  userId: string,
  couRseId: string
): Promise<null | { _id: string }> {
  const query = `*[_type == 'review' && user._ref == $userId && couRse._ref == $couRseId][0] {
    _id
  }`;

  const params = {
    userId,
    couRseId,
  };

  const result = await sanityClient.fetch(query, params);

  return result ? result : null;
}

export const updateReview = async ({
  reviewId,
  reviewText,
  userRating,
}: UpdateReviewDto) => {
  const mutation = {
    mutations: [
      {
        patch: {
          id: reviewId,
          set: {
            text: reviewText,
            userRating,
          },
        },
      },
    ],
  };

  const { data } = await axios.post(
    `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-10-21/data/mutate/${process.env.NEXT_PUBLIC_SANITY_DATASET}`,
    mutation,
    { headers: { Authorization: `Bearer ${process.env.SANITY_STUDIO_TOKEN}` } }
  );

  return data;
};

export const createReview = async ({
  couRseId,
  reviewText,
  userId,
  userRating,
}: CreateReviewDto) => {
  const mutation = {
    mutations: [
      {
        create: {
          _type: "review",
          user: {
            _type: "reference",
            _ref: userId,
          },
          couRse: {
            _type: "reference",
            _ref: couRseId,
          },
          userRating,
          text: reviewText,
        },
      },
    ],
  };

  const { data } = await axios.post(
    `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-10-21/data/mutate/${process.env.NEXT_PUBLIC_SANITY_DATASET}`,
    mutation,
    { headers: { Authorization: `Bearer ${process.env.SANITY_STUDIO_TOKEN}` } }
  );

  return data;
};

export async function getCourseReviews(courseId: string) {
  const result = await sanityClient.fetch<Review[]>(
    queries.getCourseReviewsQuery,
    {
      courseId,
    },
    { cache: "no-cache" }
  );

  return result;
}
