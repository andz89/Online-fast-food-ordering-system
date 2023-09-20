import React from "react";
import { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import { setCredentials } from "../../features/authUser/authSlice";
import { useUpdatePasswordMutation } from "../../features/authUser/usersApiSlice";
import LoadingSpinner from "../../components/LoadingSpinner";
import { BiLinkExternal } from "react-icons/bi";
const UpdatePassword = () => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
  });
  const { currentPassword, newPassword } = formData;

  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);
  const [updatePassword, { isLoading }] = useUpdatePasswordMutation();

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await updatePassword({
        currentPassword,
        newPassword,
      }).unwrap();
      const data = {
        ...userInfo,
        user: {
          name: res.name,
          email: res.email,
          roles: res.roles,
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

      <form
        onSubmit={onSubmit}
        className="w-[400px]  border-2 border-gray-300 pb-5 px-5 mx-auto mt-12 text-dark"
      >
        <div className="flex justify-end mt-1">
          <Link
            to="/profile-user"
            className="hover:bg-slate-500 hover:text-white flex items-center  gap-1 bg-slate-400 p-1 rounded text-sm"
          >
            <BiLinkExternal className="font-bold" /> Profile
          </Link>
        </div>
        <div className="flex items-center gap-2 my-2 justify-center  ">
          <FaUser size={"2em"} />{" "}
          <span className="font-bold text-2xl uppercase">Update Password </span>
        </div>

        <div className="mb-3">
          <label
            htmlFor="currentPassword"
            className="block  text-sm font-medium  "
          >
            Current Password
          </label>
          <input
            type="password"
            name="currentPassword"
            id="currentPassword"
            value={currentPassword}
            onChange={onChange}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="newPassword"
            className="block   text-sm font-medium  "
          >
            New Password
          </label>
          <input
            name="newPassword"
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={onChange}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full text-white bg-[#D70F64] hover:bg-[F1418C]   font-medium rounded-lg text-sm px-5 py-2.5 text-center "
        >
          {isLoading ? "Updating......" : "Update"}
        </button>
      </form>
    </>
  );
};

export default UpdatePassword;
