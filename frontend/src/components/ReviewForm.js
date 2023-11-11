import React, { useEffect, useState } from "react";
import { FaStar, FaPlus } from "react-icons/fa";
import { useSetNewReviewMutation } from "../features/reviews/reviewsApiSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import LoadingSpinner from "../components/LoadingSpinner";
const Reviews = ({ orderId }) => {
  const navigate = useNavigate();
  const [setNewReview, { isLoading: setNewReviewLoading }] =
    useSetNewReviewMutation();
  const [stars, setStars] = useState([]);
  const [countStar, setCountStar] = useState(5);
  const [message, setMessage] = useState("");
  useEffect(() => {
    const starArray = [];
    for (let i = 1; i <= countStar; i++) {
      starArray.push(<FaStar className="text-yellow-400" key={i} />);
    }
    setStars(starArray);
  }, [countStar]);
  const handleSumbitReview = async () => {
    let data = {
      countStars: countStar,
      message: message,
      orderId: orderId,
    };
    try {
      await setNewReview({ data }).unwrap();
      navigate("/reviewPage");
      toast.success("Order sent Successfully", {
        position: "top-left",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      toast.error("Something went wrong", {
        position: "top-left",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
      });
    }
  };
  return (
    <div className="fixed top-0 left-0 right-0 z-50   w-full p-4 overflow-x-hidden bg-slate-900 bg-opacity-40 overflow-y-auto md:inset-0 h-[calc(100%-1rem)]  h-screen  flex items-center justify-center ">
      {setNewReviewLoading && <LoadingSpinner />}
      <div className="bg-white p-2">
        <div className="text-center">
          <h2 className="mt-4 text-2xl text-green-700 font-semibold">
            Customer's Reviews
          </h2>
          <p className="px-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              className="inline-block h-7 w-7 pr-2"
              viewBox="0 0 24 24"
            >
              <path d="M13 14.725c0-5.141 3.892-10.519 10-11.725l.984 2.126c-2.215.835-4.163 3.742-4.38 5.746 2.491.392 4.396 2.547 4.396 5.149 0 3.182-2.584 4.979-5.199 4.979-3.015 0-5.801-2.305-5.801-6.275zm-13 0c0-5.141 3.892-10.519 10-11.725l.984 2.126c-2.215.835-4.163 3.742-4.38 5.746 2.491.392 4.396 2.547 4.396 5.149 0 3.182-2.584 4.979-5.199 4.979-3.015 0-5.801-2.305-5.801-6.275z" />
            </svg>
            Lorem ipsum dolor sit amet eos adipisci, consectetur adipisicing
            elit.
          </p>
        </div>
        <div className="w-[95%] mx-auto my-5 border border-dashed p-5 ">
          <label
            forhtml="message"
            className="block flex items-center gap-2 mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your feedback <div className="flex  gap-1  ">{stars}</div>
          </label>
          <textarea
            onChange={(e) => setMessage(e.target.value)}
            id="message"
            rows="4"
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none"
            placeholder="Leave a feedback..."
          ></textarea>

          <label
            forhtml="countries"
            className="block my-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Stars
          </label>
          <select
            onChange={(e) => setCountStar(e.target.value)}
            id="countries"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[40%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="5">5 Stars </option>
            <option value="4">4 Stars</option>
            <option value="3">3 Stars</option>
            <option value="2">2 Stars</option>
            <option value="1">1 Star</option>
          </select>
          <div className="flex justify-end">
            <div
              onClick={() => handleSumbitReview()}
              className="bg-green-700 p-2 cursor-pointer rounded font-semibold text-white hover:bg-green-600"
            >
              Submit Review
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
