"use client";

import { useRouter } from "next/navigation";
import { ChangeEvent, FC } from "react";

type Props = {
  courseTypeFilter: string;
  searchQuery: string;
  setCourseTypeFilter: (value: string) => void;
  setSearchQuery: (value: string) => void;
};

const Search: FC<Props> = ({
  courseTypeFilter,
  searchQuery,
  setCourseTypeFilter,
  setSearchQuery,
}) => {
  const router = useRouter();

  const handleCourseTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setCourseTypeFilter(event.target.value);
  };

  const handleSearchQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleFilterClick = () => {
    router.push(`/courses?courseType=${courseTypeFilter}&searchQuery=${searchQuery}`);
  };

  return (
    <section className="bg-primary px-4 py-6 rounded-lg">
      <div className="container mx-auto flex gap-4 flex-wrap justify-between items-center">
        <div className="w-full md:1/3 lg:w-auto mb-4 md:mb-0">
          <label className="block text-sm font-medium mb-2 text-black">
            Course Type
          </label>
          <div className="relative">
            <select
              value={courseTypeFilter}
              onChange={handleCourseTypeChange}
              className="w-full px-4 py-2 capitalize rounded leading-tight dark:bg-black focus:outline-none"
            >
              <option value="All">All</option>
              <option value="Humanities">Humanities</option>

              <option value="Engineering">Engineering</option>
              <option value="Basic/Applied">Basic/Applied</option>
              <option value="Health">Health</option>
            </select>
          </div>
        </div>

        <div className="w-full md:1/3 lg:w-auto mb-4 md:mb-0  ">
          <label className="block text-sm font-medium mb-2 text-black   ">
             Course
          </label>
          <input
            type="search"
            id="search"
            placeholder="Course Name"
            className=" px-4 py-3 rounded leading-tight dark:bg-black focus:outline-none placeholder:text-black dark:placeholder:text-white "
            value={searchQuery}
            onChange={handleSearchQueryChange}
          />
        </div>

        <button
          className="px-4 py-3 bg-white rounded   dark:bg-black focus:outline-none placeholder:text-black dark:placeholder:text-white"
          type="button"
          onClick={handleFilterClick}
        >
          Search
        </button>
      </div>
    </section>
  );
};

export default Search;
