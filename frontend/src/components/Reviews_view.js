import React, { useEffect, useState } from "react";
import { FaStar, FaPlus, FaWindowClose } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { useGetReviewsMutation } from "../features/reviews/reviewsApiSlice";
// import { useGetReviewsMutation } from "../../features/reviews/reviewsApiSlice";
import { parseISO, formatDistanceToNow, format } from "date-fns";
import LoadingSpinner from "./LoadingSpinner";
import MiniLoading from "./MiniLoading";

const Reviews = ({ setReviewDisplay, storeName }) => {
  const [reviews, setReviews] = useState([]);
  const [getReviews, { isLoading: getReviewsLoading }] =
    useGetReviewsMutation();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getReviews().unwrap();
        setReviews(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  const createStar = (countStar) => {
    const starArray = [];
    for (let i = 1; i <= countStar; i++) {
      starArray.push(<FaStar className="text-yellow-400" key={i} />);
    }
    return starArray;
  };
  const timeAgo = (timestamp) => {
    let data = "";
    let date = parseISO(timestamp);

    // Format the date to display only date and day
    data = format(date, "yyyy-MM-dd, EEEE"); // Adjust the format as per your requirements

    return data;
  };

  const renderReviews = reviews.map((review) => (
    <div key={review._id} className="mx-3 w-[299px]   px-2">
      <div>
        <div className="block   bg-slate-100     p-3">
          <h4 className="  text-[14px] font-semibold">
            {review.details.userName}
          </h4>
          <span className="font-semibold text-[13px] text-green-700">
            {timeAgo(review.details.createAt)}
          </span>
          <div className="flex  gap-1 ">
            {}
            {createStar(review.details.countStars)}
          </div>
          {review.details.message}
        </div>
      </div>
    </div>
  ));
  return (
    <>
      <div className="fixed top-0 right-0  z-50 w-full sm:w-[300px]   bg-white   h-screen  ">
        <div className="flex  bg-pink-100 w-full p-2 flex-col h-[70px] shadow">
          <div className="flex justify-between items-center w-full">
            <h2 className="  text-2xl text-pink-700 font-semibold">
              {" "}
              {storeName}
            </h2>
            <AiOutlineClose
              onClick={() => setReviewDisplay((prev) => !prev)}
              className="cursor-pointer text-slate-700 hover:bg-slate-100 rounded m-1"
              size={"1.4rem"}
            />
          </div>
          <div className="flex  gap-1 ">
            <FaStar className="text-yellow-400 " />{" "}
            <FaStar className="text-yellow-400 " />{" "}
            <FaStar className="text-yellow-400 " />{" "}
            <FaStar className="text-yellow-400 " />{" "}
            <FaStar className="text-yellow-400 " />{" "}
          </div>
        </div>
        <div>
          <div className="flex flex-col   justify-center   gap-3 items-center my-2 w-full">
            {getReviewsLoading ? <MiniLoading /> : renderReviews}
          </div>
        </div>
      </div>
    </>
  );
};

export default Reviews;
