import Header from "../../components/Header";
import { useGetFoodsMutation } from "../../features/foods/foodsApiSlice";

import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { cartsFetched, removeCart } from "../../features/carts/cartsSlice";
import { sellersFetched } from "../../features/seller/sellersSlice";
import { useGetSellersMutation } from "../../features/seller/sellersApiSlice";

import {
  useGetCartMutation,
  useDeleteFoodFromCartMutation,
} from "../../features/carts/cartsApiSlice";
import LoadingSpinner from "../../components/LoadingSpinner";
import MiniLoading from "../../components/MiniLoading";
import Checkout from "../../components/order/Checkout";

const Food_list = () => {
  // const [getSellers, { isLoading: getStoresLoading }] = useGetSellersMutation();
  const [getCart, { isLoading: getCartLoading }] = useGetCartMutation();
  const [deleteFoodFromCart, { isLoading: deleteLoading }] =
    useDeleteFoodFromCartMutation();
  const { carts } = useSelector((state) => state.carts);
  // const { sellers } = useSelector((state) => state.sellers);

  const dispatch = useDispatch();
  const [selection, setSelection] = useState([]);
  const [checkout, setCheckout] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCart().unwrap();
        // const sellersData = await getSellers().unwrap();
        // dispatch(sellersFetched(sellersData));
        dispatch(cartsFetched(data));
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const onDelete = async (cartId) => {
    try {
      await deleteFoodFromCart({ cartId }).unwrap();
      dispatch(removeCart({ cartId }));
      const newSelection = selection.filter((e) => {
        return e._id !== cartId;
      });
      setSelection(newSelection);
      toast.success("Delete Successfully", {
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
  const handleSelection = (food) => {
    const ss = selection.filter((e) => e.food_id === food.food_id);
    if (ss.length > 0) {
      const newSelection = selection.filter((e) => e.food_id !== food.food_id);
      setSelection(newSelection);
    } else {
      setSelection([...selection, food]);
    }
  };
  const updateSelection_inc = (food, current_qty) => {
    // Find the target selection for the given food
    const targetSelection = selection.find((e) => e.food_id === food.food_id);

    if (targetSelection) {
      // If the target selection exists, update its quantity and price
      const updatedFood = {
        ...targetSelection,
        quantity: parseInt(current_qty) + 1,
        price: parseInt(food.orig_price) * (parseInt(current_qty) + 1),
      };

      // Update the selection by replacing the existing selection with the updated one
      setSelection((prevSelection) =>
        prevSelection.map((item) =>
          item.food_id === food.food_id ? updatedFood : item
        )
      );
    }
  };
  const updateSelection_input = (qty, food) => {
    // Find the target selection for the given food
    const targetSelection = selection.find((e) => e.food_id === food.food_id);

    if (targetSelection) {
      // If the target selection exists, update its quantity and price
      const updatedFood = {
        ...targetSelection,

        quantity: parseInt(qty),
        price: parseInt(food.orig_price) * parseInt(qty),
      };

      // Update the selection by replacing the existing selection with the updated one
      setSelection((prevSelection) =>
        prevSelection.map((item) =>
          item.food_id === food.food_id ? updatedFood : item
        )
      );
    }
  };
  const updateSelection_dec = (food, current_qty) => {
    // Find the target selection for the given food
    const targetSelection = selection.find((e) => e.food_id === food.food_id);

    if (targetSelection) {
      // If the target selection exists, update its quantity and price
      const updatedFood = {
        ...targetSelection,
        quantity: parseInt(current_qty) - 1,
        price: parseInt(food.price) - parseInt(food.orig_price),
      };

      // Update the selection by replacing the existing selection with the updated one
      setSelection((prevSelection) =>
        prevSelection.map((item) =>
          item.food_id === food.food_id ? updatedFood : item
        )
      );
    }
  };
  function containsOnlyNumbers(inputString) {
    // Use a regular expression to match only digits (0-9)
    var regex = /^[0-9]+$/;
    return regex.test(inputString);
  }
  const handleQuantity = (num, food) => {
    let qty;
    if (containsOnlyNumbers(num)) {
      qty = num;
    } else {
      qty = 1;
    }
    const targetId = food.food_id;
    const current_qty = food.quantity;

    const updatedCart = carts.map((food) => {
      if (food.food_id === targetId) {
        updateSelection_input(qty, food);
        const updatedFood = {
          ...food,
          quantity: parseInt(qty),
          price: parseInt(food.orig_price) * parseInt(qty),
        };
        return updatedFood;
      }
      return food;
    });
    dispatch(cartsFetched(updatedCart));
  };
  const decQuantity = (food) => {
    const targetId = food.food_id;
    const current_qty = food.quantity;

    const updatedCart = carts.map((food) => {
      if (food.food_id === targetId) {
        if (current_qty <= 1) {
          //kung below 1 na ang quantity
          const updatedFood = {
            ...food,
            quantity: 1,
            price: food.price,
          };
          return updatedFood;
        } else {
          updateSelection_dec(food, current_qty);
          const updatedFood = {
            ...food,
            quantity: parseInt(current_qty) - 1,
            price: parseInt(food.price) - parseInt(food.orig_price),
          };
          return updatedFood;
        }
      }
      return food;
    });
    dispatch(cartsFetched(updatedCart));
  };
  const addQuantity = (food) => {
    const targetId = food.food_id;

    const current_qty = food.quantity;

    const updatedCart = carts.map((food) => {
      if (food.food_id === targetId) {
        updateSelection_inc(food, current_qty);
        // Clone the food object and update the quantity and price

        const updatedFood = {
          ...food,
          quantity: parseInt(current_qty) + 1,
          price: parseInt(food.orig_price) * (parseInt(current_qty) + 1),
        };
        return updatedFood;
      }
      return food;
    });
    dispatch(cartsFetched(updatedCart));
  };
  const doneCheckout = async () => {
    try {
      const cartIdsToRemove = selection.map((item) => item._id);

      for (const cartId of cartIdsToRemove) {
        await deleteFoodFromCart({ cartId }).unwrap();
        dispatch(removeCart({ cartId }));
      }

      setSelection([]);

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
  const groupedData = carts.reduce((accumulator, item) => {
    const existingItem = accumulator.find(
      (group) => group.seller_id === item.seller_id
    );

    if (existingItem) {
      existingItem.items.push(item);
    } else {
      accumulator.push({
        seller_id: item.seller_id,
        sellerName: item.sellerInfo.details.sellerName,
        items: [item],
      });
    }

    return accumulator;
  }, []);

  return (
    <>
      {deleteLoading && <LoadingSpinner />}
      <Header />
      {getCartLoading ? (
        <div className="mt-5">
          <MiniLoading />
        </div>
      ) : (
        <div>
          {checkout && (
            <Checkout
              orders={selection}
              setCheckout={setCheckout}
              doneCheckout={doneCheckout}
            />
          )}{" "}
          <div className="flex justify-between items-center p-2 font-semibold   sticky top-0 z-10">
            <div className="text-2xl text-slate-500">
              {" "}
              {selection.length > 0 && <div> {selection.length} Selected</div>}
            </div>
            {selection.length > 0 ? (
              <div
                onClick={() => setCheckout(true)}
                className="bg-teal-600 cursor-pointer mr-3 p-2 rounded text-white"
              >
                Check out
              </div>
            ) : (
              <div className="bg-slate-300 text-slate-500 cursor-pointer mr-3 p-2 rounded  ">
                Check out
              </div>
            )}
          </div>
          {groupedData.map((food) => (
            <div
              key={food.seller_id}
              className="relative overflow-x-auto my-6  border-pink-600 border-2 mx-2 shadow-md sm:rounded-lg"
            >
              <table className="w-full  text-sm text-left text-slate-900  ">
                <thead>
                  <tr>
                    <th className="flex flex-col px-5  py-3">
                      <span>
                        {" "}
                        Store: {food.sellerName}
                        <div>Seller Name: {food.sellerName}</div>
                      </span>{" "}
                    </th>
                  </tr>
                </thead>

                <tbody className="bg-white">
                  {food.items.map((item) => (
                    <tr
                      key={item.food_id}
                      className="  flex  flex-col justify-around sm:flex-row items-center w-full border-b   hover:bg-pink-100  "
                    >
                      <td className="px-6 py-4 font-semibold text-slate-900 dark:text-white">
                        <div className="flex items-center">
                          <label
                            forhtml={item.food_id}
                            className="cursor-pointer ml-2 text-sm font-medium  dark:text-gray-300 flex items-center gap-2"
                          >
                            <input
                              onChange={(e) => handleSelection(item)}
                              id={item.food_id}
                              type="checkbox"
                              value=""
                              className="cursor-pointer w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded   dark:bg-gray-700 dark:border-gray-600"
                            />
                            Select
                          </label>
                        </div>
                      </td>
                      <td className="w-32 p-4">
                        <img
                          src={item.image_one}
                          style={{
                            width: "100px", // Set the image width to 100% to fit the container
                            height: "100px", // Set a fixed height for the banner
                            objectFit: "cover", // Ensure the image covers the container
                          }}
                        />
                      </td>
                      <td className="px-6 py-4 w-32 font-semibold text-gray-900 dark:text-white">
                        {item.food_name}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={(e) => decQuantity(item)}
                            className="inline-flex items-center justify-center p-1 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                            type="button"
                          >
                            <span className="sr-only">Quantity button</span>
                            <svg
                              className="w-3 h-3"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 18 2"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M1 1h16"
                              />
                            </svg>
                          </button>
                          <div>
                            <input
                              onChange={(e) =>
                                handleQuantity(e.target.value, item)
                              }
                              min="0"
                              max="100"
                              value={item.quantity}
                              type="text"
                              id="first_product"
                              className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              placeholder="1"
                              required
                            />
                          </div>
                          <button
                            onClick={(e) => addQuantity(item)}
                            className="inline-flex items-center justify-center h-6 w-6 p-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                            type="button"
                          >
                            <span className="sr-only">Quantity button</span>
                            <svg
                              className="w-3 h-3"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 18 18"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9 1v16M1 9h16"
                              />
                            </svg>
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                        ₱ {item.price}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          onClick={() => onDelete(item._id)}
                          className="font-medium text-slate-700 hover:bg-slate-700 hover:text-gray-100 cursor-pointer flex w-[100px] px-1 py-2 items-center justify-center   rounded"
                        >
                          Remove <FaTrash className="ml-2" />
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      )}
    </>
  );
};
export default Food_list;
