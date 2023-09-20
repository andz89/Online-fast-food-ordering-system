import React from "react";
import { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { BiLinkExternal } from "react-icons/bi";

import { useSelector, useDispatch } from "react-redux";

import { toast } from "react-toastify";
// import Header from "../../component/Header";
import { setCredentials } from "../../features/authUser/authSlice";
import { useUpdateProfileMutation } from "../../features/authUser/usersApiSlice";
import LoadingSpinner from "../../components/LoadingSpinner";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
const Profile = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
  const { name, email } = formData;

  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  useEffect(() => {
    // Set name and email in the formData state
    setFormData((prevState) => ({
      ...prevState,
      name: userInfo.data.user.name,
      email: userInfo.data.user.email,
    }));
  }, [userInfo.data.user.name, userInfo.data.user.email]);
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await updateProfile({
        name,
        email,
      }).unwrap();
      const data = {
        ...userInfo,
        user: {
          name: res.name,
          email: res.email,
          roles: res.roles,
          userId: res.userId,
        },
      };
      dispatch(
        setCredentials({
          data,
        })
      );

      toast.success("Update Successfully", {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
      });
    } catch (err) {
      toast.error(err?.data?.message, {
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
  };

  return (
    <>
      {isLoading && <LoadingSpinner />}
      <Header />
      <form
        onSubmit={onSubmit}
        className="w-[400px]  border-2 border-gray-300 pb-5 px-5 mx-auto mt-12 text-dark"
      >
        <div className="flex items-center gap-2 my-2 justify-center  ">
          <span className="font-bold text-2xl   text-[#D70F64]">Profile</span>
        </div>
        <div className="flex justify-start mt-1">
          <Link
            to="/updatePasswordUser"
            className="hover:underline hover:text-dark flex items-center  gap-1   p-1 rounded text-sm"
          >
            Change Password
          </Link>
        </div>
        <div className="mb-3">
          <label htmlFor="text" className="block   text-sm font-medium  ">
            Your name
          </label>
          <input
            type="text"
            id="text"
            value={name}
            name="name"
            onChange={onChange}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="name@flowbite.com"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="block   text-sm font-medium  ">
            Your email
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

        <button
          type="submit"
          className="w-full text-white bg-[#D70F64]  hover:bg-[#C81661]   font-medium rounded-lg text-sm px-5 py-2.5 text-center "
        >
          {isLoading ? "Updating......" : "Update"}
        </button>
      </form>
    </>
  );
};

export default Profile;
