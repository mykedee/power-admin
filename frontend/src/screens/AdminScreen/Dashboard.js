import { TbMoneybag } from "react-icons/tb";
import { MdOutlineStackedLineChart } from "react-icons/md";
import { HiOutlineUsers } from "react-icons/hi2";
import CardContainer from "../../components/Common/CardContainer";
import { Link } from "react-router-dom";

const Dashboard = () => {
	return (
		<>
			<CardContainer>
				<div className="flex justify-between text-center items-center gap-3 overflow-x-scroll lg:overflow-x-hidden">
					<div className="h-52 lg:h-auto px-12 py-10 my-2 rounded bg-white transition ease-in-out hover:bg-dash-bg dark:bg-slate-700 ">
						<div className="flex flex-1 justify-center items-center space-y-2">
							<div className="flex justify-center items-center  rounded-full dark:bg-slate-600 shadow dark:hover:shadow-md dark:hover:bg-slate-500 h-12 w-12 transition ease-in-out">
								<TbMoneybag size={20} />
							</div>
						</div>

						<div className="">
							<p>Total Sales</p>
							<h1 className="font-bold text-2xl">$500,000</h1>
						</div>
					</div>

					<div className="h-52 lg:h-auto px-12 py-10 rounded bg-white transition ease-in-out hover:bg-dash-bg dark:bg-slate-700 ">
						<div className="flex flex-1 justify-center items-center space-y-2">
							<div className="flex justify-center items-center rounded-full dark:bg-slate-600 shadow dark:hover:shadow-md dark:hover:bg-slate-500 h-12 w-12 transition ease-in-out">
								<MdOutlineStackedLineChart size={20} />
							</div>
						</div>
						<div className="w-full">
							<p>Order Completed</p>
							<h1 className="font-bold text-2xl">$500,000</h1>
						</div>
					</div>

					<div className="h-52 lg:h-auto px-12 py-10 rounded bg-white transition ease-in-out hover:bg-dash-bg dark:bg-slate-700 ">
						<div className="flex flex-1 justify-center items-center space-y-2">
							<div className="flex justify-center items-center  rounded-full dark:bg-slate-600 shadow dark:hover:shadow-md dark:hover:bg-slate-500 h-12 w-12 transition ease-in-out">
								<HiOutlineUsers size={20} />
							</div>
						</div>
						<div>
							<p>Customers</p>
							<h1 className="font-bold text-2xl">$500,000</h1>
						</div>
					</div>

					<div className="h-52 lg:h-auto px-12 py-10 rounded bg-white transition ease-in-out hover:bg-dash-bg dark:bg-slate-700 ">
						<div className="flex flex-1 justify-center items-center space-y-2">
							<div className="flex justify-center items-center  rounded-full dark:bg-slate-600 shadow dark:hover:shadow-md dark:hover:bg-slate-500 h-12 w-12 transition ease-in-out">
								<HiOutlineUsers size={20} />
							</div>
						</div>
						<div>
							<p>Customers</p>
							<h1 className="font-bold text-2xl">$500,000</h1>
						</div>
					</div>
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
			</CardContainer>
		</>
	);
};

export default Dashboard;
