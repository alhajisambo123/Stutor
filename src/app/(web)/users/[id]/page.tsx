
"use client";

import { useState, useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import axios from "axios";
import toast from "react-hot-toast";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";

// Generate slug from string
const generateSlug = (str: string) =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");

interface UploadedImage {
  url: string;
  _key: string;
}

interface Course {
  _id?: string;
  name: string;
  slug?: { _type: "slug"; current: string };
  description?: string;
  price?: number;
  discount?: number;
  type?: string;
  mysession?: string;
  experience?: string;
  aboutme?: string;
  contact?: string;
  coverImage?: UploadedImage | null;
  images?: UploadedImage[];
}

const courseTypes = ["Humanities", "Engineering", "Basic/Applied", "All", "Health"];

export default function Dashboard() {
  const { data: session } = useSession();

  const [course, setCourse] = useState<Course>({
    name: "",
    slug: { _type: "slug", current: "" },
    description: "",
    price: 0,
    discount: 0,
    type: "Basic/Applied",
    mysession: "",
    experience: "",
    aboutme: "",
    contact: "",
    coverImage: null,
    images: [],
  });

  const [loading, setLoading] = useState(false);

  // Fetch existing course if logged in
  useEffect(() => {
    const fetchCourse = async () => {
      if (!session?.user) return;
      try {
        const res = await axios.get<Course[]>(`/api/courses?userId=${session.user.id}`);
        if (res.data.length > 0) {
          const fetchedCourse = res.data[0];

          // Ensure coverImage has _key
          if (fetchedCourse.coverImage && !fetchedCourse.coverImage._key) {
            fetchedCourse.coverImage._key = uuidv4();
          }

          // Ensure all images have _key
          if (fetchedCourse.images) {
            const imagesWithKeys = fetchedCourse.images.map((img) => ({
              _key: img._key || uuidv4(),
              url: img.url,
            }));
            fetchedCourse.images = imagesWithKeys;
          }

          // Ensure slug exists
          if (!fetchedCourse.slug) {
            fetchedCourse.slug = { _type: "slug", current: generateSlug(fetchedCourse.name || "") };
          }

          setCourse(fetchedCourse);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchCourse();
  }, [session]);

  // Handle field changes
  const handleChange = <K extends keyof Course>(field: K, value: Course[K]) => {
    setCourse((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Handle file uploads
  const handleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "coverImage" | "images"
  ) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    const uploadedFiles: UploadedImage[] = [];

    setLoading(true);
    try {
      for (const file of files) {
        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch("/api/upload", { method: "POST", body: formData });
        const data: { url: string } = await res.json();
        uploadedFiles.push({ url: data.url, _key: uuidv4() });
      }

      if (field === "coverImage") handleChange("coverImage", uploadedFiles[0]);
      else handleChange("images", [...(course.images || []), ...uploadedFiles]);

      toast.success("Upload successful!");
    } catch (err) {
      console.error(err);
      toast.error("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveImage = (key: string) => {
    handleChange(
      "images",
      (course.images || []).filter((img) => img._key !== key)
    );
  };

  const handleSubmit = async () => {
    if (!course.name || !course.price || !session?.user?.id) {
      return toast.error("Course Name, Price, and User ID are required");
    }

    setLoading(true);
    try {
      const payload = {
        userId: session.user.id,
        name: course.name,
        slug: course.slug || { _type: "slug", current: generateSlug(course.name) },
        aboutme: course.aboutme,
        experience: course.experience,
        mysession: course.mysession,
        contact: course.contact,
        discount: course.discount,
        price: course.price,
        description: course.description,
        type: course.type,
        coverImage: course.coverImage ? { ...course.coverImage, _key: course.coverImage._key || uuidv4() } : undefined,
        images: (course.images || []).map((img) => ({ url: img.url, _key: img._key || uuidv4() })),
      };

      let res;
      if (course._id) {
        res = await axios.patch("/api/courses", { courseId: course._id, updates: payload });
      } else {
        res = await axios.post("/api/courses", payload);
      }

      setCourse(res.data);
      toast.success(course._id ? "Course updated!" : "Course created!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to save course");
    } finally {
      setLoading(false);
    }
  };

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <h1 className="text-2xl font-bold">Login to continue</h1>
        <button
          onClick={() => signIn("credentials")}
          className="px-6 py-2 bg-blue-600 text-white rounded"
        >
          Login
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          {session.user?.image ? (
            <Image
              src={session.user.image}
              alt={session.user.name!}
              width={50}
              height={50}
              className="rounded-full"
            />
          ) : (
            <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">User</div>
          )}
          <h2 className="text-xl font-bold">Welcome, {session.user?.name}</h2>
        </div>
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="px-4 py-2 bg-red-600 text-white rounded"
        >
          Logout
        </button>
      </div>

      <h1 className="text-2xl font-bold mb-6">{course._id ? "Edit Course" : "Create Course"}</h1>

      <div className="grid gap-4">
        {/* Course Name */}
        <input
          type="text"
          placeholder="Course Name"
          value={course.name || ""}
          onChange={(e) =>
            setCourse((prev) => ({
              ...prev,
              name: e.target.value,
              slug: { _type: "slug", current: generateSlug(e.target.value) },
            }))
          }
          className="border px-3 py-2 rounded"
        />

        {/* Description */}
        <textarea
          placeholder="Description"
          value={course.description || ""}
          onChange={(e) => handleChange("description", e.target.value)}
          className="border px-3 py-2 rounded"
        />

        {/* Price */}
        <input
          type="number"
          placeholder="Price"
          value={course.price || 0}
          onChange={(e) => handleChange("price", Number(e.target.value))}
          className="border px-3 py-2 rounded"
        />

        {/* Discount */}
        <input
          type="number"
          placeholder="Discount"
          value={course.discount || 0}
          onChange={(e) => handleChange("discount", Number(e.target.value))}
          className="border px-3 py-2 rounded"
        />

        {/* Type */}
        <select
          value={course.type || "Basic/Applied"}
          onChange={(e) => handleChange("type", e.target.value)}
          className="border px-3 py-2 rounded"
        >
          {courseTypes.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>

        {/* Other fields */}
        <input
          type="text"
          placeholder="My Session"
          value={course.mysession || ""}
          onChange={(e) => handleChange("mysession", e.target.value)}
          className="border px-3 py-2 rounded"
        />
        <input
          type="text"
          placeholder="Experience"
          value={course.experience || ""}
          onChange={(e) => handleChange("experience", e.target.value)}
          className="border px-3 py-2 rounded"
        />
        <input
          type="text"
          placeholder="About Me"
          value={course.aboutme || ""}
          onChange={(e) => handleChange("aboutme", e.target.value)}
          className="border px-3 py-2 rounded"
        />
        <input
          type="text"
          placeholder="Contact"
          value={course.contact || ""}
          onChange={(e) => handleChange("contact", e.target.value)}
          className="border px-3 py-2 rounded"
        />

        {/* Cover Image */}
        <div>
          <p>Cover Image</p>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileUpload(e, "coverImage")}
          />
          {course.coverImage?.url && (
            <Image
              src={course.coverImage.url}
              alt="Cover"
              width={192}
              height={108}
              className="mt-2 object-cover"
            />
          )}
        </div>

        {/* Additional Images */}
        <div>
          <p>Additional Images</p>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => handleFileUpload(e, "images")}
          />
          <div className="flex gap-2 mt-2 flex-wrap">
            {course.images?.map((img) => (
              <div key={img._key} className="relative w-24 h-24">
                <Image
                  src={img.url}
                  alt="Uploaded"
                  width={96}
                  height={96}
                  className="object-cover"
                />
                <button
                  onClick={() => handleRemoveImage(img._key)}
                  className="absolute top-0 right-0 bg-red-600 text-white rounded-full w-6 h-6 text-xs"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded mt-4"
        >
          {loading ? "Saving..." : course._id ? "Update Course" : "Create Course"}
        </button>
      </div>
    </div>
  );
}
