

"use client";

import React, { useState, useEffect, useTransition } from "react";
import useSWR from "swr";
import { getCourse } from "@/libs/apis";
import LoadingSpinner from "../../loading";
import CoursePhotoGallery from "@/components/CoursePhotoGallery/CoursePhotoGallery";
import toast from "react-hot-toast";
import CourseReview from "@/components/CourseReview/CourseReview";

type CourseDetailsProps = {
  params: Promise<{ slug: string }>;
};

interface ContactFormData {
  name: string;
  contact: string;
  message: string;
}

const CourseDetails: React.FC<CourseDetailsProps> = ({ params }) => {
  const [slug, setSlug] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [form, setForm] = useState<ContactFormData>({
    name: "",
    contact: "",
    message: "",
  });
  const [status, setStatus] = useState("");
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    startTransition(() => {
      params
        .then((resolvedParams) => setSlug(resolvedParams.slug))
        .catch((error) => {
          console.error("Error resolving params:", error);
          toast.error("Failed to load course details.");
        });
    });
  }, [params]);

  const fetchCourse = async () => {
    if (!slug) return null;
    try {
      const data = await getCourse(slug);
      return data;
    } catch (error) {
      console.error("Error fetching course:", error);
      throw new Error("Cannot fetch data");
    }
  };

  const { data: course, error, isLoading } = useSWR(
    slug ? `/api/courses/${slug}` : null,
    fetchCourse
  );

  // ✅ handle booking form submission
  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("Sending...");

    if (!course?.name) {
      toast.error("Course not loaded yet.");
      setStatus("Course not loaded.");
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          courseName: course.name, // send only the course name
        }),
      });

      if (res.ok) {
        toast.success("Booking sent successfully!");
        setForm({ name: "", contact: "", message: "" });
        setShowForm(false);
        setStatus("");
      } else {
        toast.error("Failed to send booking.");
        setStatus("Error sending booking.");
      }
    } catch (err) {
      console.error(err);
      toast.error("An unexpected error occurred.");
      setStatus("Error sending booking.");
    }
  };

  if (isLoading || isPending) return <LoadingSpinner />;
  if (error) return <p>Error: Unable to fetch course details.</p>;
  if (!course) return <p>No course data available.</p>;

  return (
    <div>
      <CoursePhotoGallery photos={course.images} />

      <div className="container mx-auto mt-20">
        <div className="md:grid md:grid-cols-12 gap-10 px-3">
          <div className="md:col-span-8 md:w-full">
            <h2 className="font-bold text-left text-lg md:text-2xl">
              {course.name}{" "}
              <span className="text-primary ml-8">GH₵ {course.price} Per Month</span>
            </h2>

            <div className="my-11">
              <h2 className="font-bold text-3xl mb-2">Course Description</h2>
              <p>{course.description}</p>
            </div>

            <div className="mb-11">
              <h2 className="font-bold text-3xl mb-2">About Me</h2>
              <p>{course.aboutme}</p>
            </div>

            <div className="mb-11">
              <h2 className="font-bold text-3xl mb-2">Experience</h2>
              <p>{course.experience}</p>
            </div>

            <div className="mb-11">
              <h2 className="font-bold text-3xl mb-2">My Session</h2>
              <p>{course.mysession}</p>
            </div>

            <button
              onClick={() => setShowForm(true)}
              className="bg-primary text-center p-4 mb-8 rounded-xl text-white text-xl font-bold hover:-translate-y-2 hover:shadow-lg transition-all duration-500"
            >
              Book Me
            </button>

            {/* ✅ Booking Modal Form */}
            {showForm && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md shadow-lg relative">
                  <button
                    onClick={() => setShowForm(false)}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 dark:hover:text-white"
                  >
                    ✕
                  </button>
                  <h3 className="text-xl font-bold mb-4 text-black dark:text-white">
                    Book {course.name}
                  </h3>

                  <form onSubmit={handleContactSubmit} className="space-y-3">
                    <input
                      type="text"
                      placeholder="Your Name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full p-2 border rounded text-black dark:text-white bg-white dark:bg-gray-700"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Your Contact (phone)"
                      value={form.contact}
                      onChange={(e) => setForm({ ...form, contact: e.target.value })}
                      className="w-full p-2 border rounded text-black dark:text-white bg-white dark:bg-gray-700"
                      required
                    />
                    <textarea
                      placeholder="Your Message"
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full p-2 border rounded text-black dark:text-white bg-white dark:bg-gray-700"
                      required
                    />
                    <button
                      type="submit"
                      className="bg-primary text-center px-4 py-2 rounded-xl text-white text-xl font-bold hover:-translate-y-2 hover:shadow-lg transition-all duration-500"
                    >
                      Send Booking
                    </button>
                    <p className="text-sm mt-2 text-black dark:text-white">{status}</p>
                  </form>
                </div>
              </div>
            )}

            <div className="shadow dark:shadow-white rounded-lg p-6">
              <p className="md:text-lg font-semibold mb-4">Customer Reviews</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <CourseReview courseId={course._id} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
