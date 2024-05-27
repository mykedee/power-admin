import React, { useState } from "react";
import { useForgotPasswordMutation } from "../slices/userApiSlice";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../components/Loader/Loader";

const ForgotPassword = () => {
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const [email, setEmail] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await forgotPassword({ email }).unwrap();
      if (res.success) {
        setEmail("");
        toast.success("Reset password link successfully sent to your email");
      }
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };
  return (
    <div className="my-20">
      <div className="flex items-center justify-center flex-1">
        <Link to="/">
          <img src="../images/logo-green.png" alt="" className="w-20 h-20 " />
        </Link>
      </div>
      <div className="my-3 bg-white w-11/12 lg:w-2/6 mx-auto rounded shadow">
        <h3 className="text-center pt-10 md:mx-5 md:text-4xl text-2xl mx-3 font-bold mb-4 text-slate-700">
          Forgot Password
        </h3>
        <form className="p-5 md:px-10" onSubmit={handleSubmit}>
          <div className="mx-3 mb-3">
            <label className="block mb-1 font-semibold text-sm text-slate-500">
              Email Address
            </label>{" "}
            <input
              type="email"
              className="w-full p-3 text-sm font-medium text-slate-600  rounded-lg border border-gray-300 ring-1 ring-gray-300 focus:ring-1 focus:ring-inset focus:ring-green-700 focus:outline-none bg-transparent"
              placeholder="Enter your email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mx-3 my-4">
            <button
              className="mt-4 text-base font-semibold p-3 w-full bg-primary-green text-white rounded"
              type="submit"
            >
              <span className="inline ">Reset Password</span>
              {isLoading && (
                <span className="mx-3 inline-block">
                  <Loader className="" />
                </span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
