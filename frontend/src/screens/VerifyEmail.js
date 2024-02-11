import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";

import { useVerifyUserMutation } from "../slices/userApiSlice";
import Loader from "../components/Loader/Loader";

const VerifyEmail = () => {
	const [code, setCode] = useState("");
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { userInfo } = useSelector((state) => state.auth);
	const [verify, { isLoading }] = useVerifyUserMutation();

	// useEffect(() => {
	// 	if (userInfo && userInfo.user.active === true) {
	// 		navigate("/dashboard");
	// 	}
	// }, [userInfo, navigate]);
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

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await verify({ code }).unwrap();
			dispatch(setCredentials({ code, ...userInfo }));
			navigate("/dashboard");
		} catch (error) {
			toast.error(error?.data?.message || error.error);
		}
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
				<p className="text-3xl text-center text-white">BSOM INTEGRATED</p>
			</div>

			<div className="bg-card-light md:w-5/12 lg:mx-auto w-full">
				<div className="w-11/12 md:w-9/12 mx-auto my-20">
					<Link to="/">
						<h1 className="text-center">Logo</h1>
					</Link>
					<div className="my-3">
						<h3 className="text-left md:mx-5 md:text-4xl text-2xl mx-3 font-bold mb-4">
							Email Verification
						</h3>
					</div>

					<form className="md:mx-3" onSubmit={handleSubmit}>
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
								<p className="text-sm">Resend Code</p>
							</div>
						</div>

						{userInfo && (
							<p className="text-left p-3 text-sm">
								Enter the 4-digit verification code sent to{" "}
								{userInfo.user.email}
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
				</div>
			</div>
		</div>
	);
};

export default VerifyEmail;
