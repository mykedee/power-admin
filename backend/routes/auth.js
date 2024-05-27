const express = require("express");
const {
  signup,
  signin,
  logout,
  updatePassword,
  verifyUser,
  resendVerifyCode,
  resetPassword,
  forgotPassword,
} = require("../controllers/auth");
const { protect } = require("../middleware/auth");

const router = express.Router();

router.post("/auth/signup", signup);
router.post("/auth/signin", signin);
router.post("/auth/logout", logout);
router.patch("/auth/verify", protect, verifyUser);
router.patch("/auth/resend-verification", protect, resendVerifyCode);
router.patch("/resetpassword/:resettoken", resetPassword);
router.post("/auth/forgotpassword", forgotPassword);

router.put("/auth/updatepassword", protect, updatePassword);

module.exports = router;
