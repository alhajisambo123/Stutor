"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import useSWR from "swr";

import { getCourses } from "@/libs/apis";
import {Course } from "@/models/course";
import Search from "@/components/Search/Search";
import CourseCard from "@/components/CourseCard/CourseCard";

const Courses = () => {
  const [courseTypeFilter, setCourseTypeFilter] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const searchParams = useSearchParams();

  useEffect(() => {
    const searchQueryParam = searchParams.get("searchQuery");
    const courseTypeParam = searchParams.get("courseType");

    if (courseTypeParam) setCourseTypeFilter(courseTypeParam);
    if (searchQueryParam) setSearchQuery(searchQueryParam);
  }, [searchParams]);

  // Fetch data function wrapped in useCallback for stability in SWR
  const fetchData = useCallback(async () => {
    try {
      return await getCourses();
    } catch (error) {
      console.error("Error fetching courses:", error);
      throw new Error("Failed to fetch courses");
    }
  }, []);

  // Use SWR for data fetching
  const { data, error, isLoading } = useSWR<Course[]>(
    "get/courses",
    fetchData
  );

  // Filter rooms based on search query and room type
  const filterCourses = useCallback(
    (courses: Course[]): Course[] => {
      return courses.filter((courses) => {
        if (
          courseTypeFilter &&
          courseTypeFilter.toLowerCase() !== "all" &&
          courses.type.toLowerCase() !== courseTypeFilter.toLowerCase()
        ) {
          return false;
        }

        if (
          searchQuery &&
          !courses.courseName.toLowerCase().includes(searchQuery.toLowerCase())
        ) {
          return false;
        }

        return true;
      });
    },
    [courseTypeFilter, searchQuery]
  );

  // Avoid conditional rendering of hooks
  const filteredCourses = data ? filterCourses(data) : [];

  return (
    <div className="container mx-auto pt-10">
      {error && (
        <p className="text-red-500">
          Cannot fetch data. Please try again later.
        </p>
      )}

      

      <Search
              courseTypeFilter={courseTypeFilter}

        searchQuery={searchQuery}
        setCourseTypeFilter={setCourseTypeFilter}
        setSearchQuery={setSearchQuery}
      />

      <div className="flex mt-20 justify-between flex-wrap">
        {isLoading ? (
          <p className="text-gray-500">Loading...</p>
        ) : filteredCourses.length > 0 ? (
          filteredCourses.map((course) => <CourseCard key={course._id} course={course} />)
        ) : (
          <p className="text-gray-500">No courses match your search criteria.</p>
        )}
      </div>
    </div>
  );
};

export default Courses;
