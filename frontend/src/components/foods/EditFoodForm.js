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
  const [image_one, setImageOne] = useState();
  const [image_two, setImageTwo] = useState();

  const foodId = foodToEdit[0]._id;
  const dispatch = useDispatch();
  const onNameChanged = (e) => setFood_name(e.target.value);
  const onPriceChanged = (e) => setPrice(e.target.value);
  const onDescriptionChanged = (e) => setDescription(e.target.value);
  const onImageOneChanged = (e) => setImageOne(e.target.files[0]);
  const onImageTwoChanged = (e) => setImageTwo(e.target.files[0]);

  const canSave = Boolean(food_name) && Boolean(price);

  const [editFood, { isLoading }] = useEditFoodMutation();
  const onSubmit = async (e) => {
    e.preventDefault();
    if (food_name && price) {
      const formData = new FormData();

      image_one && formData.append("image_one", image_one);
      image_two && formData.append("image_two", image_two);
      formData.append("foodId", foodId);

      formData.append("food_name", food_name);
      formData.append("price", price);
      formData.append("description", description);

      try {
        const editFoodITem = await editFood(formData).unwrap();

        const data = {
          foodId,
          food_name,
          price,
          description,
          image_one: editFoodITem.image_one,
          image_two: editFoodITem.image_two,
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
        <form className="flex flex-col bg-white w-[600px]   p-2  overflow-y-scroll h-[600px]">
          <div className="flex justify-between items-center">
            <div className="bg-teal-700 p-2 rounded text-white font-semibold my-2">
              Edit Food Item
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
              Product Name:
            </label>
            <input
              type="text"
              id="first_name"
              className="bg-gray-50 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Big Event this coming 2023"
              required
              name="productName"
              value={food_name}
              onChange={onNameChanged}
            />
          </div>
          <div>
            <label
              htmlFor="first_name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Product Price:
            </label>
            <input
              type="number"
              className="bg-gray-50 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Big Event this coming 2023"
              required
              name="productPrice"
              value={price}
              onChange={onPriceChanged}
            />
          </div>
          <div>
            <label
              htmlFor="message"
              className="block my-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Product description:
            </label>
            <textarea
              rows={10}
              className=" w-full mb-22   p-2.5   text-sm outline-none text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500   "
              placeholder="Write your thoughts here..."
              name="productDescription"
              value={description}
              onChange={onDescriptionChanged}
            ></textarea>
          </div>

          <br></br>
          <br></br>

          <div className="  mt-5  w-full mb-6 group">
            <input
              type="file"
              accept="image/*"
              name="image_one"
              onChange={onImageOneChanged}
            />
            <div className="px-5 py-3">
              <img src={foodToEdit[0].image_one} alt="" width={300} />
            </div>
            <input
              className="mt-5"
              type="file"
              accept="image/*"
              name="image_two"
              onChange={onImageTwoChanged}
            />{" "}
            <div className="px-5 py-3">
              <img src={foodToEdit[0].image_two} alt="" width={300} />
            </div>
          </div>

          <button
            type="button"
            className={
              canSave
                ? "text-white bg-[#D70F64] hover:bg-pink-600 focus:ring-4 focus:ring-pink-300 font-medium  my-5 rounded-lg text-sm px-5 py-2.5        focus:outline-none  "
                : "text-gray-400 bg-gray-700   focus:ring-4 focus:ring-pink-300 font-medium my-5 rounded-lg text-sm px-5 py-2.5      focus:outline-none   cursor-not-allowed"
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
