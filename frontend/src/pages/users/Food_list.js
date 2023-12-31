import { Link, useNavigate, useParams } from "react-router-dom";

import React from "react";

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { foodsFetched } from "../../features/foods/foodsSlice";

import TimeAgo from "../../components/foods/TimeAgo";

import { useGetFoodAsUserMutation } from "../../features/foods/foodsApiSlice";
import { useGetSellersMutation } from "../../features/seller/sellersApiSlice";

import MiniLoading from "../../components/MiniLoading";
import LoadingSpinner from "../../components/LoadingSpinner";
import ReviewButton from "../../components/ReviewButton";
import Reviews_view from "../../components/Reviews_view";
const Food_lists = () => {
  const [reviewDisplay, setReviewDisplay] = useState(false);
  const [seller, setSeller] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();

  const [getFoodAsUser, { isLoading: getFoodsLoading }] =
    useGetFoodAsUserMutation();
  const [getSellers, { isLoading: getStoresLoading }] = useGetSellersMutation();

  const { foods } = useSelector((state) => state.foods);

  useEffect(() => {
    const fetchData = async () => {
      let data = { id: id };

      try {
        const res = await getFoodAsUser(data).unwrap();

        const sellersData = await getSellers().unwrap();
        const oneSeller = sellersData.filter((e) => e._id === id);

        setSeller(oneSeller);
        dispatch(foodsFetched(res));
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const seqFoods = foods
    .slice()
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  const renderedFoods = seqFoods?.map((food) => (
    <article key={food._id} className="my-4">
      <div className=" relative z-0 w-full   p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700   ">
        <div className="md:flex items-start leading-none  flex-col flex ">
          <Link to={"/foodItem/" + food._id}>
            <div className="md:flex-shrink-0">
              <img
                draggable="false"
                className="h-48  select-none w-full object-cover md:w-48"
                src={food.image_one}
                alt="Food Item"
              />
            </div>
          </Link>
          <div className="py-2 px-2 w-full ">
            <div className=" leading-none mb-0 uppercase tracking-wide text-sm text-indigo-500 font-semibold">
              {food.food_name}
            </div>
            <div className="mt-2 text-gray-900 w-44  leading-none">
              {food.price} pesos
            </div>

            <p className="mt-2 text-gray-500 w-full leading-normal ">
              {food.description}
            </p>
          </div>
        </div>
      </div>
    </article>
  ));
  return (
    <>
      {reviewDisplay && (
        <Reviews_view
          setReviewDisplay={setReviewDisplay}
          storeName={seller[0].storeName}
        />
      )}
      {seller && (
        <>
          <section className="bg-black bg-blend-multiply relative">
            <img
              src={seller[0]?.imageBg}
              alt="Conference"
              className="opacity-40 absolute inset-0 w-full h-full object-cover object-center"
            />
            <div className="px-4 mx-auto max-w-screen-xl text-center py-12 relative">
              <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">
                {seller[0]?.storeName}
              </h1>

              <p className="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">
                {seller[0]?.description}
              </p>
              <ReviewButton
                setReviewDisplay={setReviewDisplay}
                storeName={seller[0]?.storeName}
              />
            </div>
          </section>
          <section className="bg-white dark:bg-gray-900">
            <div className="  px-4 mx-auto max-w-screen-xl text-center lg:py-4">
              <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
                We invest in the world’s potential
              </h1>
              <p className=" text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-400">
                Here at Flowbite we focus on markets where technology,
                innovation, and capital can unlock long-term value and drive
                economic growth.
              </p>
            </div>
          </section>
        </>
      )}
      <div className="flex gap-5 flex wrap px-4">
        {getFoodsLoading ? <LoadingSpinner /> : renderedFoods}

        {!getFoodsLoading && foods.length === 0 && seller && (
          <div className="flex justify-center items-center flex-col w-full">
            <div className="bg-blue-100  p-4 rounded ">
              We will add our menus soon. . . Thank You!
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Food_lists;
