const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

let userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: [true, "Username is required"],
		unique: true,
	},

	email: {
		type: String,
		required: [true, "Email is required"],
		match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g],
		unique: true,
	},

	password: {
		type: String,
		required: [true, "Password is required"],
		select: false,
	},

	role: {
		type: String,
		enum: ["admin", "user"],
		default: "user",
	},

	active: {
		type: Boolean,
		default: false,
	},
	photo: {
		type: String,
	},
	emailToken: {
		type: String,
	},
	emailTokenExpires: {
		type: Date,
	},

	createdAt: {
		type: Date,
		default: Date.now,
	},

	resetPasswordToken: {
		type: String,
	},

	resetPasswordExpire: {
		type: Date,
	},
});

userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) {
		next();
	}
	let salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.comparePassword = async function (enteredPassword) {
	return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.JWTSignToken = function () {
	return jwt.sign(
		{
			id: this._id,
			role: this.role,
		},
		process.env.JWT_SECRET,
		{ expiresIn: process.env.JWT_EXPIRE }
	);
};

userSchema.methods.getResetPasswordToken = function () {
	// generate token
	const resetToken = crypto.randomBytes(20).toString("hex");
	//hash token and set to resetPasswordToken field
	this.resetPasswordToken = crypto
		.createHash("sha256")
		.update(resetToken)
		.digest("hex");

	// set Expire
	this.resetPasswordExpire = Date.now() + 10 * 60 * 60 * 1000;

	return resetToken;
};

module.exports = mongoose.model("User", userSchema);
