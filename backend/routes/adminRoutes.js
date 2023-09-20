import express from "express";
import {
  authUser,
  logoutUser,
  // getUserProfile,
  updateUserProfile,
  updateUserPassword,
} from "../controllers/adminController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/auth", authUser);
router.post("/logout", logoutUser);

router
  .route("/profile")
  // .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router
  .route("/updatePassword")

  .put(protect, updateUserPassword);
export default router;
