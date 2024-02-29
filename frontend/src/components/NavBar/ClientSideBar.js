import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
// import { HiOutlineViewList } from "react-icons/hi";
import { FiUsers, FiLogOut } from "react-icons/fi";
import { GrClose, GrOrderedList } from "react-icons/gr";
import { BiUser } from "react-icons/bi";
// import { BsBell } from "react-icons/bs";
import { MdOutlineWorkOutline } from "react-icons/md";
import { GiBigGear } from "react-icons/gi";
import { logout } from "../../slices/authSlice";
import { useDispatch } from "react-redux";
import { useLogoutMutation } from "../../slices/userApiSlice";

const DashLeftBar = (props) => {
	const dispatch = useDispatch();
	const [activeLink, setActiveLink] = useState(true);
	const [logoutApi] = useLogoutMutation();
	const navigate = useNavigate();
	const logoutHandler = async () => {
		try {
			await logoutApi().unwrap();
			dispatch(logout());
			navigate("/login");
		} catch (error) {}
	};

	return (
		<section className="relative">
			<div className={props.cardOpen ? "cardClose" : "cardOpen"}>
				<div className="bg-white dark:bg-slate-700 dark:shadow-xl shadow fixed md:w-[25vw] lg:w-[18vw] w-5/6 min-h-full z-40 ">
					<div className="flex justify-between items-center space-x-7 p-5">
						<span className="mx-3">
							<Link
								to="/dashboard"
								className="bg-transparent dark:bg-transparent hover:bg-transparent dark:hover:bg-transparent"
							>
								<h1 className="text-sm font-extrabold dark:text-zinc-50">
									PowerAdmin
								</h1>
							</Link>
						</span>
						<span className="mx-3 " onClick={props.handleClick}>
							<h1 className="lg:hidden" id={"dark-white"}>
								<GrClose />
							</h1>
						</span>
						<div
							className="absolute top-20 h-full lg:h-0  w-full right-0 z-50 bg-primary"
							onClick={props.handleClick}
						>
							<NavLink
								to="/client"
								activeClassName="active"
								className="link"
								end
							>
								<span className=" mx-3">
									<FiUsers />
								</span>
								<span>Dashboard</span>
							</NavLink>

							<NavLink
								to="/client/profile"
								activeClassName="active"
								className="link"
							>
								<span className="mx-3">
									<BiUser />
								</span>

								<span>Profile</span>
							</NavLink>

							<NavLink
								to="/client/edit-account"
								activeClassName="active"
								className="link"
							>
								<span className="mx-3">
									<GiBigGear />
								</span>

								<span>Account Security</span>
							</NavLink>

							<Link
								to="#"
								className="absolute w-[200px] hover:w-[200px] lg:w-[250px] flex items-center mx-3 p-4 my-3 hover:bg-danger-primary-hover hover:text-white md:hover:w-[200px] lg:hover:w-[225px] hover:rounded cursor-pointer"
								onClick={logoutHandler}
							>
								<span className="mx-3">
									<FiLogOut />
								</span>
								<span>Logout</span>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default DashLeftBar;
