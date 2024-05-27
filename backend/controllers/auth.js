const User = require("../models/userModel");
const crypto = require("crypto");
const Email = require("../utils/sendEmail");

let copyRightDate = new Date().getFullYear();

exports.signup = async (req, res) => {
  try {
    let { username, email, password, role } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({
        message: "Username, Email and Password is required!",
      });
    }
    let userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({
        message: "Email is taken",
      });
    }

    const code = Math.floor(1000 + Math.random() * 9000).toString();
    const emailToken = crypto.createHash("sha256").update(code).digest("hex");
    const emailTokenExpires = Date.now() + 15 * 60 * 1000;
    await new Email({
      email,
      username,
      code,
      copyRightDate,
    }).sendVerificationMessage();

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
    sendTokenResponse(user, 200, res);
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
        message: "User with that email does not exist",
      });
    }
    // get reset token
    const resetToken = user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false });

    //create reset URL
    const Url = `${req.protocol}://${req.get(
      "host"
    )}/resetpassword/${resetToken}`;

    try {
      let username = user.username;

      await new Email({
        email: user.email,
        Url,
        username,
        copyRightDate,
      }).sendForgotPasswordMessage();

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
        message: "Invalid or expired token",
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
<<<<<<< HEAD
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
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid verification code",
      });
    }
=======
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
			//emailTokenExpires
			//emailTokenExpires: { $gte: Date.now() },
		});
		const currentTime = new Date();
                let codeTime = new Date(user.emailTokenExpires);
                const elapsedTime = currentTime - codeTime; 		
                const fifteenMinutesInMillis = 15 * 60 * 1000; 
		
		if (!user) {
			return res.status(400).json({
				success: false,
				message: "Invalid Credentials",
			});
		} else if (elapsedTime > fifteenMinutesInMillis) {
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
>>>>>>> 609c135ed6016a765d0b6169ccc4c3cda3e00595

    let timeDiff = Date.now() - user.emailTokenExpires;
    const durationMinutes = 15 * 60 * 1000;
    if (timeDiff >= durationMinutes) {
      return res.status(400).json({
        success: false,
        message: "Verification code is expired. Please resend",
      });
    }

    if (user.active) {
      return res.status(400).json({
        success: false,
        message: "Account already activated",
      });
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

exports.resendVerifyCode = async (req, res) => {
  const code = Math.floor(1000 + Math.random() * 9000).toString();
  const emailToken = crypto.createHash("sha256").update(code).digest("hex");
  const emailTokenExpires = Date.now() + 15 * 60 * 1000;
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (user.active === true) {
      return res
        .status(404)
        .json({ success: false, message: "Email is already verified" });
    }
    let username = user.username;

    user.code = code;
    user.emailToken = emailToken;
    user.emailTokenExpires = emailTokenExpires;

    await new Email({
      username,
      email,
      code,
      copyRightDate,
    }).sendVerificationMessage();

    await user.save({ validateBeforeSave: true });
    res.status(201).json({
      success: true,
      message: "Verication code sent to your email successfully",
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
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
