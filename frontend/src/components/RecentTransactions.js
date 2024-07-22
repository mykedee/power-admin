import {data}from '../data'
import moment from "moment";
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Paginate from './Paginate';


const RecentTransactions = () => {
const [page, setPage] = useState(1)
let {orders, pageSize, count, pages} = data
let items = orders.slice(0,8)



const dateFormat = (date) => {
            return moment(date)
              .utcOffset(0)
              .format("  MMMM DD YYYY (hh:mm:ss a)");
          };

          const formatMoney = (num) =>
            "₦" + num.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return (
    <>
      <div>
        <div className="relative overflow-x-auto  bg-white">
          <table className="table-auto w-full bg-[#fdfdfd] dark:bg-slate-600 svg:dark">
            <thead className="text-left text-sm text-slate-600 dark:text-white border-b">
              <tr className="whitespace-nowrap">
                <th scope="col" className=" px-3 py-3">
                  #
                </th>
                <th scope="col" className=" px-3 py-3">
                  ID
                </th>
                <th scope="col" className=" px-3 py-3">
                  USER
                </th>

                <th scope="col" className=" px-3 py-3">
                  PAID
                </th>

                <th scope="col" className=" px-3 py-3 overflow-x">
                  DATE
                </th>
                <th scope="col" className=" px-3 py-3">
                  TOTAL
                </th>
                <th scope="col" className=" px-3 py-3">
                  REFERENCE
                </th>
                <th scope="col" className=" px-3 py-3">
                  DELIVERED
                </th>

                <th scope="col" className=" px-3 py-3">
                  DETAILS
                </th>
              </tr>
            </thead>

            <tbody>
              {items.map((order, index) => (
                <tr className="border-b px-3 py-3" key={order._id}>
                  <td className="border-b px-3 py-3">
                    {(page - 1) * pageSize + index + 1}
                  </td>
                  <td className="border-b px-3 py-3 whitespace-nowrap">
                    {order._id}
                  </td>
                  <td className="border-b px-3 py-3 whitespace-pre lg:whitespace-normal ">
                    {order.username}
                  </td>
                  <td className="border-b px-3 py-3 whitespace-nowrap">
                    {order.isPaid ? (
                      <span className="rounded bg-primary-green p-2 dark:bg-primary-orange text-slate-50 text-xs">
                        Paid
                      </span>
                    ) : (
                      <span className="rounded bg-red-400 p-2 text-slate-50 text-xs">
                        Not Paid
                      </span>
                    )}
                  </td>
                  <td className="border-b px-3 py-3 whitespace-nowrap">
                    {dateFormat(order.createdAt)}
                  </td>
                  <td className="border-b px-3 py-3 whitespace-nowrap">
                    {formatMoney(order.total)}{" "}
                  </td>
                  <td className="border-b px-3 py-3 whitespace-nowrap">
                    {order.reference ? <span>{order.reference}</span> : "null"}{" "}
                  </td>
                  <td className="border-b px-3 py-3 whitespace-nowrap">
                    {order.isDelivered ? (
                      <span className="rounded bg-primary-green p-2 dark:bg-primary-orange text-slate-50 text-xs">
                        Delivered
                      </span>
                    ) : (
                      "Not Delivered"
                    )}
                  </td>

                  <td className="border-b px-3 py-3 whitespace-nowrap">
                    <Link
                      to="/"
                      className="rounded bg-primary-green p-2 dark:bg-primary-orange dark:hover:bg-primary-orange-hover hover:bg-green-700 text-slate-50 text-xs"
                    >
                      Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Paginate
          pageSize={pageSize}
          page={page}
          setPage={setPage}
          pages={pages}
          data={data}
          count={count}
        />
      </div>
    </>
  );
}

export default RecentTransactions