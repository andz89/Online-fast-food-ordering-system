import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { useSelector, useDispatch } from "react-redux";
import { useGetOrdersMutation } from "../../features/orders/ordersApiSlice";
import { ordersFetched } from "../../features/orders/ordersSlice";
import { parseISO, formatDistanceToNow, format } from "date-fns";
import ReviewForm from "../../components/ReviewForm";
const Order = () => {
  const [getOrders, { isLoading: getOrdersLoading }] = useGetOrdersMutation();
  const { userInfo } = useSelector((state) => state.auth);
  const [displayReview, setDisplayReview] = useState(false);
  const [orderStatus, setOrderStatus] = useState("preparing");
  const [copyOfOrders, setCopyOfOrders] = useState([]);
  const orders_reversed = [...copyOfOrders].reverse();

  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getOrders().unwrap();
        setCopyOfOrders(data);
        dispatch(ordersFetched(data));
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  const timeAgo = (timestamp) => {
    let data = "";

    let date = parseISO(timestamp);
    let timePeriod = formatDistanceToNow(date);
    data = `${timePeriod} ago`;

    return data;
  };

  const handleChangeTab = (stat) => {
    setOrderStatus(stat);
  };
  return (
    <>
      {" "}
      {displayReview && <ReviewForm orderId={displayReview} />}
      <Header />
      <div className="flex  justify-around items-center p-1 mt-5 w-full  sm:w-[78%]  mx-auto  font-semibold cursor-pointer">
        <div
          onClick={() => handleChangeTab("preparing")}
          className={` ${
            orderStatus === "preparing"
              ? "bg-white border-b-4 border-x-0 border-t-0  border-pink-200"
              : " bg-pink-200 border-b-4 border-pink-200"
          }  w-full text-center p-2 hover:bg-pink-100  text-[13px]`}
        >
          Preparing
        </div>
        <div
          onClick={() => handleChangeTab("ready to pick up")}
          className={` ${
            orderStatus === "ready to pick up"
              ? "bg-white border-b-4 border-x-0 border-t-0  border-pink-200"
              : " bg-pink-200 border-b-4 border-pink-200"
          }  w-full text-center p-2 hover:bg-pink-100 text-[13px]`}
        >
          to pick up
        </div>
        <div
          onClick={() => handleChangeTab("complete")}
          className={` ${
            orderStatus === "complete"
              ? "bg-white border-b-4 border-x-0 border-t-0  border-pink-200"
              : " bg-pink-200 border-b-4 border-pink-200"
          }  w-full text-center p-2 hover:bg-pink-100 text-[13px] `}
        >
          Complete
        </div>
      </div>
      <div className="flex justify-between items-center p-2 font-semibold   sticky top-0 z-10">
        <div className="relative overflow-x-auto w-full px-2 sm:w-[80%] mx-auto">
          {orders_reversed.map((order) => (
            <div
              key={order._id}
              className="my-5 p-2 bg-green-100 relative overflow-x-auto w-full"
            >
              <div className="text-slate-600"> {timeAgo(order.createdAt)} </div>

              <div className="flex justify-between items-center gap-3">
                <div className="flex items-center gap-2">
                  <div className="bg-yellow-300 uppercase font-semibold  p-2 rounded text-center text-slate-800   my-1  ">
                    {orderStatus}
                  </div>

                  {orderStatus === "complete" && (
                    <div
                      onClick={() => setDisplayReview(order._id)}
                      className="hover:bg-green-300  text-green-800 my-1 cursor-pointer  bg-green-200 p-2 rounded text-sm"
                    >
                      Send a review
                    </div>
                  )}
                </div>

                <div className="text-slate-600 text-[14px]">
                  Order Id: {order._id}{" "}
                </div>
              </div>
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3"></th>
                    <th scope="col" className="px-6 py-3">
                      Qty
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Price
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Total
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {order.orders[0].orders.items.map((order) => (
                    <tr
                      key={order._id}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700  "
                    >
                      <td className="  p-4">
                        <img
                          src={order.image_one}
                          alt="Apple Watch"
                          style={{
                            width: "50px", // Set the image width to 50% to fit the container
                            height: "50px", // Set a fixed height for the banner
                            objectFit: "cover", // Ensure the image covers the container
                          }}
                        />
                      </td>
                      <td className="px-6 py-4  ">
                        <div className="w-32 font-semibold text-gray-900  ">
                          {order.food_name}{" "}
                        </div>
                        <div className="flex items-center space-x-3">
                          <div>
                            Qty:{" "}
                            <span className="font-semibold text-gray-900">
                              {order.quantity}{" "}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                        ₱ {order.orig_price}
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                        ₱ {order.price}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex justify-between items-center">
                <div className="text-slate-600 text-[14px] ">
                  {/* reference code: {order.details.ref}{" "} */}
                </div>
                <div className=" bg-slate-300   font-semibold  p-2 rounded text-center text-slate-800   my-1 w-[200px] ">
                  ₱{" "}
                  {order.orders.map((or) =>
                    or.orders.items.reduce(
                      (accumulator, order) => accumulator + order.price,
                      0
                    )
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Order;
