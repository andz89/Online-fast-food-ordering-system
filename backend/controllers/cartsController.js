import asyncHandler from "express-async-handler";
import dotenv from "dotenv";
dotenv.config();
import Cart from "../models/cartsModel.js";
import { deleteImage } from "../helper/deleteImage.js";
// @desc    add Post
// @route   POST /api/users/addpost
// @access  Private

const addFoodToCart = asyncHandler(async (req, res) => {
  const { food_id } = req.body;

  const item = await Cart.findOne({ food_id });
  console.log(req.body);
  if (item) {
    throw new Error("Item is already added to cart");
  }
  if (!req.body.food_name || !req.body.price || !req.body.description) {
    res.status(400);
    throw new Error("something went wrong");
  }

  const foodCart = await Cart.create({
    buyerId: req.body.buyerId,
    food_name: req.body.food_name,
    price: req.body.price,
    description: req.body.description,
    image_one: req.body.image_one,
    food_id: req.body.food_id,
    seller_id: req.body.seller_id,
    sellerInfo: req.body.sellerInfo,
    quantity: req.body.quantity,
    orig_price: req.body.orig_price,
  });
  // foodCart.image_one = process.env.DOMAIN + foodCart.image_one;

  res.json({ foodCart });
});
// @desc    Get organizer posts
// @route   GET /api/posts
// @access  Private
const getFoodsFromCart = asyncHandler(async (req, res) => {
  const carts = await Cart.find();

  if (carts) {
    let userId = req.user._id.toString();
    let userCart = carts.filter((food) => {
      return food.buyerId === userId;
    });

    res.json(userCart);
  } else {
    res.status(404);
    throw new Error("foods not found");
  }
});

const removeFoodToCart = asyncHandler(async (req, res) => {
  const foodId = req.body.cartId;

  try {
    // Use async/await with findByIdAndRemove to ensure proper handling of asynchronous code.
    const removedCart = await Cart.findByIdAndRemove(foodId);
    console.log(removedCart);
    // Check if the Cart was found   and removed successfully.
    if (!removedCart) {
      return res.status(404).json({ message: "cart not found" });
    }

    res.json({ message: "item removed successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export { addFoodToCart, getFoodsFromCart, removeFoodToCart };
