// pages/api/courses.ts
import { NextApiRequest, NextApiResponse } from "next";
import sanityClient from "@/libs/sanity";
import { getCoursesByUserQuery } from "@/libs/sanityQueries";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = req.query;

  if (!userId) return res.status(400).json({ error: "User ID is required" });

  try {
    const courses = await sanityClient.fetch(getCoursesByUserQuery, { userId });
    res.status(200).json(courses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch courses" });
  }
}
