import React from "react";
import { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { toast } from "react-toastify";
import { useSellerRegisterMutation } from "../../features/authUser/usersApiSlice";
import { setCredentials } from "../../features/authUser/authSlice";
import LoadingSpinner from "../../components/LoadingSpinner";
import Header from "../../components/Header";
const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    storeName: "",
    description: "",
    address: "",
    number: "",
    password: "",
    password2: "",
  });
  const {
    name,
    email,
    storeName,
    number,
    password,
    password2,
    address,
    description,
  } = formData;

  const dispatch = useDispatch();
  const [register, { isLoading }] = useSellerRegisterMutation();

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const { userInfo } = useSelector((state) => state.auth);
  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [userInfo, navigate]);
  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await register({
          name,
          email,
          storeName,
          number,
          password,
          description,
          address,
        }).unwrap();

        const data = {
          token: res.accessToken,
          user: res.data,
        };
        dispatch(setCredentials({ data }));
      } catch (err) {
        toast.error(err.data.message);
      }
    }
  };

  return (
    <>
      {isLoading && <LoadingSpinner />}
      <Header />
      <form
        onSubmit={onSubmit}
        className=" max-w-[400px] mx-auto mt-12 text-white bg-teal-700 p-5 px-10 rounded"
      >
        <div className="flex items-center gap-2 my-5 justify-center">
          <FaUser size={"2em"} />{" "}
          <span className="font-semibold text-2xl">Register as Seller </span>
        </div>
        <div className="mb-6">
          <label htmlFor="text" className="block mb-2 text-sm font-medium  ">
            Full name
          </label>
          <input
            type="text"
            value={name}
            name="name"
            onChange={onChange}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="name@flowbite.com"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="email" className="block mb-2 text-sm font-medium  ">
            email
          </label>
          <input
            name="email"
            type="email"
            id="email"
            value={email}
            onChange={onChange}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="name@flowbite.com"
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="Number" className="block mb-2 text-sm font-medium  ">
            Contact Number
          </label>
          <input
            type="number"
            value={number}
            name="number"
            onChange={onChange}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="name@flowbite.com"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="storeName"
            className="block mb-2 text-sm font-medium  "
          >
            Name of Store
          </label>
          <input
            type="text"
            value={storeName}
            name="storeName"
            onChange={onChange}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="name@flowbite.com"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="storeName"
            className="block mb-2 text-sm font-medium  "
          >
            Description
          </label>
          <input
            type="text"
            value={description}
            name="description"
            onChange={onChange}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="name@flowbite.com"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="storeName"
            className="block mb-2 text-sm font-medium  "
          >
            Address
          </label>
          <input
            type="text"
            value={address}
            name="address"
            onChange={onChange}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="name@flowbite.com"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium  "
          >
            Your password
          </label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={onChange}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="repeat-password"
            className="block mb-2 text-sm font-medium  "
          >
            Repeat password
          </label>
          <input
            name="password2"
            type="password"
            id="repeat-password"
            value={password2}
            onChange={onChange}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            required
          />
        </div>

        <button
          type="submit"
          className="text-white bg-teal-900 hover:bg-teal-800 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800"
        >
          {isLoading ? "sending......" : "Register new account"}
        </button>
      </form>
    </>
  );
};

export default Register;
