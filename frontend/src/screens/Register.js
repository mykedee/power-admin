import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";
import { useSignupMutation } from "../slices/userApiSlice";
import Loader from "../components/Loader/Loader";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordType, setPasswordType] = useState("password");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const [signup, { isLoading, error }] = useSignupMutation();

  useEffect(() => {
    if (userInfo && userInfo.user.active === false) {
      navigate("/verify");
    } else if (userInfo && userInfo.user.active === true) {
      navigate("/dashboard");
    } else if (!userInfo) {
      navigate("/register");
    }
  }, [userInfo, navigate]);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const res = await signup({ username, email, password }).unwrap();
      if (res.success) {
        dispatch(setCredentials({ ...res }));
        toast.success("User registered successfully");
        navigate("/verify");
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
    <div className="flex w-full h-screen ">
      <div className="md:flex flex-1 items-center justify-center md:w-7/12 bg-primary-green hidden">
        <Link to="/" className="flex justify-center my-4">
          <img src="../images/logo-white.png" className="w-28 h-28 " />
        </Link>{" "}
      </div>

      <div className="bg-card-light md:w-5/12 lg:mx-auto w-full overflow-y-scroll">
        <div className="w-11/12 md:w-9/12 mx-auto my-20">
          <Link to="/" className="md:hidden flex justify-center my-4">
            <img src="../images/logo-green.png" className="w-20 h-20 " />
          </Link>
          <h3 className="text-left md:mx-5 md:text-4xl text-2xl mx-3 font-bold mb-4 text-slate-700">
            Get Started
          </h3>

          <form className="md:mx-3" onSubmit={handleSubmit}>
            <div className="mx-3 mb-5">
              <label className="block mb-1 text-sm font-semibold text-slate-500">
                Username
              </label>
              <input
                className="w-full p-3 text-sm font-medium text-slate-600 rounded-lg border border-gray-300 ring-1 ring-gray-300 focus:ring-1 focus:ring-inset focus:ring-green-700 focus:outline-none bg-transparent"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                placeholder="Enter Username"
                required
              />
            </div>

            <div className="mx-3 mb-4">
              <label className="block mb-1 text-sm font-semibold text-slate-500">
                Email
              </label>
              <input
                className="w-full p-3 text-sm font-medium text-slate-600 rounded-lg border border-gray-300 ring-1 ring-gray-300 focus:ring-1 focus:ring-inset focus:ring-green-700 focus:outline-none bg-transparent"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Email"
                required
              />
            </div>

            <div className="mx-3 mb-4">
              <label className="block mb-1 text-sm font-semibold text-slate-500">
                Password
              </label>

              <div className="relative flex items-center justify-between ">
                <input
                  className="w-full p-3 text-sm font-medium text-slate-600 rounded-lg border border-gray-300 ring-1 ring-gray-300 focus:ring-1 focus:ring-inset focus:ring-green-700 focus:outline-none bg-transparent"
                  type={passwordType}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter Password"
                  required
                />
                <span className="mx-auto absolute right-2" onClick={toggleEye}>
                  {passwordType === "password" ? (
                    <FaEye className="text-slate-700" />
                  ) : (
                    <FaEyeSlash className="text-slate-700" />
                  )}
                </span>
              </div>
            </div>

            <div className="mx-3 mb-4">
              <button
                className="mt-4 text-base font-semibold p-3 w-full bg-primary-green text-white rounded"
                type="submit"
              >
                <span className="inline">Sign up</span>
                {isLoading && (
                  <span className="mx-3 inline-block">
                    <Loader
                      className=""
                      style={{ height: "2px", width: "2px" }}
                    />
                  </span>
                )}
              </button>
            </div>
          </form>

          <p className="text-center text-sm mt-4 text-slate-700">
            Already have an account?{" "}
            <Link to="/login">
              <span className="font-semibold text-base hover:text-primary-green text-slate-500">
                Sign in
              </span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
