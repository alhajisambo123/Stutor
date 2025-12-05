import { groq } from "next-sanity";

export const getFeaturedCourseQuery = groq`*[_type == "course" && isFeatured == true][0] {
    _id,
    description,
    mysession,
    experience,
    aboutme,
    contact,
    discount,
    images,
    isFeatured,
    name,
    price,
    slug,
    coverImage
}`;

export const getCoursesQuery = groq`*[_type == "course"] {
    _id,
    coverImage,
    description,
    mysession,
    experience,
    aboutme,
    contact,
    
    isFeatured,
    name,
    price,
    slug,
    type
}`;

export const getCourse = groq`*[_type == "course" && slug.current == $slug][0] {
    _id,
    coverImage,
    description,
    mysession,
    experience,
    aboutme,
    contact,
    discount,
    images,
    isFeatured,
    name,
    price,
    slug,
    type
}`;



export const getUserDataQuery = groq`*[_type == 'user' && _id == $userId][0] {
    _id,
    name,
    email,
    isAdmin,
    about,
    _createdAt,
    image,
}`;

export const getCourseReviewsQuery = groq`*[_type == "review" && course._ref == $courseId] {
    _createdAt,
    _id,
    text,
    user -> {
        _id, name, image
    },
    userRating
}`;


// libs/sanityQueries.ts
export const getCoursesByUserQuery = groq`*[_type == "course" && tutor._ref == $userId]{
  _id,
  name,
  description,
  price,
  discount,
  type,
  coverImage,
  images,
  mysession,
  experience,
  aboutme,
  contact,
  isFeatured,
  slug
}`;
