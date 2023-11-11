import Label from "../../components/headerAndSidebar/Label";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  useGetOrdersMutation,
  useEditOrderMutation,
} from "../../features/orders/ordersApiSlice";
import { ordersFetched } from "../../features/orders/ordersSlice";
const Dashboard = () => {
  const dispatch = useDispatch();

  const [getOrders, { isLoading: getOrdersLoading }] = useGetOrdersMutation();
  const { orders } = useSelector((state) => state.orders);

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
  console.log(orders);
  return (
    <>
      <div>
        <Label>Dashboard</Label>

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  --------
                </th>
                <th scope="col" className="px-6 py-3">
                  Preparing
                </th>
                <th scope="col" className="px-6 py-3">
                  Ready to Pick up
                </th>
                <th scope="col" className="px-6 py-3">
                  Complete Orders
                </th>
                <th scope="col" className="px-6 py-3">
                  Total
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Orders
                </th>
                <td className="px-6 py-4">
                  {
                    orders.filter((food) => {
                      return food.orders[0].details.status === "preparing";
                    }).length
                  }
                </td>
                <td className="px-6 py-4">
                  {" "}
                  {
                    orders.filter(
                      (food) =>
                        food.orders[0].details.status === "ready to pick up"
                    ).length
                  }
                </td>
                <td className="px-6 py-4">
                  {" "}
                  {
                    orders.filter(
                      (food) => food.orders[0].details.status === "complete"
                    ).length
                  }
                </td>
                <td className="px-6 py-4"> {orders.length}</td>

                <td className="px-6 py-4">
                  <select
                    id="countries"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none"
                  >
                    <option selected>Month and Year</option>
                    <option value="January 2023">January 2023</option>
                    <option value="February 2023">February 2023</option>
                    <option value="March 2023">March 2023</option>
                    <option value="April 2023">April 2023</option>
                    <option value="May 2023">May 2023</option>
                    <option value="June 2023">June 2023</option>
                    <option value="July 2023">July 2023</option>
                    <option value="August 2023">August 2023</option>
                    <option value="September 2023">September 2023</option>
                    <option value="October 2023">October 2023</option>
                    <option value="November 2023">November 2023</option>
                    <option value="December 2023">December 2023</option>
                  </select>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
