import { TbMoneybag } from "react-icons/tb";
import { MdOutlineStackedLineChart } from "react-icons/md";
import CardContainer from "../../components/Common/CardContainer";
import { Link } from 'react-router-dom';

const Dashboard = () => {

	return (
		<>
			<CardContainer>

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
								<p>Total Balance</p>
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
			</CardContainer>
		</>
	);
};

export default Dashboard;
