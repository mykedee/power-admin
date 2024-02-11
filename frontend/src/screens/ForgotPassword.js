import React from "react";

const ResetPassword = () => {
	return (
		<div>
			<form className="p-10 my-32 bg-white w-11/12 lg:w-2/6 mx-auto rounded shadow">
				<div className="mx-3 mb-3" controlId="exampleForm.ControlInput1">
					<label className="block mb-1">Email address</label>
					<input
						type="email"
						className="border p-3 w-full rounded"
						placeholder="name@example.com"
					/>
				</div>

				<div className="mx-3 my-8">
					<button className="bg-primary-green w-full text-white p-3 rounded">
						Submit
					</button>
				</div>
			</form>
		</div>
	);
};

export default ResetPassword;
