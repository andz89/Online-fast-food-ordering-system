import express from "express";
import { setNewReview, getReviews } from "../controllers/reviewController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();
router.post("/setNewReview", protect, setNewReview);
router.get("/", protect, getReviews);

export default router;
