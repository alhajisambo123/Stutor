"use client"
import { FC } from "react";
import Image from "next/image";

import { Course } from "@/models/course";
import Link from "next/link";

type Props = {
  course: Course;
};

const CourseCard: FC<Props> = (props) => {
  const {
    course: { coverImage, name, price, type, description, slug },
  } = props;

  return (
    <div className="rounded-xl w-72 mb-10 mx-auto md:mx-0 overflow-hidden text-black">
      <div className="h-60 overflow-hidden">
        <Image
          src={coverImage.url}
alt="Description of the image"           width={250}
          height={250}
          className="img scale-animation"
        />
      </div>

      <div className="p-4 bg-white">
        <div className="flex justify-between text-xl font-semibold">
          <p  >{name}</p>
          <p>GH₵ add{price}</p>
        </div>

        <p className="pt-2 text-xs">{type} Tutor</p>

        <p className="pt-3 pb-6">{description.slice(1, 100)}...</p>

        <Link
          href={`/courses/${slug.current}`}
          className='bg-primary inline-block text-center w-full py-4 rounded-xl text-white text-xl font-bold hover:-translate-y-2 hover:shadow-lg transition-all duration-500'
        >
          {'CHECK OUT'}
        </Link>
      </div>
    </div>
  );
};

export default CourseCard;
