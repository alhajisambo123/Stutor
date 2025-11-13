type CoverImage = {
  url: string;
};

export type Image = {
  _key: string;
  url: string;
};


type Slug = {
  _type: string;
  current: string;
};

export type Course = {
  _id: string;
  coverImage: CoverImage;
  description: string;
  mysession: string;
  experience: string;

  aboutme: string;
  contact: string;

  discount: number;
  images: Image[];
  isFeatured: boolean;
  courseName: string;
  // offeredAmenities: Amenity[];
  price: number;
  slug: Slug;
  // specialNote: string;
  type: string;
};

