import { groq } from "next-sanity";

export const getFeaturedCourseQuery = groq`*[_type == "couRse" && isFeatured == true][0] {
    _id,
    description,
    decshin,
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

export const getCoursesQuery = groq`*[_type == "couRse"] {
    _id,
    coverImage,
    description,
    decshin,
    experience,
    aboutme,
    contact,
    dimension,
    isBooked,
    isFeatured,
    name,
    price,
    slug,
    type
}`;

export const getCourse = groq`*[_type == "couRse" && slug.current == $slug][0] {
    _id,
    coverImage,
    description,
    decshin,
    experience,
    aboutme,
    contact,
    dimension,
    discount,
    images,
    isBooked,
    isFeatured,
    name,
    numberOfBeds,
    offeredAmenities,
    price,
    slug,
    specialNote,
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

export const getCourseReviewsQuery = groq`*[_type == "review" && couRse._ref == $courseId] {
    _createdAt,
    _id,
    text,
    user -> {
        name
    },
    userRating
}`;
