const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/asyncHandler");
const User = require("../models/userModel");
const crypto = require("crypto");
const Email = require("../utils/sendEmail");
let copyRightDate = new Date().getFullYear();

// signup
// signup /api/v1/auth/signup
// public
exports.signup = asyncHandler(async (req, res, next) => {
  let { username, email, password, role } = req.body;
  if (!username || !email || !password) {
    return next(
      new ErrorResponse("Username, Email and Password is required!", 400)
    );
  }
  let userExist = await User.findOne({ email });
  if (userExist) {
    return next(new ErrorResponse("Email is taken", 400));
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
});

// signin
// signin /api/v1/auth/signin
// public
exports.signin = asyncHandler(async(req, res, next) => {
  let { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorResponse("Email and Password is required!", 400));
  }
  let user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorResponse("Invalid Credentials", 401));
  }
  let isMatched = await user.comparePassword(password);
  if (!isMatched) {
    return next(new ErrorResponse("Invalid Credentials", 400));
  }
  sendTokenResponse(user, 200, res);
});


// forgot password
// forgotPassword /api/v1/auth/forgotpassword
// public
exports.forgotPassword = asyncHandler(async(req, res, next) => {
    let { email } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
          return next(new ErrorResponse("User with that email does not exist", 404));
    }
    // get reset token
    const resetToken = user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false });

    //create reset URL
    const Url = `${req.protocol}://${req.get(
      "host"
    )}/reset-password/${resetToken}`;

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
});

// resetPassword
// resetPassword /api/v1/auth/resetpassword/:token
// public
exports.resetPassword = asyncHandler(async(req, res) => {
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
          return next(new ErrorResponse("Invalid or expired token", 400));
    }
    //set new password
    user.password = req.body.password;
    user.resetPasswordExpire = undefined;
    user.resetPasswordToken = undefined;
    await user.save();
    sendTokenResponse(user, 200, res);
});


// verifyUser
// verifyUser /api/v1/auth/verify
// public
exports.verifyUser = asyncHandler(async (req, res) => {
    let { code } = req.body;

    if (!code) {
    return next(new ErrorResponse("Please enter your OTP", 400));
    }

    let emailToken = crypto.createHash("sha256").update(code).digest("hex");
    const user = await User.findOne({
      emailToken,
    });
    const currentTime = new Date();
    let codeTime = new Date(user.emailTokenExpires);
    const elapsedTime = currentTime - codeTime;
    const fifteenMinutesInMillis = 15 * 60 * 1000;

    if (!user) {
          return next(new ErrorResponse("Invalid Credentials", 400));

    } else if (elapsedTime > fifteenMinutesInMillis) {
    return next(new ErrorResponse("Verification token is expires..Please visit http://verify.com", 400));
    } else {
      if (user.active) {
    return next(new ErrorResponse("Account already activated", 400));
      }
    }

    let timeDiff = Date.now() - user.emailTokenExpires;
    const durationMinutes = 15 * 60 * 1000;
    if (timeDiff >= durationMinutes) {
          return next(new ErrorResponse("Verification code is expired. Please resend", 400))
    }

    if (user.active) {
          return next(new ErrorResponse("Account already activated", 400));
    }
    user.emailToken = undefined;
    user.emailTokenExpires = undefined;
    user.active = true;
    await user.save({ validateBeforeSave: false });
        return next(new ErrorResponse("Account Activated", 400));
});

// updatePassword
// updatePassword /api/v1/auth/forgotpassword
// private
exports.updatePassword = asyncHandler(async(req, res) => {
    let { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
          return next(new ErrorResponse("Input is required!", 400))
    }
    let user = await User.findById(req.user.id).select("+password");

    let isMatched = await user.comparePassword(req.body.currentPassword);
    if (!isMatched) {
          return next(new ErrorResponse("Current password is incorrect", 400))
    }
    user.password = req.body.newPassword;
    await user.save();
    sendTokenResponse(user, 200, res);
});

// resendVerifyCode
// resendVerifyCode /api/v1/auth/resend-verification
// public
exports.resendVerifyCode = asyncHandler(async(req, res) => {
  const code = Math.floor(1000 + Math.random() * 9000).toString();
  const emailToken = crypto.createHash("sha256").update(code).digest("hex");
  const emailTokenExpires = Date.now() + 15 * 60 * 1000;
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (user.active === true) {
    return next(new ErrorResponse("Email is already verified", 400));
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
    return next(new ErrorResponse("Verication code sent to your email successfully", 200));
})

// logout
// forgotPassword /api/v1/auth/logout
// private
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
      user: {
        username: user.username,
        email: user.email,
        role: user.role,
        photo: user.photo,
        active: user.active,
      },
    });
};
