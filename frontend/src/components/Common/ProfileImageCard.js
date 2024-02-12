import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { FaRegEnvelope } from "react-icons/fa";
import { GrClose } from "react-icons/gr";
import { useLogoutMutation } from "../../slices/userApiSlice";
import { logout } from "../../slices/authSlice";
import { useDispatch } from "react-redux";

const ProfileImageCard = ({ setShowProfileCard }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [logoutApi] = useLogoutMutation();
	const logoutHandler = async () => {
		try {
			await logoutApi().unwrap();
			dispatch(logout());
			navigate("/login");
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="relative py-5 transition ease-in-out duration-300">
			<div className="bg-white dark:bg-slate-700 h-68 w-[98vw] md:w-80 absolute top-16 md:top-10 -right-3 md:right-6 rounded shadow">
				<div className="flex justify-between items-center p-5 border-b">
					<p className="mx-3">Profile</p>
					<button className="right-0 bg-white dark:bg-primary-orange shadow rounded-full p-2 hover:shadow-md hover:transform scale(1.1)">
						<div onClick={() => setShowProfileCard(false)}>
							<GrClose className="" />
						</div>
					</button>
				</div>
				<div className="p-5">
					<p className="py-4 mx-3">
						Velit culpa cupidatat amet et sint. Incididunt dolore aliquip
						laborum mollit eiusmod aute occaecat veniam.
					</p>
					<div className="block">
						<Link className="flex items-center my-2  text-slate-800 hover:text-white hover:bg-primary-green dark:hover:bg-primary-orange dark:text-white rounded">
							<span className="py-4 mx-3">
								<FaRegEnvelope />{" "}
							</span>
							<span>Inbox</span>
						</Link>

						<div
							className="flex items-center text-slate-800 hover:text-white hover:bg-danger-primary-hover dark:text-white rounded cursor-pointer "
							onClick={logoutHandler}
						>
							<span className="py-4 mx-3">
								<FiLogOut />
							</span>
							<span>Logout</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProfileImageCard;
