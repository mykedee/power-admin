const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.protect = async (req, res, next) => {
	token = req.cookies.token;
	if (token) {
		try {
			const decoded = jwt.verify(token, process.env.JWT_SECRET);
			req.user = await User.findById(decoded.id);
			next();
		} catch (error) {
			return res.status(401).json({
				message: "Not authorisede to access this route",
			});
		}
	} else {
		return res.status(401).json({
			message: "Not authorisedd to access this route",
		});
	}
};


exports.authorize = (...roles) => {
	return (req, res, next) => {
		if (!roles.includes(req.user.role)) {
			res.status(403).json({
				error: "Not authorised to access thiss route",
			});
		}
		next();
	};
};
