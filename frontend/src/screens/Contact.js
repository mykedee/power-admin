import React, { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";
// import { Form, Card, Button, Row, Col } from "react-bootstrap";
// import FormContainer from "../components/Forms/FormContainer";
// import { loginUser } from "../components/Actions/userAction";
// import Loader from "../components/Loader/Loader";
// import Message from "../components/Errors/Message";

const Contact = () => {
	const [name, SetName] = useState("");
	const [email, SetEmail] = useState("");
	const [message, SetMessage] = useState("");
	// const dispatch = useDispatch();
	// const navigate = useNavigate();
	// const userLogin = useSelector((state) => state.userLogin);
	// const { loading, error, userInfo } = userLogin;

	// const [type, SetType] = useState("password");
	// const [fa, SetIcon] = useState('')
	// const handleIcon = () => {
	// 	if (type === "password") {
	// 		SetType("text");
	// 	} else {
	// 		SetType("password");
	// 	}
	// };

	// useEffect(() => {
	//  if (userInfo) {
	//   navigate("/dashboard");
	//  }
	// }, [userInfo, navigate]);

	const handleSubmit = (e) => {
		e.preventDefault();
		// dispatch(loginUser(name, email, message));
	};

	return (
		<div className="py-5">
			<div className="py-40">
				<h3 className="text-center mb-5 font-bold text-lg text-slate-950">
					Contact Us
				</h3>
				<form
					onSubmit={handleSubmit}
					className="bg-dash-bg w-1/2 p-28  mx-auto"
				>
					<div className="mb-3">
						<label className="block text-sm">Name</label>
						<input
							className="p-3 rounded w-full"
							type="text"
							value={name}
							onChange={(e) => SetName(e.target.value)}
							placeholder="Enter Email"
						/>
					</div>

					<div className="mb-3">
						<label className="block text-sm">Email</label>
						<div className="input-icon rounded">
							<input
								className="p-3 w-full rounded"
								type="email"
								value={email}
								onChange={(e) => SetEmail(e.target.value)}
								placeholder="Enter Password"
							/>
							<span className="icc">
								<i
									className={
										<i className="fa fa-eye-slash"></i> ? (
											<i className="fa fa-eye"></i>
										) : (
											<i className="fa fa-eye-slash" aria-hidden="true"></i>
										)
									}
									aria-hidden="true"
								></i>
							</span>
						</div>
					</div>

					<div className="mb-3" controlId="exampleForm.ControlTextarea1">
						<label className="block text-sm">Message</label>
						<textarea
							className="p-3 rounded w-full"
							type="text"
							value={message}
							onChange={(e) => SetMessage(e.target.value)}
							placeholder="Enter Message"
							rows={3}
						/>
					</div>

					<button
						className="mt-3 float-right p-3 bg-primary-green text-zinc-50 rounded w-32"
						type="submit"
					>
						Submit
					</button>
				</form>

				{/* </Card> */}
			</div>
		</div>
	);
};

export default Contact;
