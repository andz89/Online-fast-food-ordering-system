import React, { useEffect } from "react";
import Header from "../../components/Header";
import { useSelector, useDispatch } from "react-redux";
import { useGetOrdersMutation } from "../../features/orders/ordersApiSlice";
import { ordersFetched } from "../../features/orders/ordersSlice";
import { parseISO, formatDistanceToNow, format } from "date-fns";
const Order = () => {
  const [getOrders, { isLoading: getOrdersLoading }] = useGetOrdersMutation();
  const { orders } = useSelector((state) => state.orders);
  const orders_reversed = [...orders].reverse();

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

  // const datePurchase = (serverDate) => {
  //   const parsedDate = parseISO(serverDate);

  //   // Format the parsed date to your desired format
  //   const formattedDate = format(parsedDate, "yyyy-MM-dd HH:mm:ss");
  //   return formattedDate;
  // };

  return (
    <>
      {" "}
      <Header />
      <div className="flex justify-between items-center p-2 font-semibold   sticky top-0 z-10">
        <div className="relative overflow-x-auto w-full">
          {orders_reversed.map((order) => (
            <div
              key={order._id}
              className="my-5 p-2 bg-green-100 relative overflow-x-auto w-full"
            >
              <div className="text-slate-600"> {timeAgo(order.createdAt)} </div>

              <div className="flex justify-between items-center gap-3">
                <div></div>
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
                  {/* Subtotal: ₱ {order.details.subtotal} */}
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
