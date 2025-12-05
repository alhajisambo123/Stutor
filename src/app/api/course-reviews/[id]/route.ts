// import { getCourseReviews } from "@/libs/apis";
// import { NextResponse } from "next/server";

// export async function GET(
//   req: Request,
//   context: { params: Promise<{ id: string }> }
// ) {
//   try {
//     // Await the resolution of params
//     const resolvedParams = await context.params;
//     const { id: courseId } = resolvedParams; // Destructure the ID from the resolved params

//     if (!courseId) {
//       return new NextResponse("Course ID is required", { status: 400 });
//     }

//     // Fetch room reviews using the roomId
//     const courseReviews = await getCourseReviews(courseId);

//     // Return the JSON response
//     return NextResponse.json(courseReviews, {
//       status: 200,
//       statusText: "Successful",
//     });
//   } catch (error) {
//     console.error("Getting Review Failed", error);

//     // Return an error response
//     return new NextResponse("Unable to fetch reviews", { status: 500 });
//   }
// }
import { getCourseReviews } from "@/libs/apis";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  context: { params: { id: string } }  // <-- correct type
) {
  try {
    const { id: courseId } = context.params;

    if (!courseId) {
      return new NextResponse("Course ID is required", { status: 400 });
    }

    const courseReviews = await getCourseReviews(courseId);

    return NextResponse.json(courseReviews, { status: 200 });
  } catch (error) {
    console.error("Getting Reviews Failed:", error);
    return new NextResponse("Unable to fetch reviews", { status: 500 });
  }
}
