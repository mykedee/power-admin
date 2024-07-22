import React, { useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { toast } from "react-toastify";
import { useUpdateUserMutation } from "../../slices/userApiSlice";
const EditUsers = ({ user }) => {
	const [updateUser] = useUpdateUserMutation();

	const [show, setShow] = useState(false);
	const [username, setUsername] = useState(user.username);
	const [email, setEmail] = useState(user.email);
	const [role, setRole] = useState(user.role);
	const [active, setActive] = useState(user.active);
	const handleClose = () => {
		setShow(show);
	};
	const handleShow = () => setShow(!show);

	const handleRoleChange = (event) => {
		setRole(event.target.value);
	};

	const handleChange = (event) => {
		setActive(event.target.value);
	};

	const handleEdit = async (id) => {
		try {
			const updatedUser = {
				username,
				email,
				role,
				active,
			};
			const res = await updateUser({
				id,
				updatedUser,
			}).unwrap();
			if (res.success) {
				setShow(false);
				toast.success("User updated successfully");
				setUsername(user.username);
				setEmail(user.email);
				setRole(user.role);
				setActive(user.active);
				console.log("edit clicked");
			}

		} catch (error) {
			toast.error(error.data.error);
		}
	};
	return (
		<div className="form-area">
			<span className="" onClick={handleShow}>
				<AiOutlineEdit />
			</span>

			{show && (
				<div className="fixed top-0 bottom-0 left-0 right-0 z-50 bg-[rgba(0,0,0,0.5)] max-h-full overflow-y-scroll">
					<div className="relative mb-28  w-11/12 lg:w-1/2 top-24 bottom-0 mx-auto max-w-2xl max-h-full">
						<div className="relative bg-white dark:bg-slate-700 dark:text-zinc-50 rounded-lg shadow">
							<div className="flex items-start justify-between p-4 border-b rounded">
								<h3 className="text-sm font-semibold text-gray-900 dark:text-zinc-50">
									Edit Post
								</h3>
								<button
									className="text-sm text-gray-900 dark:text-zinc-50"
									show={false}
									onClick={handleClose}
								>
									Close
								</button>
							</div>

							{/* <!--modal body--> */}
							<div className="w-11/12 md:w-6/12 mx-auto p-6 space-y-6 ">
								<form
									id="edit-modal"
									className="py-4"
									onSubmit={(e) => {
										e.preventDefault();
										handleEdit(user._id);
									}}
								>
									<div className="mb-3" controlId="exampleForm.ControlInput1">
										<label>Username</label>
										<input
											className="w-full p-3 border rounded text-slate-800"
											type="text"
											value={username}
											onChange={(e) => setUsername(e.target.value)}
											placeholder={username}
										/>
									</div>

									<div className="mb-3" controlId="exampleForm.ControlInput1">
										<label>Email</label>
										<input
											className="w-full p-3 border rounded text-slate-800"
											type="text"
											value={email}
											onChange={(e) => setEmail(e.target.value)}
										/>
									</div>

									<div className="mb-3" controlId="exampleForm.ControlInput1">
										<label>Account Status</label>
										<select
											id="status"
											className="w-full p-3 border rounded text-slate-800"
											value={active}
											onChange={handleChange}
										>
											<option defaultValue>
												Current status is{" "}
												{active === true
													? "active (true)"
													: "not active (false)"}
											</option>
											<option>true</option>
											<option>false</option>
										</select>
									</div>

									<div className="mb-3" controlId="exampleForm.ControlInput1">
										<label>Role</label>
										<select
											id="role"
											className="w-full p-3 border rounded text-slate-800"
											onChange={handleRoleChange}
										>
											<option defaultValue>Current role is {role}</option>
											<option>admin</option>
											<option>auser</option>
										</select>
									</div>

									{/* <!-- modal footer here--> */}
									<div className="flex justify-end items-center mt-10 space-x-3 border-gray rounded-b ">
										<div>
											<button
												variant="secondary"
												onClick={handleClose}
												className="text-sm bg-red-500 text-white p-3 rounded"
											>
												Close
											</button>
										</div>
										<div>
											<button
												id="edit-modal"
												type="submit"
												className="p-3 text-sm rounded dark:bg-primary-orange bg-primary-green text-white"
											>
												Update
											</button>
										</div>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default EditUsers;
