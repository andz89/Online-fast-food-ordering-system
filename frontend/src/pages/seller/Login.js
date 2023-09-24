import React from "react";
import { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Header from "../../components/Header";
import { useSellerLoginMutation } from "../../features/authUser/usersApiSlice";
import { setCredentials } from "../../features/authUser/authSlice";
import LoadingSpinner from "../../components/LoadingSpinner";
import logo from "../../assets/panda.png";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useSellerLoginMutation();
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

    try {
      const res = await login({ email, password }).unwrap();

      const data = {
        token: res.accessToken,
        user: res.data,
      };
      dispatch(setCredentials({ data }));
      //   Set the token in cookies
      toast.success(`${res.data.name}  Welcome back!`, {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
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
      <div className="flex  mt-12  mb-2 justify-center flex-col items-center">
        <div className="flex justify-center bg-white rounded p-2 w-[50px] m-auto">
          <img src={logo} width="40" alt="" />
        </div>
        <div className="flex items-center flex-col">
          <span className="text-[#D70F64] flex-1  whitespace-nowrap font-semibold text-2xl">
            Seller Login
          </span>
          <div className="text-slate-700 hover:underline italic cursor-pointer">
            <Link to={"/seller-registration"}>
              <small> Apply as Seller</small>
            </Link>
          </div>
        </div>
      </div>
      <form
        onSubmit={onSubmit}
        className="w-[400px] shadow-md mx-auto p-5 text-white bg-white border-[1px] border-slate-500 rounded-md  "
      >
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium  text-slate-700"
          >
            Your email
          </label>
          <input
            name="email"
            type="email"
            id="email"
            value={email}
            onChange={onChange}
            className="outline-none shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#D70F64]  focus:border-[#D70F64]  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#D70F64]  dark:focus:border-[#D70F64]  dark:shadow-sm-light"
            placeholder="name@flowbite.com"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-slate-700 "
          >
            Your password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={onChange}
            className="outline-none shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#D70F64]  focus:border-[#D70F64]  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#D70F64]  dark:focus:border-[#D70F64]  dark:shadow-sm-light"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full text-white bg-slate-800 hover:bg-slate-700 focus:ring-4 focus:outline-none focus:ring-slate-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-slate-600 dark:hover:bg-slate-700 dark:focus:ring-slate-800"
        >
          Login as Seller
        </button>
      </form>
    </>
  );
};

export default Login;
