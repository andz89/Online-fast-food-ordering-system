import Label from "../../components/headerAndSidebar/Label";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  useGetOrdersMutation,
  useEditOrderMutation,
} from "../../features/orders/ordersApiSlice";
import { toast } from "react-toastify";
import { ordersFetched } from "../../features/orders/ordersSlice";
import { parseISO, formatDistanceToNow, format } from "date-fns";
import LoadingSpinner from "../../components/LoadingSpinner";
import { useNavigate } from "react-router-dom";
import MiniLoading from "../../components/MiniLoading";

const Orders = () => {
  const [subtotal, setSubtotal] = useState([]);
  const navigate = useNavigate();

  const [getOrders, { isLoading: getOrdersLoading }] = useGetOrdersMutation();
  const [editOrder, { isLoading: editOrderLoading }] = useEditOrderMutation();

  const { orders } = useSelector((state) => state.orders);
  const orders_reversed = [...orders].reverse();
  const preparingOrders = orders_reversed.filter((order) => {
    return order.orders[0].details.status === "preparing";
  });

  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getOrders().unwrap();

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
  const handleChangeStatus = async (orderId) => {
    // Update the state with the new orders array
    let status = "ready to pick up";
    try {
      await editOrder({ orderId, status }).unwrap();
      const updatedOrders = orders.filter((order) => order._id !== orderId);
      dispatch(ordersFetched(updatedOrders));
      navigate("/pickUpOrders");
      toast.success("Order moved  Successfully", {
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
  const sub = (price) => {
    console.log(price);
    // setSubtotal([...subtotal, price]);
  };
  return (
    <div>
      {editOrderLoading && <LoadingSpinner />}
      <Label>Orders</Label>
      <div className="flex  justify-center items-center p-2 font-semibold   sticky top-0 z-10">
        {getOrdersLoading ? (
          <MiniLoading />
        ) : (
          <div className="relative overflow-x-auto w-full">
            {preparingOrders.map((order) => (
              <div
                key={order._id}
                className="my-5 p-2 bg-green-100 relative overflow-x-auto w-full"
              >
                <div className="flex p-2 justify-between">
                  <div className="text-slate-600">
                    {" "}
                    {timeAgo(order.createdAt)}{" "}
                  </div>
                  <div
                    onClick={() => handleChangeStatus(order._id)}
                    className="text-slate-600 bg-blue-300 p-2 rounded cursor-pointer"
                  >
                    Move to pick up order
                  </div>
                </div>

                <div className="flex justify-between items-center gap-3">
                  <div className="bg-yellow-300 uppercase font-semibold  p-2 rounded text-center text-slate-800   my-1  ">
                    {order.orders[0].details.status}
                  </div>
                  <div className="text-slate-600 text-[14px]">
                    Order Id: {order._id}{" "}
                  </div>
                </div>
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Product name
                      </th>
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
                    {order.orders.map((order) => (
                      <>
                        {order.orders.items.map((item) => (
                          <>
                            <tr
                              key={item._id}
                              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700  "
                            >
                              <td className="  p-4">
                                <img
                                  src={item.image_one}
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
                                  {item.food_name}{" "}
                                </div>
                                <div className="flex items-center space-x-3">
                                  <div>
                                    Qty:{" "}
                                    <span className="font-semibold text-gray-900">
                                      {item.quantity}{" "}
                                    </span>
                                  </div>
                                </div>
                              </td>

                              <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                ₱ {item.orig_price}
                              </td>
                              <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                ₱ {item.price} ---
                              </td>
                            </tr>
                          </>
                        ))}
                      </>
                    ))}
                  </tbody>
                </table>
                <div className="flex justify-between items-center">
                  <div className="text-slate-600 text-[14px] ">
                    {/* <div> reference code: {order.orders[0].details.ref} </div> */}
                    <div>
                      {" "}
                      Buyer Email: {order.orders[0].details.buyerEmail}
                    </div>
                  </div>
                  <div className=" bg-slate-300   font-semibold  p-2 rounded text-center text-slate-800   my-1 w-[200px] ">
                    Subtotal: ₱ {order.orders[0].details.subtotal}
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
        )}
      </div>
    </div>
  );
};

export default Orders;
