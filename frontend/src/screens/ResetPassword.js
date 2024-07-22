import React, { useState } from "react";
import { useResetPasswordMutation } from "../slices/userApiSlice";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../components/Loader/Loader";

const ResetPassword = () => {
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const [password, setPassword] = useState("");
  const [passwordConfirm, setConfirmPassword] = useState("");

  const handleSubmit = async (e, resettoken) => {
    e.preventDefault();
    resettoken = window.location.href.split("/").pop();
    if (password !== passwordConfirm) {
     return toast.error("Password and Confirm password does not match");
    }
    try {
      const resetPass = {
        password
      };
     
      const res = await resetPassword({ resetPass, resettoken }).unwrap();
      if (res.success) {
        setPassword("");
        setConfirmPassword("");
        toast.success("Password reset successful");
      }
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <div className="my-20">
      <div className="flex items-center justify-center flex-1">
        <Link to="/">
          <img
            src="../images/logo-green.png"
            alt="site-logo"
            className="w-20 h-20 "
          />
        </Link>
      </div>
      <div className="my-3 lg:bg-white w-11/12 md:w-7/12 lg:w-2/6 mx-auto md:rounded md:shadow">
        <h3 className="text-center pt-10 md:mx-5 md:text-4xl text-2xl mx-3 font-bold mb-4 text-slate-700">
          Reset Password
        </h3>

        <form className="py-10 md:px-10 px-0" onSubmit={handleSubmit}>
          <div className="mx-3 mb-3">
            <label className="block mb-1 font-semibold text-sm text-slate-500">
              Enter New Password
            </label>
            <input
              type="password"
              className="border p-3 w-full rounded"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="mx-3 mb-3">
            <label className="block mb-1 font-semibold text-sm text-slate-500">
              Confirm New Password
            </label>
            <input
              type="password"
              className="border p-3 w-full rounded"
              placeholder="Enter password"
              value={passwordConfirm}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <div className="mx-3 my-8">
            <button
              className="mt-4 text-base font-semibold p-3 w-full bg-primary-green text-white rounded"
              type="submit"
            >
              <span className="inline ">Reset Password</span>
              {isLoading && (
                <span className="mx-3 inline-block">
                  <Loader />
                </span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
