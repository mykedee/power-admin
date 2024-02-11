const User = require("../models/userModel");

// const users = require("../data/users");

// getAllUsers
// getUsers /api/v1/auth/users
// private/admin
exports.getUsers = async (req, res) => {
	try {
		const pageSize = 5;
		const page = Number(req.query.page) || 1;
		const count = await User.countDocuments();

		let users = await User.find({})
			.limit(pageSize)
			.skip(pageSize * (page - 1));
		res.status(200).json({
			users,
			page,
			pages: Math.ceil(count / pageSize),
			pageSize,
			count,
		});
	} catch (error) {
		res.status(400).json({
			error: error.message,
		});
	}
};

// getUser
// getUser /api/v1/auth/users/:id
//private/admin

exports.getUser = async (req, res) => {
	try {
		let user = await User.findById(req.params.id);
		res.status(200).json({ success: true, user });
	} catch (error) {
		res.status(400).json({
			error: error.message,
		});
	}
};

// createUser
// getUser /api/v1/auth/users/
//private/admin
exports.createUser = async (req, res) => {
	try {
		const { username, email, password, role } = req.body;
		if (!username || !email || !password || !role) {
			return res.status(400).json({
				message: "All fields are required",
			});
		}
		let user = await User.create(req.body);
		res.status(201).json({
			success: true,
			user,
		});
	} catch (error) {
		res.status(400).json({
			error: error.message,
		});
	}
};

// updateUser
// getUser /api/v1/auth/users/:id
//private/admin
exports.updateUser = async (req, res) => {
	try {
		let user = await User.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		});

		if (!user) {
			return res.status(400).json({
				message: "User not found",
			});
		}
		if (!req.user.id && req.user.role !== "admin") {
			return res.status(400).json({
				message: "You are not authorized to perform this action",
			});
		}

		res.status(200).json({
			success: true,
			message: "User updated successfully",
		});
	} catch (error) {
		res.status(400).json({
			error: error.message,
		});
	}
};

// getUser
// getUser /api/v1/auth/users/:id
//private/admin
exports.deleteUser = async (req, res) => {
	try {
		await User.findByIdAndDelete(req.params.id);
		res.status(200).json({
			message: "User deleted successfully",
		});
	} catch (error) {
		res.status(400).json({
			error: error.message,
		});
	}
};

// update
// user
exports.updateUserDetails = async (req, res) => {
	try {
		const fields = {
			username: req.body.username,
			email: req.body.email,
		};
		let user = await User.findByIdAndUpdate(req.user.id, fields, {
			runValidators: true,
			new: true,
		});
		res.status(200).json({
			success: true,
			user,
		});
	} catch (error) {
		res.status(400).json({
			error: error.message,
		});
	}
};

// update
// profile photo
exports.updateProfileImage = async (req, res) => {
	try {
		req.body.photo = req.file.path;
		let user = await User.findByIdAndUpdate(req.user.id, {
			$set: {
				photo: `/${req.file.path}`
				// photo: "/" + req.file.path.split("\\").slice(3).join("/"),
			},
			runValidators: true,
			new: true,
		});
console.log(req.file.path)

		res.status(200).json({
			success: true,
			user,
		});
	} catch (error) {
		res.status(400).json({
			error: error.message,
		});
	}
};

// get profile
exports.getMe = async (req, res) => {
	try {
		let user = await User.findById(req.user.id);
		res.status(200).json(user);
	} catch (error) {
		res.status(400).json({
			error: error.message,
		});
	}
};
