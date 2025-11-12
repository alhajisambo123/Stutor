"use client";

import { Dispatch, FC, SetStateAction } from "react";
import { useRouter } from "next/navigation";


type Props = {
  
  setCourseId: Dispatch<SetStateAction<string | null>>;
  toggleRatingModal: () => void;
};

const Table: FC<Props> = ({  setCourseId, toggleRatingModal }) => {
  const router = useRouter();

  return (
    <div className="overflow-x-auto max-w-[340px] rounded-lg mx-auto md:max-w-full shadow-md sm:rounded-lg">
      </div>
        
  )}
             

export default Table;
