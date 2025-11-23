"use client";

import useSWR from "swr";
import { FaSignOutAlt } from "react-icons/fa";
import Image from "next/image";
import axios from "axios";
import { signOut } from "next-auth/react";
import { useState } from "react";
import { BsJournalBookmarkFill } from "react-icons/bs";
import { GiMoneyStack } from "react-icons/gi";
import toast from "react-hot-toast";

import LoadingSpinner from "../../loading";
import RatingModal from "@/components/RatingModal/RatingModal";
import BackDrop from "@/components/BackDrop/BackDrop";
import { useParams } from "next/navigation";

const fetcher = (url: string) => axios.get(url).then(res => res.data);

const UserDetails = () => {
  const params = useParams(); // Get user ID from URL
  const userId = params.id;

  const [currentNav, setCurrentNav] = useState<"bookings" | "amount" | "ratings">("bookings");
  const [courseId, setCourseId] = useState<string | null>(null);
  const [isRatingVisible, setIsRatingVisible] = useState(false);
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [ratingValue, setRatingValue] = useState<number | null>(0);
  const [ratingText, setRatingText] = useState("");

  const toggleRatingModal = () => setIsRatingVisible(prev => !prev);

  // Fetch user info
  const { data: userData, error: userError, isLoading: loadingUserData } = useSWR(
    `/api/users/${userId}`,
    fetcher
  );

  // Fetch courses created by this user
  const { data: userCourses, error: coursesError, isLoading: loadingCourses } = useSWR(
    `/api/courses?userId=${userId}`,
    fetcher
  );

  const reviewSubmitHandler = async () => {
    if (!ratingText.trim() || !ratingValue) return toast.error("Provide both text and rating");
    if (!courseId) return toast.error("Course ID missing");

    setIsSubmittingReview(true);

    try {
      await axios.post("/api/users", {
        courseId,
        reviewText: ratingText,
        ratingValue,
      });
      toast.success("Review Submitted!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to submit review");
    } finally {
      setRatingText("");
      setRatingValue(null);
      setCourseId(null);
      setIsSubmittingReview(false);
      setIsRatingVisible(false);
    }
  };

  if (userError || coursesError) return <p>Error loading data</p>;
  if (loadingUserData || loadingCourses) return <LoadingSpinner />;
  if (!userData) return <p>User not found</p>;

  return (
    <div className="container mx-auto px-2 md:px-4 py-10">
      <div className="grid md:grid-cols-12 gap-10">
        {/* User Sidebar */}
        <div className="hidden md:block md:col-span-4 lg:col-span-3 shadow-lg h-fit sticky top-10 bg-[#eff0f2] text-black rounded-lg px-6 py-4">
          <div className="md:w-[143px] w-28 h-28 md:h-[143px] mx-auto mb-5 rounded-full overflow-hidden">
            <Image
              src={userData.image || "/hero-1.jpeg"}
              alt={userData.name || "User"}
              width={143}
              height={143}
              className="img scale-animation rounded-full"
            />
          </div>

          <div className="font-normal py-4 text-left">
            <h6 className="text-xl font-bold pb-3">About</h6>
            <p className="text-sm">{userData.about ?? ""}</p>
          </div>

          <div className="font-normal text-left">
            <h6 className="text-xl font-bold pb-3">{userData.name}</h6>
          </div>

          <div className="flex items-center">
            <p className="mr-2">Sign Out</p>
            <FaSignOutAlt
              className="text-3xl cursor-pointer"
              onClick={() => signOut({ callbackUrl: "/" })}
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="md:col-span-8 lg:col-span-9">
          <h5 className="text-2xl font-bold mb-4">Hello, {userData.name}</h5>
          <p className="text-xs py-2 font-medium">Joined In {userData._createdAt.split("T")[0]}</p>

          {/* Courses */}
          <h6 className="text-xl font-bold mb-3">Courses by {userData.name}</h6>
          {userCourses && userCourses.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-6">
              {userCourses.map((course: any) => (
                <div key={course._id} className="border rounded-lg p-4 shadow-md">
                  <Image
                    src={course.coverImage?.url || "/hero-1.jpeg"}
                    alt={course.name}
                    width={300}
                    height={200}
                    className="rounded-lg object-cover"
                  />
                  <h6 className="font-bold mt-2">{course.name}</h6>
                  <p className="text-sm">{course.description}</p>
                  <p className="text-sm font-semibold mt-1">Price: GH₵ {course.price}</p>
                  <button
                    onClick={() => { setCourseId(course._id); toggleRatingModal(); }}
                    className="mt-2 bg-blue-600 text-white px-3 py-1 rounded"
                  >
                    Rate this course
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p>This user has not created any courses yet.</p>
          )}
        </div>
      </div>

      {/* Rating Modal */}
      <RatingModal
        isOpen={isRatingVisible}
        ratingValue={ratingValue}
        setRatingValue={setRatingValue}
        ratingText={ratingText}
        setRatingText={setRatingText}
        isSubmittingReview={isSubmittingReview}
        reviewSubmitHandler={reviewSubmitHandler}
        toggleRatingModal={toggleRatingModal}
      />
      <BackDrop isOpen={isRatingVisible} />
    </div>
  );
};

export default UserDetails;
