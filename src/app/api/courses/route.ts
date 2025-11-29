// // app/api/courses/route.ts
// import { NextRequest, NextResponse } from "next/server";
// import sanityClient from "@/libs/sanity";
// import { getCoursesByUserQuery } from "@/libs/sanityQueries";

// export async function GET(req: NextRequest) {
//   const { searchParams } = new URL(req.url);
//   const userId = searchParams.get("userId");

//   if (!userId) {
//     return NextResponse.json({ error: "User ID is required" }, { status: 400 });
//   }

//   try {
//     const courses = await sanityClient.fetch(getCoursesByUserQuery, { userId });
//     return NextResponse.json(courses, { status: 200 });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ error: "Failed to fetch courses" }, { status: 500 });
//   }
// }


// import { NextRequest, NextResponse } from "next/server";
// import sanityClient from "@/libs/sanity";
// import { getCoursesByUserQuery } from "@/libs/sanityQueries";

// export async function GET(req: NextRequest) {
//   try {
//     const { searchParams } = new URL(req.url);
//     const userId = searchParams.get("userId");

//     if (!userId) {
//       return NextResponse.json(
//         { error: "Tutor ID is required" },
//         { status: 400 }
//       );
//     }

//     // Fetch tutor courses
//     const courses = await sanityClient.fetch(getCoursesByUserQuery, { userId });

//     return NextResponse.json(courses, { status: 200 });
//   } catch (error) {
//     console.error("Error fetching tutor courses:", error);
//     return NextResponse.json(
//       { error: "Failed to fetch courses" },
//       { status: 500 }
//     );
//   }
// }

import { NextRequest, NextResponse } from "next/server";
import sanityClient from "@/libs/sanity";
import { getCoursesByUserQuery } from "@/libs/sanityQueries";
import { v4 as uuidv4 } from "uuid"; // import to generate unique keys

// --------------------------------------------------
// GET: Fetch courses by tutor
// --------------------------------------------------
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "Tutor ID is required" },
        { status: 400 }
      );
    }

    const courses = await sanityClient.fetch(getCoursesByUserQuery, { userId });

    return NextResponse.json(courses, { status: 200 });
  } catch (error) {
    console.error("Error fetching tutor courses:", error);
    return NextResponse.json(
      { error: "Failed to fetch courses" },
      { status: 500 }
    );
  }
}

// --------------------------------------------------
// POST: Create new course
// --------------------------------------------------
// export async function POST(req: NextRequest) {
//   try {
//     const data = await req.json();

//     const {
//       userId,
//       name,
//       description,
//       mysession,
//       experience,
//       aboutme,
//       discount,
//       price,
//       contact,
//       type,
//       coverImage,
//       images = [],
//     } = data;

//     if (!userId) {
//       return NextResponse.json(
//         { error: "Tutor ID is required" },
//         { status: 400 }
//       );
//     }

//     if (!name || !price) {
//       return NextResponse.json(
//         { error: "Course name and price are required" },
//         { status: 400 }
//       );
//     }

//     const newCourse = {
//       _type: "course",
//       tutor: {
//         _type: "reference",
//         _ref: userId,
//       },
//       name,
//       description,
//       mysession,
//       experience,
//       aboutme,
//       contact,
//       discount,
//       price,
//       type,
//       coverImage,
//       images,
//     };

//     const created = await sanityClient.create(newCourse);

//     return NextResponse.json(created, { status: 201 });
//   } catch (error) {
//     console.error("Error creating course:", error);
//     return NextResponse.json(
//       { error: "Failed to create course" },
//       { status: 500 }
//     );
//   }
// }

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    const {
      userId,
      name,
      description,
      mysession,
      experience,
      aboutme,
      discount,
      price,
      type,
      slug,
      coverImage,
      images = [],
    } = data;

    if (!userId) {
      return NextResponse.json(
        { error: "Tutor ID is required" },
        { status: 400 }
      );
    }

    if (!name || !price) {
      return NextResponse.json(
        { error: "Course name and price are required" },
        { status: 400 }
      );
    }

    // Ensure coverImage has a _key
    const cover = coverImage ? { ...coverImage, _key: coverImage._key || uuidv4() } : undefined;

    // Ensure every additional image has a _key
    const imgs = images.map((img: { url: string; _key?: string }) => ({
      url: img.url,
      _key: img._key || uuidv4(),
    }));

    const newCourse = {
      _type: "course",
      tutor: {
        _type: "reference",
        _ref: userId,
      },
      name,
      description,
      mysession,
      experience,
      aboutme,
      discount,
      price,
      slug,
      type,
      coverImage: cover,
      images: imgs,
    };

    const created = await sanityClient.create(newCourse);

    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    console.error("Error creating course:", error);
    return NextResponse.json(
      { error: "Failed to create course" },
      { status: 500 }
    );
  }
}

// // --------------------------------------------------
// PATCH: Update existing course
// --------------------------------------------------
export async function PATCH(req: NextRequest) {
  try {
    const { courseId, updates } = await req.json();

    if (!courseId || !updates) {
      return NextResponse.json(
        { error: "Course ID and updates are required" },
        { status: 400 }
      );
    }

    const updatedCourse = await sanityClient
      .patch(courseId)
      .set(updates)
      .commit();

    return NextResponse.json(updatedCourse, { status: 200 });
  } catch (error) {
    console.error("Error updating course:", error);
    return NextResponse.json(
      { error: "Failed to update course" },
      { status: 500 }
    );
  }
}
