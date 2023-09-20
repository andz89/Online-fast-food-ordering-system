import { useState, useEffect } from "react";

import { FaPlus } from "react-icons/fa";
import { foodEditted } from "../../features/foods/foodsSlice";
import { useEditFoodMutation } from "../../features/foods/foodsApiSlice";
import LoadingSpinner from "../LoadingSpinner";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";

const EditFoodForm = ({ handleHideEditForm, editFoodId }) => {
  const { foods } = useSelector((state) => state.foods);

  const foodToEdit = foods.filter((food) => food._id === editFoodId);

  const [food_name, setFood_name] = useState(foodToEdit[0].food_name);
  const [price, setPrice] = useState(foodToEdit[0].price);
  const [description, setDescription] = useState(foodToEdit[0].description);

  const foodId = foodToEdit[0]._id;
  const dispatch = useDispatch();
  const onFood_nameChanged = (e) => setFood_name(e.target.value);
  const onPriceChanged = (e) => setPrice(e.target.value);
  const canSave = Boolean(food_name) && Boolean(price);

  const [editFood, { isLoading }] = useEditFoodMutation();
  const onSubmit = async (e) => {
    e.preventDefault();
    if (food_name && price) {
      try {
        const dateUpdated = await editFood({
          foodId,
          food_name,
          price,
          description,
          //   image_one,
          //  image_two
        }).unwrap();

        const data = {
          foodId,
          food_name,
          price,
          description,
        };

        dispatch(foodEditted(data));
        handleHideEditForm();
        toast.success("Edited Successfuly", {
          position: "top-left",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } catch (error) {
        toast.error(error?.data?.message, {
          position: "top-left",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "light",
        });
      }
    }
  };
  return (
    <>
      <section className="fixed top-0 left-0 right-0 z-50     p-4 overflow-x-hidden bg-slate-900 bg-opacity-40 overflow-y-auto md:inset-0 h-[calc(100%-1rem)]  h-screen  flex items-center justify-center ">
        <form className="flex flex-col bg-white justify-center p-2 w-2/3">
          <div className="flex justify-between items-center">
            <div className="bg-teal-700 p-2 rounded text-white font-semibold my-2">
              Edit Post
            </div>
            <div
              className="bg-slate-300 p-1 rounded text-dark font-semibold text-sm my-2 cursor-pointer"
              onClick={handleHideEditForm}
            >
              Close{" "}
            </div>
          </div>

          <div>
            <label
              htmlFor="first_name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Post Title:
            </label>
            <input
              type="text"
              id="first_name"
              className="bg-gray-50 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Big Event this coming 2023"
              required
              name="postTitle"
              value={food_name}
              onChange={onFood_nameChanged}
            />
          </div>

          <label
            htmlFor="message"
            className="block my-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Post Content:
          </label>
          <textarea
            rows="4"
            className="block p-2.5 w-full text-sm outline-none text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Write your thoughts here..."
            name="postContent"
            value={price}
            onChange={onPriceChanged}
          ></textarea>

          <button
            type="button"
            className={
              canSave
                ? "text-white bg-orange-500 hover:bg-orange-600 focus:ring-4 focus:ring-orange-300 font-medium  my-5 rounded-lg text-sm px-5 py-2.5     dark:bg-orange-600   focus:outline-none  "
                : "text-gray-400 bg-gray-700   focus:ring-4 focus:ring-orange-300 font-medium my-5 rounded-lg text-sm px-5 py-2.5     dark:bg-orange-600   focus:outline-none   cursor-not-allowed"
            }
            onClick={onSubmit}
            disabled={!canSave}
          >
            Publish
          </button>
        </form>
      </section>
      {isLoading && <LoadingSpinner />}
    </>
  );
};

export default EditFoodForm;
