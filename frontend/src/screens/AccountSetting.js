import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { MdInfoOutline } from "react-icons/md";
import DialogBox from "../components/Common/DialogBox";
import CardContainer from "../components/Common/CardContainer";
import { useUpdatePasswordMutation } from "../slices/userApiSlice";

const Profile = () => {
	// const { id: me } = useParams();
	const [open, setOpen] = useState(false);

	const [currentPassword, setCurrentPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmNewPassword, setConfirmNewPassword] = useState("");

	const [updatePassword] = useUpdatePasswordMutation();
	const dialogLabel = "Are you sure?";
	const buttonLabel = "Change password";

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (newPassword !== confirmNewPassword) {
			return toast.error("New password and Re-type password does not match");
		}

		try {
			if (open === true) {
				const res = await updatePassword({
					currentPassword,
					newPassword,
				}).unwrap();
				if (res.success) {
					setOpen(false);
					setCurrentPassword("");
					setNewPassword("");
					setConfirmNewPassword("");
					toast.success("Password updated successfully");
				}
			}
		} catch (error) {
			toast.error(error.data.message || error.error);
		}
	};

	return (
		<CardContainer>
			<div className="flex justify-between items-center my-2">
				<div className="">
					<h3 className="text-left py-3 md:text-base font-bold text-sm text-slate-700 dark:text-white">
						Account Setting
					</h3>
				</div>
			</div>

			<>
				<div className="relative overflow-x-auto lg:overflow-x-hidden rounded-t-lg shadow-b-0 dark:bg-slate-700 bg-white">
					<div className="w-full md:w-6/12 mx-auto p-6 space-y-6 ">
						<div class="flex justify-center space-x-3 p-3 mt-4 items-center dark:text-white text-slate-800 text-xs font-medium rounded border dark:border-primary-orange">
							<MdInfoOutline className="inline-block" size={20} />

							<p>Edit and change your password here.</p>
						</div>
						<form id="edit-modal" className="py-4">
							<div className="mb-4">
								<label>Password</label>
								<input
									className="w-full p-2 border rounded text-slate-800"
									type="password"
									onChange={(e) => setCurrentPassword(e.target.value)}
									placeholder="Enter current password"
									required
								/>
							</div>

							<div className="mb-4">
								<input
									className="w-full p-2 border rounded text-slate-800"
									type="password"
									onChange={(e) => setNewPassword(e.target.value)}
									placeholder="Enter new password"
								/>
							</div>

							<div className="mb-4">
								<input
									className="w-full p-2 border rounded text-slate-800"
									type="password"
									onChange={(e) => setConfirmNewPassword(e.target.value)}
									placeholder="Re-type new password"
									required
								/>
							</div>

							<div className="flex justify-end items-center mt-10 space-x-2 border-gray rounded-b">
								<div
									id="edit-modal"
									className="p-3 text-sm rounded dark:bg-primary-orange bg-primary-green text-white"
									onClick={() => setOpen(true)}
								>
									Submit
								</div>
								{open && (
									<DialogBox
										open={open}
										setOpen={setOpen}
										buttonLabel={buttonLabel}
										dialogLabel={dialogLabel}
										handleSubmit={handleSubmit}
									/>
								)}
							</div>
						</form>
					</div>
				</div>
			</>
		</CardContainer>
	);
};

export default Profile;
