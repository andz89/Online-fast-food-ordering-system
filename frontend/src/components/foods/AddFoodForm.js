import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAddFoodMutation } from "../../features/foods/foodsApiSlice";
import { foodAdded } from "../../features/foods/foodsSlice";
import { toast } from "react-toastify";
import LoadingSpinner from "../../components/LoadingSpinner";
const AddFoodForm = ({ hideAddForm }) => {
  const [addFood, { isLoading: addFoodLading }] = useAddFoodMutation();
  const dispatch = useDispatch();
  const [foodData, setFormData] = useState({
    food_name: "",
    price: "",
    description: "",
    image_one: "",
    image_two: "",
  });
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleImageChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.files[0],
    }));
  };

  const onClickSubmit = async (e) => {
    if (foodData.food_name && foodData.price) {
      const formData = new FormData();
      const image_one = foodData.image_one;
      const image_two = foodData.image_two;

      const food_name = foodData.food_name;
      const price = foodData.price;
      const description = foodData.description;

      formData.append("image_one", image_one);
      formData.append("image_two", image_two);

      formData.append("food_name", food_name);
      formData.append("price", price);
      formData.append("description", description);

      try {
        const dataFromServer = await addFood(formData).unwrap();

        const data = {
          food_name: dataFromServer.food.food_name,
          price: dataFromServer.food.price,
          description: dataFromServer.food.description,
          _id: dataFromServer.food._id,
          image_one: dataFromServer.food.image_one,
          image_two: dataFromServer.food.image_two,

          _id: dataFromServer.food._id,

          dateCreated: dataFromServer.food.dateCreated,
          dateUpdated: dataFromServer.food.dateUpdated,
        };

        dispatch(foodAdded(data));
        hideAddForm();
        toast.success("Publish Successfuly", {
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
      {addFoodLading && <LoadingSpinner />}
      <form className="my-5">
        <div className="relative z-0 w-full mb-6 group">
          <input
            onChange={onChange}
            type="text"
            name="food_name"
            id="food_name"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="food_name"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Food Name
          </label>
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <input
            onChange={onChange}
            type="Number"
            name="price"
            id="Price"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="Price"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Price
          </label>
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="file"
            accept="image/*"
            name="image_one"
            onChange={handleImageChange}
          />
          <input
            type="file"
            accept="image/*"
            name="image_two"
            onChange={handleImageChange}
          />
        </div>

        <div className="relative z-0 w-full mb-6 group">
          <label
            htmlFor="Description"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Food Description
          </label>
          <textarea
            onChange={onChange}
            name="description"
            id="Description"
            rows="4"
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 dark:focus:ring-blue-500 focus:outline-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Write your thoughts here..."
          ></textarea>
        </div>

        <button
          onClick={onClickSubmit}
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default AddFoodForm;
