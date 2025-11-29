import { NextRequest, NextResponse } from "next/server";
import sanityClient from "@/libs/sanity";

export const POST = async (req: NextRequest) => {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Sanity asset upload
    const uploaded = await sanityClient.assets.upload("image", file, {
      filename: file.name,
    });

    return NextResponse.json({ url: uploaded.url });
  } catch (err) {
    console.error("Upload error:", err);
    return NextResponse.json({ error: "Failed to upload file" }, { status: 500 });
  }
};
