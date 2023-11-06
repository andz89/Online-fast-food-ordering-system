import express from "express";
import {
  setNewOrder,
  getOrders,
  editOrder,
} from "../controllers/ordersController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/setNewORder", protect, setNewOrder);

router.put("/editOrder", protect, editOrder);

router.route("/").get(protect, getOrders);

export default router;
