import React, { useState } from "react";
import { BsBell } from "react-icons/bs";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import ProfileImageCard from "../Common/ProfileImageCard";
import NotificationCard from "../Common/NotificationCard";
import { useSelector } from "react-redux";

const TopCard = (props) => {
	const [showProfileCard, setShowProfileCard] = useState(false);
	const [showNotificationCard, setShowNotificationCard] = useState(false);
	const { userInfo } = useSelector((state) => state.auth);

	const openProfileCard = () => {
		setShowNotificationCard(false);
		if (!showProfileCard) {
			setShowProfileCard(true);
		} else {
			setShowProfileCard(false);
		}
	};

	const openNotificationCard = () => {
		setShowProfileCard(false);
		if (!showNotificationCard) {
			setShowNotificationCard(true);
		} else {
			setShowNotificationCard(false);
		}
	};
	return (
		<div className="w-full right-0 top-0 absolute md:bg-transparent bg-white dark:bg-slate-800 border-b-slate-800 shadow md:border-b-0 md:shadow-none z-10 p-1">
			<div className="flex justify-between lg:justify-end items-center p-3 mx-0 md:mx-3">
				<span>
					<button className="p-2 lg:hidden" onClick={props.handleClick}>
						<GiHamburgerMenu />
					</button>
				</span>
				<span className="flex items-center justify-between">
					<div className="cursor-pointer" onClick={props.toggleMode}>
						{props.darkMode ? (
							<MdOutlineDarkMode size={20} />
						) : (
							<MdOutlineLightMode size={20} />
						)}
					</div>
					<div
						className="relative items-center m-3 cursor-pointer text-sm font-medium text-center dark:text-white"
						onClick={openNotificationCard}
					>
						<BsBell size={20} />
						<span className="absolute inline-flex items-center justify-center -top-3 w-5 h-5 text-xs font-bold text-white bg-green-700 dark:bg-primary-orange border-2 border-white rounded-full dark:border-gray-900">
							6
						</span>
					</div>

					{showNotificationCard && (
						<NotificationCard
							setShowNotificationCard={setShowNotificationCard}
						/>
					)}
					<div className="mx-2 hidden md:block">
						<span>
							Hello,{" "}
							{userInfo ? (
								<span className="w-full">{userInfo.user.username}</span>
							) : (
								""
							)}
						</span>
					</div>

					{userInfo.user.photo ? (
						<div
							className="bg-green-700 dark:bg-primary-orange border-solid border-4 hover:border-dash-bg w-10 h-10 rounded-full cursor-pointer"
							onClick={openProfileCard}
						><img className='flex-1  flex item-center justify-center rounded-full' src={userInfo.user.photo}/></div>
					) : (
						<span
							className="flex items-center flex-1 justify-center bg-green-700 text-white dark:bg-primary-orange border-solid border-4 hover:border-dash-bg w-10 h-10 rounded-full cursor-pointer"
							onClick={openProfileCard}
						>
							<p className="font-bold capitalize ">
								{userInfo.user.username.charAt(0)}
							</p>
						</span>
					)}

					<span className="mx-1" onClick={openProfileCard}>
						<svg
							className="w-3 h-3"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 10 6"
						>
							<path
								stroke="currentColor"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="m1 1 4 4 4-4"
							/>
						</svg>
					</span>
					{showProfileCard && (
						<ProfileImageCard setShowProfileCard={setShowProfileCard} />
					)}
				</span>
			</div>
		</div>
	);
};

export default TopCard;
