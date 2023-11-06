import express from "express";
import {
  addFoodToCart,
  getFoodsFromCart,
  removeFoodToCart,
} from "../controllers/cartsController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/addFoodToCart",
  protect,

  addFoodToCart
);

router.put("/removeFoodFromCart", protect, removeFoodToCart);

router.route("/").get(protect, getFoodsFromCart);

export default router;
