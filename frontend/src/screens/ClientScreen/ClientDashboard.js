import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { TbMoneybag } from "react-icons/tb";
import { MdOutlineStackedLineChart } from "react-icons/md";

// import { listBlogPost } from "../../components/Actions/blogAction";
import Loader from "../../components/Loader/Loader";
import Message from "../../components/Errors/Message";
import CardContainer from "../../components/Common/CardContainer";
// import BlogEdit from "../../components/BlogSection/BlogEdit";

const ClientDashboard = () => {
	const dispatch = useDispatch("");
	const navigate = useNavigate();
	// const blogList = useSelector((state) => state.blogList);
	// const userLogin = useSelector((state) => state.userLogin);
	// const { userInfo } = userLogin;
	// // const { loading, posts, error } = blogList;
	// useEffect(() => {
	// 	if (!userInfo) {
	// 		navigate("/login");
	// 	}
	// 	// dispatch(listBlogPost());
	// }, [navigate]);

	return (
		<>
			<CardContainer>
				{/* <section className="mt-24 mb-10 md:mb-0 md:ml-[20vw] w-full">
				<div className="w-11/12 lg:w-10/12 mx-auto"> */}
				<div className="flex justify-between text-center item-center gap-4 overflow-x-scroll lg:overflow-x-hidden">
					<Link
						to="/dashboard"
						className="px-16 py-10 rounded bg-white transition ease-in-out hover:bg-dash-bg dark:bg-slate-700 hover:dark:bg-slate-600"
					>
						<div className="flex  items-center">
							<div>
								<TbMoneybag size={50} />
							</div>
							<div>
								<p>Client Total Balance</p>
								<h1 className="font-bold text-2xl">$500,000</h1>
							</div>
						</div>
					</Link>

					<Link
						to="/dashboard"
						className="px-16 py-10 transition duration-300 ease-in-out rounded bg-white  hover:bg-dash-bg  dark:bg-slate-700 hover:dark:bg-slate-600"
					>
						<div className="flex  items-center">
							<div>
								<MdOutlineStackedLineChart size={50} />
							</div>
							<div>
								<p>Earnings</p>
								<h1 className="font-bold text-2xl">$500,000</h1>
							</div>
						</div>
					</Link>

					<Link
						to="/dashboard"
						className="px-16 py-10 transition ease-in-out rounded shadow bg-white hover:bg-dash-bg dark:bg-slate-700 hover:dark:bg-slate-600"
					>
						<p>Total Balance</p>
						<h1 className="font-bold text-2xl">$500,000</h1>
					</Link>
				</div>

				<div className="flex justify-between items-center gap-3 lg:flex-row flex-col mx-auto">
					<div className="w-full lg:flex-1 lg:my-10 my-5 px-8 py-8  rounded shadow bg-white dark:bg-slate-700">
						<h1 className="font-semibold">Recent Transaction</h1>
						<div className="my-10 py-16 rounded bg-white dark:bg-slate-700 ">
							lsjkdkdlzkdklkdkkl
						</div>
					</div>

					<div className="w-full lg:w-72 px-8 py-8 rounded shadow bg-white dark:bg-slate-700">
						<h1 className="font-semibold">Adverts</h1>
						<div className="my-10 py-16 rounded bg-white dark:bg-slate-700 ">
							lsjkdkdlzkdklkdkkl
						</div>
					</div>
				</div>
				{/* </div>
			</section> */}
			</CardContainer>
		</>
	);
};

export default ClientDashboard;
