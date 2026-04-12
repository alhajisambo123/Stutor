// 'use client';

// import { FC } from "react";
// import Image from "next/image";
// import { Course } from "@/models/course";
// import Link from "next/link";

// type Props = {
//   featuredCourse: Course;
// };

// const FeaturedCourse: FC<Props> = ({ featuredCourse }) => {
//   return (
//     <section className="flex md:flex-row flex-col px-4 py-10 items-center gap-12 container mx-auto">
      
//       {/* LEFT IMAGES */}
//       <div className="md:grid gap-8 grid-cols-1">
        
//         {/* Main Image */}
//         <div className="rounded-2xl overflow-hidden h-48 mb-4 md:mb-0">
//           <Image
//             src={featuredCourse.coverImage.url}
//             alt={featuredCourse.name}
//             width={300}
//             height={300}
//             className="w-full h-full object-cover object-top scale-animation"
//           />
//         </div>

//         {/* 2 Gallery Images */}
//         <div className="grid grid-cols-2 gap-8 h-48">
//           {featuredCourse.images.slice(1, 3).map((image, index) => (
//             <div
//               key={image._key ?? `featured-img-${index}`}
//               className="rounded-2xl overflow-hidden"
//             >
//               <Image
//                 src={image.url}
//                 alt={image._key ?? `image-${index}`}
//                 width={300}
//                 height={300}
//                 className="w-full h-full object-cover object-top scale-animation"
//               />
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* RIGHT DETAILS */}
//       <div className="md:py-10 md:w-1/2 text-left">
//         <h3 className="font-heading mb-12 text-primary">Featured Course</h3>

//         <p className="font-normal max-w-md">{featuredCourse.description}</p>

//         <div className="flex flex-col md:flex-row md:items-end justify-between mt-5">

//           {/* Price + Discount */}
//           <div className="flex mb-3 md:mb-0">
//             <div className="flex gap-3 flex-col items-center justify-center mr-4">
//               <p className="text-xs lg:text-xl text-center">Per Month</p>
//               <p className="md:font-bold flex font-medium text-lg xl:text-5xl text-primary">
//                 GHS {featuredCourse.price}
//               </p>
//             </div>

//             <div className="flex gap-3 flex-col items-center justify-center mr-4">
//               <p className="text-xs lg:text-xl text-center">Discount</p>
//               <p className="md:font-bold flex font-medium text-lg xl:text-5xl text-primary">
//                 GHS {featuredCourse.discount}
//               </p>
//             </div>
//           </div>




  // <Link
  //           href={`/courses/${featuredCourse.slug.current}`}
  //           className="group border-2 border-tertiary-dark text-tertiary-dark hover:bg-tertiary-dark hover:text-white 
  //                      transition-all duration-300 px-12 py-5 rounded-2xl font-bold text-lg inline-flex items-center"
  //         >
  //           View Full Details
  //           <span className="ml-3 group-hover:translate-x-1 transition-transform">→</span>
  //         </Link>



//           {/* Details Link */}
//           <Link
//             href={`/courses/${featuredCourse.slug.current}`}
//             className="border h-fit text-center border-tertiary-dark text-tertiary-dark px-3 py-2 lg:py-5 lg:px-7 rounded-2xl font-bold lg:text-xl"
//           >
//             More Details
//           </Link>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default FeaturedCourse;






// 'use client';

// import { FC } from "react";
// import Image from "next/image";
// import { Course } from "@/models/course";
// import Link from "next/link";

// type Props = {
//   featuredCourse: Course;
// };

// const FeaturedCourse: FC<Props> = ({ featuredCourse }) => {
//   return (
//     <section className="py-16 container mx-auto px-4 bg-white">
//       <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

//         {/* LEFT SIDE - IMAGES */}
//         <div className="lg:w-1/2 w-full">
//           <div className="grid grid-cols-1 gap-6">
//             {/* Main Image */}
//             <div className="rounded-3xl overflow-hidden h-[420px] shadow-xl">
//               <Image
//                 src={featuredCourse.coverImage.url}
//                 alt={featuredCourse.name}
//                 width={700}
//                 height={500}
//                 className="w-full h-full object-cover scale-animation"
//                 priority
//               />
//             </div>

//             {/* Two Smaller Images */}
//             <div className="grid grid-cols-2 gap-6">
//               {featuredCourse.images.slice(1, 3).map((image, index) => (
//                 <div
//                   key={image._key ?? `featured-img-${index}`}
//                   className="rounded-3xl overflow-hidden h-[210px] shadow-lg"
//                 >
//                   <Image
//                     src={image.url}
//                     alt={image._key ?? `image-${index}`}
//                     width={350}
//                     height={300}
//                     className="w-full h-full object-cover scale-animation"
//                   />
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* RIGHT SIDE - DETAILS */}
//         <div className="lg:w-1/2 w-full text-left">
          
//           <span className="inline-block font-bold text-primary font-medium text-lg mb-3 tracking-wide">
//             FEATURED COURSE
//           </span>

//           <h2 className="font-heading text-4xl lg:text-5xl leading-tight mb-6 text-gray-900">
//             {featuredCourse.name}
//           </h2>

