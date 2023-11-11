import React from "react";
import { FaStar, FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
const ReviewButton = ({ storeName, setReviewDisplay }) => {
  return (
    <div>
      <div
        onClick={() => setReviewDisplay(true)}
        id="marketing-banner"
        tabIndex="-1"
        className=" rounded bg-white mx-auto border-b-[1px] border-slate-300   h-[80px] w-[200px]      shadow-sm   cursor-pointer   "
      >
        <div className="bg-pink-400 h-[7px]"> </div>
        <div className="flex flex-col mt-3 ">
          <div className="flex items-center px-3 ">
            <p className="flex items-center text-sm font-normal text-gray-500 dark:text-gray-400">
              {storeName}
            </p>
          </div>

          <div className="px-3 flex items-center gap-2">
            <span className="flex items-center text-sm font-normal  dark:text-gray-400">
              {" "}
              Reviews{" "}
            </span>{" "}
            <div className="flex  gap-1 ">
              {" "}
              <FaStar className="text-yellow-400 " />{" "}
              <FaStar className="text-yellow-400 " />{" "}
              <FaStar className="text-yellow-400 " />{" "}
              <FaStar className="text-yellow-400 " />{" "}
              <FaStar className="text-yellow-400 " />{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewButton;
