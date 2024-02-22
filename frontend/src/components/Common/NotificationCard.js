import React from "react";
import { Link } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { GrClose } from "react-icons/gr";

const NotificationCard = ({ setShowNotificationCard }) => {
	return (
		<div className="relative py-5">
			<div className="bg-white dark:bg-slate-700 h-68 w-[98vw] md:w-80 absolute top-16 md:top-10 -right-16 md:right-6 rounded shadow">
				<div className="flex justify-between items-center p-5 border-b">
					<p className="mx-3">Notifications</p>
					<button className="right-0 bg-white text-white dark:bg-primary-orange shadow rounded-full p-2 hover:shadow-md">
						<div onClick={() => setShowNotificationCard(false)}>
							<GrClose className='' />
						</div>
					</button>
				</div>

				<div className="p-5">
					<p className="py-4 mx-3">
						Velit culpa cupidatat amet et sint. Incididunt dolore aliquip
						laborum mollit eiusmod aute occaecat veniam.
					</p>
					<div className="block">
						<Link className="flex items-center hover:text-white hover:bg-primary-green dark:hover:bg-primary-orange rounded">
							<span className="py-4 mx-3">
								<FiLogOut />
							</span>
							<span>Inbox</span>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default NotificationCard;
