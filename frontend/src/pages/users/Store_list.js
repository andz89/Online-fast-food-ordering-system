import storeImage from "../../assets/store.jpg";
import Header from "../../components/Header";
import { useGetSellersMutation } from "../../features/seller/sellersApiSlice";
import React from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { logoutFood } from "../../features/foods/foodsSlice";
import { sellersFetched } from "../../features/seller/sellersSlice";

import { useSelector, useDispatch } from "react-redux";
// import LoadingSpinner from "../LoadingSpinner";

const Sellers_list = () => {
  const { sellers } = useSelector((state) => state.sellers);

  const dispatch = useDispatch();
  const [getSellers, { isLoading: getStoresLoading }] = useGetSellersMutation();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getSellers().unwrap();
        dispatch(logoutFood());
        dispatch(sellersFetched(data));
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      <Header />
      <div className="flex items-center justify-start flex-wrap w-full">
        {sellers.map((seller) => (
          <div className="p-4" key={seller._id}>
            <div className="bg-white w-[250px] border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <img
                className="rounded-t-lg"
                src={seller.imageBg}
                alt=""
                style={{
                  width: "100%", // Set the image width to 100% to fit the container
                  height: "200px", // Set a fixed height for the banner
                  objectFit: "cover", // Ensure the image covers the container
                }}
              />

              <div className="p-5">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {seller.storeName}
                </h5>

                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  {seller.description}
                </p>
                <Link
                  to={"/foodList/" + seller._id}
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  View Menu
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Sellers_list;
