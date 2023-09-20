import React from "react";
import { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";

import { toast } from "react-toastify";
import Header from "../../components/Header";
import { useRegisterMutation } from "../../features/authUser/usersApiSlice";
import { setCredentials } from "../../features/authUser/authSlice";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/panda.png";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const { name, email, password, password2 } = formData;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [register, { isLoading }] = useRegisterMutation();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [userInfo, navigate]);
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await register({ name, email, password }).unwrap();
        const data = {
          token: res.accessToken,
          user: res.data,
        };
        dispatch(setCredentials({ data }));
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
    }
  };

  return (
    <>
      <Header />
      <form
        onSubmit={onSubmit}
        className="w-[400px] mx-auto mt-8 text-dark border-[1px] rounded p-5 "
      >
        <div className="flex justify-center bg-white rounded p-2 w-[50px] m-auto">
          {" "}
          <img src={logo} width="40" />{" "}
        </div>
        <div className="flex items-center gap-2 my-3 justify-center">
          <span className="  whitespace-nowrap text-2xl font-semibold text-[#D70F64]">
            Register To Our App
          </span>
        </div>
        <div className="mb-3">
          <label htmlFor="text" className="block  text-sm font-medium  ">
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
          <label htmlFor="email" className="block  text-sm font-medium  ">
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
        <div className="mb-3">
          <label htmlFor="password" className="block  text-sm font-medium  ">
            Your password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={onChange}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            required
          />
        </div>
        <div className="mb-3">
          <label
            htmlFor="repeat-password"
            className="block  text-sm font-medium  "
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
          className="w-full text-white bg-[#D70F64]  hover:bg-[#C81661]    font-medium rounded-lg text-sm px-5 py-2.5 text-center  "
        >
          {isLoading ? "sending......" : "Register new account"}
        </button>
      </form>
    </>
  );
};

export default Register;