//           <p className="text-gray-600 text-[17px] leading-relaxed max-w-lg mb-10">
//             {featuredCourse.description}
//           </p>

//           {/* Pricing */}
//           <div className="flex items-end gap-10 mb-10">
//             <div>
//               <p className="text-sm text-gray-500">Monthly Fee</p>
//               <p className="text-5xl font-bold text-primary mt-1">
//                 GHS {featuredCourse.price}
//               </p>
//             </div>

//             {featuredCourse.discount && featuredCourse.discount > featuredCourse.price && (
//               <div className="mb-2">
//                 <p className="text-sm text-gray-500 line-through">
//                   GHS {featuredCourse.discount}
//                 </p>
//                 <p className="text-xl font-semibold text-green-600">
//                   Save GHS {featuredCourse.discount - featuredCourse.price}
//                 </p>
//               </div>
//             )}
//           </div>

//           {/* CTA Button */}
//           <Link
//             href={`/courses/${featuredCourse.slug.current}`}
//             className="group border-2 border-primary text-primary hover:bg-tertiary-dark hover:text-white 
//                        transition-all duration-300 px-12 py-5 rounded-2xl font-bold text-lg inline-flex items-center"
//           >
//             View Full Details
//             <span className="ml-3 group-hover:translate-x-1 transition-transform">→</span>
//           </Link>

//         </div>
//       </div>
//     </section>
//   );
// };

// export default FeaturedCourse;







'use client';

import { FC } from "react";
import Image from "next/image";
import { Course } from "@/models/course";
import Link from "next/link";

type Props = {
  featuredCourse: Course;
};

const FeaturedCourse: FC<Props> = ({ featuredCourse }) => {
  return (
    <section className="py-12 md:py-16 container mx-auto px-4 bg-white dark:bg-black">
      
      {/* Separate Top Heading - Optimized for Mobile */}
      <div className="text-left mb-10 md:mb-14">
        <p className="text-4xl sm:text-5xl font-bold text-gray-600 mb-4">
Featured Course              </p>
        
      </div>

      <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-20">

        {/* LEFT SIDE - IMAGES */}
        <div className="lg:w-1/2 w-full">
          <div className="grid grid-cols-1 gap-4 md:gap-6">
            
            {/* Main Image - Better mobile height */}
            <div className="rounded-3xl overflow-hidden h-[320px] sm:h-[380px] md:h-[420px] shadow-xl">
              <Image
                src={featuredCourse.coverImage.url}
                alt={featuredCourse.name}
                width={700}
                height={500}
                className="w-full h-full object-cover scale-animation"
                priority
              />
            </div>

            {/* Two Smaller Images - Better mobile sizing */}
            <div className="grid grid-cols-2 gap-4 md:gap-6">
              {featuredCourse.images.slice(1, 3).map((image, index) => (
                <div
                  key={image._key ?? `featured-img-${index}`}
                  className="rounded-3xl overflow-hidden h-[150px] sm:h-[180px] md:h-[210px] shadow-lg"
                >
                 <Image
  src={featuredCourse.coverImage?.url || "/placeholder.jpg"}
  alt={featuredCourse.name || "Course image"}
  width={700}
  height={500}
  className="w-full h-full object-cover scale-animation"
  priority
/>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT SIDE - DETAILS */}
        <div className="lg:w-1/2 w-full text-left">
          
          {/* Course Name - Bold + Optimized for Mobile */}
           <p className="text-4xl sm:text-5xl font-bold text-gray-600 mb-4">
{featuredCourse.name}            </p> 
          

          <p className="text-gray-600 text-base sm:text-[15px] leading-relaxed max-w-lg mb-10">
            {featuredCourse.description}
          </p>

          {/* Pricing - Better mobile layout */}
          <div className="flex flex-col sm:flex-row sm:items-end gap-8 md:gap-12 mb-12">
            <div>
              <p className="text-xs sm:text-sm uppercase tracking-widest text-gray-500 mb-2">Monthly Fee</p>
              <p className="text-4xl sm:text-5xl font-bold text-gray-600">
                GHS {featuredCourse.price}
              </p>
            </div>

            {featuredCourse.discount && featuredCourse.discount > featuredCourse.price && (
              <div>
                <p className="text-xs sm:text-sm uppercase tracking-widest text-gray-500 mb-2 line-through">
                  GHS {featuredCourse.discount}
                </p>
                <p className="text-lg sm:text-2xl font-semibold text-green-600">
                  Save GHS {featuredCourse.discount - featuredCourse.price}
                </p>
              </div>
            )}
          </div>

          {/* CTA Button - Bigger on mobile */}
          <Link
            href={`/courses/${featuredCourse.slug.current}`}
            className="group border-2 border-gray-600 text-gray-600 hover:bg-gray-600 hover:text-white 
                       transition-all duration-300 px-10 sm:px-14 py-4 sm:py-5 rounded-2xl font-bold text-base sm:text-lg inline-flex items-center w-full sm:w-auto justify-center sm:justify-start"
          >
            View Full Details
            <span className="ml-3 group-hover:translate-x-1 transition-transform">→</span>
          </Link>

        </div>
      </div>
    </section>
  );
};

export default FeaturedCourse;