import { TbMoneybag } from "react-icons/tb";
import { MdOutlineStackedLineChart } from "react-icons/md";
import { HiOutlineUsers } from "react-icons/hi2";
import CardContainer from "../../components/Common/CardContainer";
import { SalesChart, DemograpyChart } from "../../components/Charts";
import RecentTransactions from "../../components/RecentTransactions";


const Dashboard = () => {
	return (
    <CardContainer>
            <section className="pt-10">

      <div className="flex my-5 justify-between text-center items-center gap-1 overflow-x-scroll lg:overflow-x-scroll space-x-7">
        <div className="h-52 lg:h-auto px-32 py-10 my-2 rounded bg-white transition ease-in-out hover:bg-[#fbfbfb] dark:bg-slate-700">
          <div className="flex flex-1 justify-center items-center space-y-2">
            <div className="flex justify-center items-center  rounded-full dark:bg-slate-600 shadow dark:hover:shadow-md dark:hover:bg-slate-500 h-12 w-12 transition ease-in-out">
              <TbMoneybag size={20} />
            </div>
          </div>

          <div className="">
            <p className="my-2">Total Sales</p>
            <h1 className="font-bold text-2xl">$500,000</h1>
          </div>
        </div>

        <div className="h-52 lg:h-auto px-20 py-10 rounded bg-white transition ease-in-out hover:bg-[#fbfbfb] dark:bg-slate-700 ">
          <div className="flex flex-1 justify-center items-center space-y-2">
            <div className="flex justify-center items-center rounded-full dark:bg-slate-600 shadow dark:hover:shadow-md dark:hover:bg-slate-500 h-12 w-12 transition ease-in-out">
              <MdOutlineStackedLineChart size={20} />
            </div>
          </div>
          <div className="w-full">
            <p className="my-2">Order Completed</p>
            <h1 className="font-bold text-2xl">5,000</h1>
          </div>
        </div>

        <div className="h-52 lg:h-auto px-32 py-10 rounded bg-white transition ease-in-out hover:bg-[#fbfbfb] dark:bg-slate-700 ">
          <div className="flex flex-1 justify-center items-center space-y-2">
            <div className="flex justify-center items-center  rounded-full dark:bg-slate-600 shadow dark:hover:shadow-md dark:hover:bg-slate-500 h-12 w-12 transition ease-in-out">
              <HiOutlineUsers size={20} />
            </div>
          </div>
          <div>
            <p className="my-2">Customers</p>
            <h1 className="font-bold text-2xl">20,000</h1>
          </div>
        </div>
      </div>

      <div className="flex justify-between flex-col md:flex-row md:space-x-10">
        <div className="w-full md:w-1/2 mx-auto  rounded my-3 dark:bg-slate-700 bg-white">
          <h2 className="font-bold text-lg p-3">Yearly Profits</h2>
		  <SalesChart/>
        </div>

        <div className="w-full md:w-2/3 mx-auto rounded my-3 dark:bg-slate-700 bg-white">
          <h2 className="font-bold text-lg p-3">Customer Demograpy</h2>
       <DemograpyChart/>
	   
        </div>
      </div>

      <div className="flex justify-between items-center gap-3 lg:flex-row flex-col mx-auto">
        <div className="w-full lg:flex-1 lg:my-10 my-5 px-1 md:px-8 py-8  rounded shadow bg-white dark:bg-slate-700">
          <h1 className="font-semibold px-2">Recent Transactions</h1>
          <div className="my-5  rounded bg-white dark:bg-slate-700 ">
		   <RecentTransactions/>
          </div>
        </div>
      </div>
      </section>
    </CardContainer>
  );
};

export default Dashboard;
