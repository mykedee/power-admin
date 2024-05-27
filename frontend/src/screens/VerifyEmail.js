import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";

import {
  useVerifyUserMutation,
  useResendVerificationMutation,
} from "../slices/userApiSlice";
import Loader from "../components/Loader/Loader";

const VerifyEmail = () => {
  const [time, setTime] = useState(900);
  const [code, setCode] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);
  const [verify, { isLoading }] = useVerifyUserMutation();
  const [resendverify] = useResendVerificationMutation();

  function anonymizeEmail(useremail) {
    const [localPart, domain] = useremail.split("@");
    if (localPart.length > 2) {
      const anonymizedLocalPart =
        localPart[0] +
        "*".repeat(localPart.length - 2) +
        localPart[localPart.length - 1];
      return anonymizedLocalPart + "@" + domain;
    }
    return useremail[0] + "*".repeat(localPart.length - 1) + "@" + domain;
  }

  const useremail = userInfo.user.email;
  const anonymizedEmail = anonymizeEmail(useremail);
  //   console.log(anonymizedEmail); // e***@gmail.com

  useEffect(() => {
    if (userInfo && userInfo.user.active === true) {
      navigate("/client");
    } else {
      if (userInfo && userInfo.user.active === false) {
        navigate("/verify");
      } else {
        navigate("/login");
      }
    }
  }, [userInfo, navigate]);

  useEffect(() => {
    if (time > 0) {
      setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    }
  }, [time]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await verify({ code }).unwrap();
      dispatch(setCredentials({ code, ...userInfo }));
      navigate("/client");
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  const handleCodeResend = async () => {
    try {
      const res = await resendverify({ email: userInfo.user.email }).unwrap();
      if (res.success === true) {
        toast.success(res.message);
        timerToString();
        setTime(20);
      } else if (res.success === false) {
        toast.error(res.data.message);
      } else {
        toast.error(res.error.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // useEffect(() => {
  // 	if (userInfo && userInfo.user.active === true) {
  // 		navigate("/dashboard");
  // 	} else {
  // 		if (userInfo && userInfo.user.active === false) {
  // 			navigate("/verify");
  // 		} else {
  // 			navigate("/login");
  // 		}
  // 	}
  // }, [userInfo, navigate]);

  const timerToString = () => {
    let minutes = ("0" + Math.floor(time / 60)).slice(-2);
    let seconds = ("0" + (time % 60)).slice(-2);
    return minutes + ":" + seconds;
  };

  useEffect(() => {
    if (userInfo && userInfo.user.active === true) {
      navigate("/dashboard");
    } else {
      if (userInfo && userInfo.user.active === false) {
        navigate("/verify");
      } else {
        navigate("/login");
      }
    }
  }, [userInfo, navigate]);

  return (
    <div className="flex w-full h-screen">
      <div className="md:flex flex-1 items-center justify-center md:w-7/12 bg-primary-green hidden">
        <p className="text-3xl text-center text-white">
          <Link to="/" className="flex justify-center my-4">
            <img src="../images/logo-white.png" className="w-28 h-28 " />
          </Link>{" "}
        </p>
      </div>

      <div className="bg-card-light md:w-5/12 lg:mx-auto w-full">
        <div className="w-11/12 md:w-9/12 mx-auto my-20">
          <Link to="/" className="md:hidden flex justify-center my-4">
            <img src="../images/logo-green.png" className="w-20 h-20 " />
          </Link>{" "}
          <div className="my-3">
            <h3 className="text-left md:mx-5 md:text-4xl text-2xl mx-3 font-bold mb-4">
              Email Verification
            </h3>
          </div>
          <form className="md:mx-3 mb-6" onSubmit={handleSubmit}>
            <div className="mx-3 mb-1">
              <label className="block text-sm mb-3">Enter OTP Code</label>
              <div className="relative flex items-center justify-between ring-gray-300 border-slate-200 rounded w-full outline outline-1 outline-offset-2 focus:border-0 focus:outline focus:outline-1 focus:outline-offset-2">
                <input
                  className="w-11/12 p-2 outline-none"
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Enter Code"
                />
              </div>
            </div>

            {userInfo && (
              <p className="text-left p-3 text-sm">
                Enter the 4-digit verification code sent to {anonymizedEmail}
              </p>
            )}

            <div className="mx-3">
              <button
                className="mt-3 text-base font-semibold p-3 w-full bg-primary-green text-white rounded"
                type="submit"
              >
                <span className="inline">Submit</span>
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
          <p className="text-sm text-center text-slate-700">
            Verification code expired or didn't get one?{" "}
            {time !== 0 ? (
              <span className="disabled text-slate-700">Resend </span>
            ) : (
              <button
                className="text-primary-green hover:text-green-700 font-semibold cursor-pointer"
                onClick={() => {
                  handleCodeResend();
                  timerToString();
                }}
              >
                <span className="text-base">Resend</span>
              </button>
            )}{" "}
            <span>{time === 0 ? "" : `${timerToString()}`}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
