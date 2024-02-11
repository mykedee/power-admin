const express = require("express");
const {
	getUser,
	getUsers,
	deleteUser,
	updateUser,
	createUser,
	getMe,
	updateUserDetails,
	updateProfileImage,
} = require("../controllers/users");
const { protect, authorize } = require("../middleware/auth");
const upload = require("../middleware/upload");

const router = express.Router();

router.get("/auth/users", protect, authorize("admin"), getUsers);
router.get("/auth/users/:id", protect, authorize("admin"), getUser);
router.post("/auth/users", protect, authorize("admin"), createUser);
router.delete("/auth/users/:id", protect, authorize("admin"), deleteUser);
router.put("/auth/users/:id", protect, authorize("admin", "user "), updateUser);
router.put(
	"/auth/updatephoto",
	protect,
	upload.single("photo"),
	updateProfileImage
);
router.put("/auth/updatedetails", protect, updateUserDetails);
router.get("/auth/me", protect, getMe);

module.exports = router;
