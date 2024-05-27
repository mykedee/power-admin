import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setCredentials } from "../slices/authSlice";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";

import { useLoginMutation } from "../slices/userApiSlice";
import Loader from "../components/Loader/Loader";

const Login = () => {
  const [email, SetEmail] = useState("");
  const [password, SetPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [passwordType, setPasswordType] = useState("password");

  const { userInfo } = useSelector((state) => state.auth);
  const [login, { isLoading }] = useLoginMutation();

  useEffect(() => {
    if (
      userInfo &&
      userInfo.user.role === "admin" &&
      userInfo.user.active === true
    ) {
      navigate("/dashboard");
    } else {
      if (
        userInfo &&
        userInfo.user.role === "user" &&
        userInfo.user.active === true
      ) {
        navigate("/client");
      }
    }
  }, [userInfo, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      if (res.success) {
        dispatch(setCredentials({ ...res }));
      }
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  const toggleEye = () => {
    if (passwordType === "password") {
      setPasswordType("text");
    } else {
      setPasswordType("password");
    }
  };

  return (
    <div className="flex w-full h-screen">
      <div className="md:flex flex-1 items-center justify-center md:w-7/12 bg-primary-green hidden">
        <Link to="/" className="justify-center">
          <img src="../images/logo-white.png" className="w-28 h-28 " />
        </Link>
      </div>

      <div className="bg-card-light md:w-5/12 lg:mx-auto w-full">
        <div className="w-11/12 md:w-9/12 mx-auto my-20">
          <Link to="/" className="md:hidden flex justify-center my-4">
            <img src="../images/logo-green.png" className="w-20 h-20 " />
          </Link>
          <div className="my-3">
            <h3 className="text-left md:mx-5 md:text-4xl text-2xl mx-3 font-bold mb-4 text-slate-700">
              Sign in{" "}
            </h3>
          </div>

          <form className="md:mx-3" onSubmit={handleSubmit}>
            <div className="mx-3 mb-4">
              <label className="block mb-1 font-semibold text-sm text-slate-500">
                Email
              </label>
              <input
                className="w-full p-3 text-sm font-medium text-slate-600  rounded-lg border border-gray-300 ring-1 ring-gray-300 focus:ring-1 focus:ring-inset focus:ring-green-700 focus:outline-none bg-transparent"
                type="email"
                value={email}
                onChange={(e) => SetEmail(e.target.value)}
                placeholder="Enter Email"
              />
            </div>

            <div className="mx-3 mb-4">
              <label className="block mb-1 text-sm font-semibold text-slate-500">
                Password
              </label>
              <div className="relative flex items-center justify-between">
                <input
                  className="p-3 w-full text-sm font-medium text-slate-600  rounded-lg border border-gray-300 ring-1 ring-gray-300 focus:ring-1 focus:ring-inset focus:ring-green-700 focus:outline-none bg-transparent"
                  type={passwordType}
                  value={password}
                  onChange={(e) => SetPassword(e.target.value)}
                  placeholder="Enter Password"
                />
                <span className="absolute right-2 mx-auto" onClick={toggleEye}>
                  {passwordType === "password" ? (
                    <FaEye className="text-slate-700" />
                  ) : (
                    <FaEyeSlash className="text-slate-700" />
                  )}
                </span>
              </div>
            </div>
            <div className="mx-3">
              <Link to="/forgot-password" className="float-right text-sm">
                Forgot Password?
              </Link>
            </div>

            <div className="mx-3">
              <button
                className="mt-4 text-base font-semibold p-3 w-full bg-primary-green text-white rounded"
                type="submit"
              >
                <span className="inline ">Sign in</span>
                {isLoading && (
                  <span className="mx-3 inline-block">
                    <Loader />
                  </span>
                )}
              </button>
            </div>
          </form>

          <p className="text-center mt-4 p-2 text-sm text-slate-700">
            Don't have an account?{" "}
            <Link to="/register">
              <span className="text-base font-semibold hover:text-primary-green text-slate-500">
                Sign up
              </span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
