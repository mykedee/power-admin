const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/asyncHandler");
const User = require("../models/userModel");

// getAllUsers
// getUsers /api/v1/auth/users
// private/admin
exports.getUsers = asyncHandler(async (req, res, next) => {
    const pageSize = process.env.PAGE_SIZE;
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
  });

// getUser
// getUser /api/v1/auth/users/:id
//private/admin

exports.getUser = asyncHandler(async (req, res) => {
    let user = await User.findById(req.params.id);
    res.status(200).json({ success: true, user });
});

// createUser
// getUser /api/v1/auth/users/
//private/admin
exports.createUser = asyncHandler(async(req, res) => {
    const { username, email, password, role } = req.body;
    if (!username || !email || !password || !role) {
		return next(new ErrorResponse("All fields are required", 400));
    }
    let user = await User.create(req.body);
    res.status(201).json({
      success: true,
      user,
    });
});

// updateUser
// getUser /api/v1/auth/users/:id
//private/admin
exports.updateUser = asyncHandler(async (req, res) => {
    let user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!user) {
		return next(new ErrorResponse("User not found", 400))
    }
    if (!req.user.id && req.user.role !== "admin") {
	return next(new ErrorResponse("You are not authorized to perform this action", 400))
    }
    res.status(200).json({
      success: true,
      message: "User updated successfully",
    });
});

// getUser
// getUser /api/v1/auth/users/:id
//private/admin
exports.deleteUser = asyncHandler(async(req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: "User deleted successfully",
    });
});

// update
// user
exports.updateUserDetails = asyncHandler(async(req, res) => {
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
});

// update
// profile photo
exports.updateProfileImage = asyncHandler(async (req, res) => {
    req.body.photo = req.file.path;
    let user = await User.findByIdAndUpdate(req.user.id, {
      $set: {
        photo: `/${req.file.path}`,
      },
      runValidators: true,
      new: true,
    });
    res.status(200).json({
      success: true,
      user,
    });
});

// get profile
exports.getMe = asyncHandler(async (req, res) => {
    let user = await User.findById(req.user.id);
    res.status(200).json(user);
});
