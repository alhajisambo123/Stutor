// app/api/courses/route.ts
import { NextRequest, NextResponse } from "next/server";
import sanityClient from "@/libs/sanity";
import { getCoursesByUserQuery } from "@/libs/sanityQueries";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  try {
    const courses = await sanityClient.fetch(getCoursesByUserQuery, { userId });
    return NextResponse.json(courses, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch courses" }, { status: 500 });
  }
}
