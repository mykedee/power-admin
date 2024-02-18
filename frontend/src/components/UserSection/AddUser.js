import React, { useState } from "react";
import { useCreateUserMutation } from "../../slices/userApiSlice";
import { toast } from "react-toastify";

const AddUser = () => {
	const [show, setShow] = useState(false);
	const handleShow = () => setShow(true);
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [role, setRole] = useState("");
	const [createUser] = useCreateUserMutation();

	const handleChange = (event) => {
		setRole(event.target.value);
	};

	const handleClose = () => {
		setEmail("");
		setPassword("");
		setUsername("");
		setRole("");
		setShow(false);
	};

	const createUserHandler = async (e) => {
		e.preventDefault();
		try {
			const res = await createUser({
				username,
				email,
				password,
				role,
			}).unwrap();
			if (res.success) {
				setShow(false);
				toast.success("User created successfully");
				setEmail("");
				setPassword("");
				setUsername("");
				setRole("");
			}
		} catch (error) {
			toast.error(error?.data?.message || error.error);
		}
	};

	return (
		<div className="form-area">
			<span className="" onClick={handleShow}>
				<div className="p-2 lg:p3 md:text-base text-sm dark:bg-primary-orange bg-primary-green text-slate-50 rounded cursor-pointer">
					+ Add User
				</div>
			</span>

			{show && (
				<div className="fixed top-0 bottom-0 left-0 right-0 z-50 bg-[rgba(0,0,0,0.5)] max-h-full overflow-y-scroll">
					<div className="relative mb-28  w-11/12 lg:w-1/2 top-24 bottom-0 mx-auto max-w-2xl max-h-full">
						<div className="relative bg-white dark:bg-slate-700 dark:text-zinc-50 rounded-lg shadow">
							<div className="flex items-start justify-between p-4 border-b rounded">
								<h3 className="text-sm font-semibold text-gray-900 dark:text-zinc-50">
									Add User
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
							<div className="w-full md:w-6/12 mx-auto p-6 space-y-6 ">
								<form id="edit-modal" className="py-4" onSubmit={createUserHandler}>
									<div className="mb-3">
										<label>Username</label>
										<input
											className="w-full p-2 border rounded text-slate-800"
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

									<div className="mb-3">
										<label>Password</label>
										<input
											className="w-full p-3 border rounded text-slate-800"
											type="text"
											value={password}
											onChange={(e) => setPassword(e.target.value)}
											placeholder="Password"
										/>
									</div>

									<div className="mb-3">
										<label>Role</label>
									
										<select
											id="role"
											className="w-full p-3 border rounded text-slate-800"
											value={role}
											onChange={handleChange}
										>
											<option selected>Choose Role</option>
											<option>admin</option>
											<option>user</option>
										</select>
									</div>
									{/* <!-- modal footer--> */}

									<div className="flex justify-end items-center mt-10 space-x-2 border-gray rounded-b">
										<button
											variant="secondary"
											onClick={handleClose}
											className="text-sm text-white bg-red-500 p-3 rounded"
										>
											Close
										</button>
										<button
											id="edit-modal"
											type="submit"
											className="p-3 text-sm rounded dark:bg-primary-orange bg-primary-green text-white"
										>
											Add User
										</button>
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

export default AddUser;
