const User = require("../models/userModel");
const crypto = require("crypto");

const sendEmail = require("../utils/sendEmail");

exports.signup = async (req, res) => {
	try {
		let { username, email, password, role } = req.body;
		if (!username || !email || !password) {
			return res.status(400).json({
				message: "Username, email and Password is required!",
			});
		}
		let userExist = await User.findOne({ email });
		if (userExist) {
			return res.status(400).json({
				message: "Email is taken",
			});
		}
		// let user = await User.create({ username, email, password, role });
		// sendTokenResponse(user, 200, res);

		const code = Math.floor(1000 + Math.random() * 9000).toString();
		const emailToken = crypto.createHash("sha256").update(code).digest("hex");
		const emailTokenExpires = Date.now() + 15 * 60 * 1000;
		const message = `This is your emaail verification ${code}. It expires in 15 minutes`;
		await sendEmail({ email, subject: "Email verification", message });
		const user = await User.create({
			username,
			email,
			password,
			role,
			code,
			emailToken,
			emailTokenExpires,
		});
		sendTokenResponse(user, 200, res);
	} catch (error) {
		res.json({
			error: error.message,
		});
	}
};

exports.signin = async (req, res) => {
	try {
		let { email, password } = req.body;
		if (!email || !password) {
			return res.json({
				message: "Email and Password is required!",
			});
		}
		let user = await User.findOne({ email }).select("+password");
		if (!user) {
			return res.status(401).json({
				message: "Invalid Credential",
			});
		}
		let isMatched = await user.comparePassword(password);
		if (!isMatched) {
			return res.status(400).json({
				message: "Invalid Credentials",
			});
		}

		// if user active === false // resend verification code
		// if (!user.active) {
		// 	return res.status(400).json({
		// 		success: false,
		// 		message: "You must verify your email to activate your account",
		// 	});
		// }

		sendTokenResponse(user, 200, res);
		// let token = user.JWTSignToken()

		//     res.status(200).json({
		//       user,
		//       token
		//     })
	} catch (error) {
		res.json({
			error: error.message,
		});
	}
};

//forgot password
exports.forgotPassword = async (req, res) => {
	try {
		let { email } = req.body;
		let user = await User.findOne({ email });
		if (!user) {
			return res.status(404).json({
				message: "There is not user with that email",
			});
		}
		// get reset token
		const resetToken = user.getResetPasswordToken();

		// console.log(resetToken);
		await user.save({ validateBeforeSave: false });

		//create reset URL
		const resetUrl = `${req.protocol}://${req.get(
			"host"
		)}/api/v1/resetpassword/${resetToken}`;

		const message = `You are receiving this email because you or someone else has requested 
the reset password. Please make a request to: \n\n ${resetUrl}`;
		try {
			await sendEmail({
				email: user.email,
				subject: "Password Reset",
				message,
			});
			res.status(200).json({
				success: true,
				message: "Reset password link successfully sent to your email",
			});
		} catch (error) {
			user.resetPasswordToken = undefined;
			user.resetPasswordExpire = undefined;
			await user.save({ validateBeforeSave: false });
			return res.status(500).json({
				message: error.message,
			});
		}
	} catch (error) {
		res.status(400).json({
			error: error.message,
		});
	}
};

//reset password
exports.resetPassword = async (req, res) => {
	try {
		//get hash token
		const resetPasswordToken = crypto
			.createHash("sha256")
			.update(req.params.resettoken)
			.digest("hex");

		let user = await User.findOne({
			resetPasswordToken,
			resetPasswordExpire: { $gt: Date.now() },
		});
		if (!user) {
			return res.status(400).json({
				message: "Invalid token",
			});
		}
		//set new password
		user.password = req.body.password;
		user.resetPasswordExpire = undefined;
		user.resetPasswordToken = undefined;
		await user.save();
		sendTokenResponse(user, 200, res);
	} catch (error) {
		res.status(400).json({
			error: error.message,
		});
	}
};

/**********
// @desc: Activate User
// @access: Private Route
// @api: /api/v1/auth/verify
 *****/
exports.verifyUser = async (req, res) => {
	try {
		let { code } = req.body;
		if (!code) {
			return res.status(400).json({
				success: false,
				message: "Please enter your OTP",
			});
		}

		let emailToken = crypto.createHash("sha256").update(code).digest("hex");
		const user = await User.findOne({
			emailToken,
			emailTokenExpires: { $gte: Date.now() },
		});

		if (!user) {
			return res.status(400).json({
				success: false,
				message: "Invalid Credentials",
			});
		} else if (user.emailTokenExpires > Date.now()) {
			return res.status(400).json({
				success: false,
				message:
					"Verification token is expires..Please visit http://verify.com",
			});
		} else {
			if (user.active) {
				return res.status(400).json({
					success: false,
					message: "Account already activated",
				});
			}
		}

		user.emailToken = undefined;
		user.emailTokenExpires = undefined;
		user.active = true;
		await user.save({ validateBeforeSave: false });

		res.status(200).json({
			success: true,
			message: "Account Activated",
		});
	} catch (err) {
		res.status(400).json({
			success: false,
			err: "error is here",
		});
	}
};

//update user detail
//put /auth/updatedetails
// exports.updateDetails = async (req, res) => {
// 	try {
// 		const fieldsToUpdate = {
// 			username: req.body.username,
// 			email: req.body.email,
// 		};
// 		let user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
// 			new: true,
// 			runValidators: true,
// 		});

// 		res.status(200).json({
// 			user,
// 		});
// 	} catch (error) {
// 		res.status(400).json({
// 			error: error.message,
// 		});
// 	}
// };

//update user detail
//put /auth/updatepassword
// exports.updatePassword = async (req, res) => {
// 	try {
// 		let user = await User.findById(req.user.id).select("+password");
// 		//check current password
// 		if (!(await user.comparePassword(req.body.currentPassword))) {
// 			return res.status(401).json({
// 				message: "Password not correct",
// 			});
// 		}
// 		user.password = req.body.newPassword;
// 		await user.save({});

// 		sendTokenResponse(user, 200, res);
// 	} catch (error) {
// 		res.status(400).json({
// 			error: error.message,
// 		});
// 	}
// };

exports.updatePassword = async (req, res) => {
	try {
		let { currentPassword, newPassword } = req.body;
		if (!currentPassword || !newPassword) {
			return res.status(400).json({
				message: "Input is required!",
			});
		}
		let user = await User.findById(req.user.id).select("+password");

		let isMatched = await user.comparePassword(req.body.currentPassword);
		if (!isMatched) {
			return res.status(401).json({
				message: "Current password is incorrect",
			});
		}

		user.password = req.body.newPassword;
		await user.save();

		sendTokenResponse(user, 200, res);
	} catch (error) {
		res.json({
			error: error.message,
		});
	}
};

//logout
exports.logout = (req, res, next) => {
	res.cookie("token", "", {
		expires: new Date(0),
		httpOnly: true,
	});
	res.status(200).json({
		message: "Logged out successfully",
	});
};

const sendTokenResponse = (user, statusCode, res) => {
	let token = user.JWTSignToken();
	const options = {
		expires: new Date(
			Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
		),
		httpOnly: true,
		secure: process.env.NODE_ENV !== "development",
		sameSite: "strict",
		maxAge: process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000,
	};

	// if (process.env.NODE.ENV === 'production') {
	//   options.secure = true
	// }

	res
		.status(statusCode)
		.cookie("token", token, options)
		.json({
			success: true,
			// token,
			user: {
				username: user.username,
				email: user.email,
				role: user.role,
				photo: user.photo,
				active: user.active,
			},
		});
};
