const express = require("express");
const {
	signup,
	signin,
	getUsers,
	logout,
	// getMe,
	// forgotPassword,
	// resetPassword,
	// updateDetails,
	updatePassword,
	deleteUser,
	verifyUser,
} = require("../controllers/auth");
const { protect, authorize } = require("../middleware/auth");

const router = express.Router();

router.post("/auth/signup", signup);
router.post("/auth/signin", signin);
router.post("/auth/logout", logout);
router.patch("/auth/verify", protect, verifyUser);
// router.delete("/auth/logout", protect, authorize("admin"), deleteUser);
// router.get("/auth/profile", protect, getMe);
// router.get("/auth/users", protect, authorize("admin"), getUsers);
// router.post("/auth/forgotpassword", forgotPassword);
// router.put("/auth/updatedetails", protect, updateDetails);
router.put("/auth/updatepassword", protect, updatePassword);
// router.put("/resetpassword/:resettoken", resetPassword);

module.exports = router;
