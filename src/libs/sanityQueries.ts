import { groq } from "next-sanity";

export const getFeaturedCourseQuery = groq`*[_type == "couRse" && isFeatured == true][0] {
    _id,
    description,
    mysession,
    experience,
    aboutme,
    contact,
    discount,
    images,
    isFeatured,
    courseName,
    price,
    slug,
    coverImage
}`;

export const getCoursesQuery = groq`*[_type == "couRse"] {
    _id,
    coverImage,
    description,
    mysession,
    experience,
    aboutme,
    contact,
    dimension,
    
    isFeatured,
    courseName,
    price,
    slug,
    type
}`;

export const getCourse = groq`*[_type == "couRse" && slug.current == $slug][0] {
    _id,
    coverImage,
    description,
    mysession,
    experience,
    aboutme,
    contact,
    dimension,
    discount,
    images,
    
    isFeatured,
    courseName,
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

export const getCourseReviewsQuery = groq`*[_type == "review" && couRse._ref == $courseId] {
    _createdAt,
    _id,
    text,
    user -> {
        name
    },
    userRating
}`;
