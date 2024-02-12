import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { MdInfoOutline } from "react-icons/md";
import { AiOutlineEdit } from "react-icons/ai";

import Loader from "../components/Loader/Loader";
import DialogBox from "../components/Common/DialogBox";
import CardContainer from "../components/Common/CardContainer";
import Message from "../components/Errors/Message";
import {
	useGetMeQuery,
	useUpdateUserDetailsMutation,
	useUpdateUserPhotoMutation,
} from "../slices/userApiSlice";

const Profile = () => {
	// const { id: me } = useParams();
	const [open, setOpen] = useState(false);

	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [photo, setPhoto] = useState("");
	const { isLoading, data: user, error, refetch } = useGetMeQuery();
	const [updateUserDetails] = useUpdateUserDetailsMutation();
	const [updateUserPhoto] = useUpdateUserPhotoMutation();
	const dialogLabel = "Are you sure?";
	const buttonLabel = "Save";

	useEffect(() => {
		if (user) {
			setUsername(user.username);
			setEmail(user.email);
		}
	}, [user]);

	const handleSubmit = async () => {
		try {
			if (open === true) {
				const updateDetails = {
					email,
					username,
				};
				const res = await updateUserDetails({ updateDetails }).unwrap();
				if (res.success) {
					toast.success("Profile updated successfully");
					setOpen(false);
				}
			}
		} catch (error) {
			toast.error(error.data.message || error.error);
		}
	};

	const handleUpload = async (e) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append("photo", e.target.files[0]);
		try {
			const res = await updateUserPhoto(formData).unwrap();
			if (res.success) {
				toast.success("Profile image updated successfully");
				setPhoto(res.photo);
				refetch();
			}
		} catch (error) {
			toast.error(error.data.message || error.error);
		}
	};

	return (
		<CardContainer>
			<div className="flex justify-between items-center my-2">
				<h3 className="text-left py-3 md:text-base font-bold text-sm text-slate-700 dark:text-white">
					Profile
				</h3>
			</div>

			{isLoading ? (
				<Loader />
			) : error ? (
				<Message>{error.message}</Message>
			) : (
				<>
					<div className="relative overflow-x-auto lg:overflow-x-hidden rounded-t-lg shadow-b-0 dark:bg-slate-700 bg-white">
						<div className="w-full md:w-6/12 mx-auto p-6 space-y-6 ">
							<div className="flex items-center justify-center w-full">
								<label className="flex flex-col items-center justify-center rounded-full w-24 h-24 border-2 border-gray-300 border-dashed cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
									<div className="relative items-center justify-center pt-5 pb-6">
										{user.photo ? (
											<img
												src={user.photo}
												className="z-10 w-24 h-24 rounded-full"
												alt={user.username}
											/>
										) : (
											<p className="capitalize">{user.username.charAt(0)}</p>
										)}
									</div>
									<span className="absolute inline-flex items-center justify-center top-16 border rounded-full bg-primary-orange h-4 w-4">
										<AiOutlineEdit />{" "}
									</span>
									<input
										type="file"
										className="hidden"
										onChange={handleUpload}
									/>
								</label>
							</div>

							<div className="flex justify-center space-x-3 p-3 mt-4 items-center dark:text-white text-slate-800 text-xs font-medium rounded border dark:border-primary-orange">
								<MdInfoOutline className="inline-block" size={20} />
								<p>Edit and change your profile infomation here.</p>
							</div>

							<form
								id="edit-modal"
								className="py-4"
								onSubmit={(e) => e.preventDefault()}
							>
								<div className="mb-3">
									<label>Username</label>
									<input
										className="w-full p-3 border rounded text-slate-800"
										type="text"
										value={username}
										onChange={(e) => setUsername(e.target.value)}
										placeholder="Username"
									/>
								</div>

								<div className="mb-3">
									<label>Email</label>

									<input
										className="w-full p-3 border rounded text-slate-800"
										type="text"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										placeholder="Email"
									/>
								</div>

								<div className="flex justify-end items-center mt-10 space-x-2 border-gray rounded-b">
									<div
										id="edit-modal"
										type="submit"
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
											handleSubmit={() => handleSubmit()}
										/>
									)}
								</div>
							</form>
						</div>
					</div>
				</>
			)}
		</CardContainer>
	);
};

export default Profile;
