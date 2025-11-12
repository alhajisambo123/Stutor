"use client";

import { useState } from "react";

import Search from "../Search/Search";

const PageSearch = () => {
  const [courseTypeFilter, setCourseTypeFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <Search
      courseTypeFilter={courseTypeFilter}
      searchQuery={searchQuery}
      setCourseTypeFilter={setCourseTypeFilter}
      setSearchQuery={setSearchQuery}
    />
  );
};

export default PageSearch;
