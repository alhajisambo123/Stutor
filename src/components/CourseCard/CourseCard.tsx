import { FC } from "react";
import Image from "next/image";

import { Course } from "@/models/course";

type Props = {
  course: Course;
};

const CourseCard: FC<Props> = (props) => {
  const {
    course: { coverImage, courseName, price, type, description,  },
  } = props;

  return (
    <div className="rounded-xl w-72 mb-10 mx-auto md:mx-0 overflow-hidden text-black">
      <div className="h-60 overflow-hidden">
        <Image
          src={coverImage.url}
          alt={courseName}
          width={250}
          height={250}
          className="img scale-animation"
        />
      </div>

      <div className="p-4 bg-white">
        <div className="flex justify-between text-xl font-semibold">
          <p>{courseName}</p>
          <p>GH₵ {price}</p>
        </div>

        <p className="pt-2 text-xs">{type} Tutor</p>

        <p className="pt-3 pb-6">{description.slice(1, 100)}...</p>

       
      </div>
    </div>
  );
};

export default CourseCard;
