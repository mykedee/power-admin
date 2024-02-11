import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";

// import { listBlogPost } from "../../components/Actions/blogAction";
// import Loader from "../../components/Loader/Loader";
// import Message from "../../components/Errors/Message";
// import BlogEdit from "../../components/BlogSection/BlogEdit";
// import CardContainer from "../../components/Common/CardContainer";

const Profile = () => {
	// const dispatch = useDispatch("");
	// const navigate = useNavigate();
	// const blogList = useSelector((state) => state.blogList);
	// const userLogin = useSelector((state) => state.userLogin);
	// const { userInfo } = userLogin;
	// const { loading, posts, error } = blogList;
	// useEffect(() => {
	// 	if (!userInfo) {
	// 		navigate("/login");
	// 	}
	// 	dispatch(listBlogPost());
	// }, [navigate, dispatch]);

	return (
		<>
			{/* <CardContainer>
				<h3 className="text-left mx-2 py-3 text-lg">Update profile</h3>

				{loading ? (
					<Loader />
				) : error ? (
					<Message>{error}</Message>
				) : (
					<div className="relative h-full bg-white dark:bg-slate-700 p-5 rounded-lg shadow ">
						<form className="w-full h-full md:w-5/12 py-14 lg:py-14 mx-auto">
							<div className="mb-3" controlId="exampleForm.ControlInput1">
								<label htmlFor="username" className="block">
									Username
								</label>
								<div className="mt-2">
									<input
										className="p-3 border-0 ring-1 rounded-lg w-full dark:focus:ring-primary-orange dark:focus:border-primary-orange outline-none text-slate-900"
										type="text"
										placeholder="Enter username"
									/>
								</div>
							</div>

							<div className="mb-3" controlId="exampleForm.ControlInput1">
								<label htmlFor="username" className="block">
									Email
								</label>
								<div className="mt-2">
									<input
										className="p-3 border rounded-lg w-full ring-primary-orange dark:focus:ring-primary-orange dark:focus:border-primary-orange outline-none text-slate-900"
										type="email"
										placeholder="Enter email"
									/>
								</div>
							</div>
							<div className="my-10 ">
								<button className="bg-primary-green float-right dark:bg-primary-orange py-3 w-full md:w-1/3 rounded text-white">
									Submit
								</button>
							</div>
						</form>
					</div>
				)}
			</CardContainer> */}
		</>
	);
};

export default Profile;
