import asyncHandler from "express-async-handler";
import dotenv from "dotenv";
dotenv.config();
import Reviews from "../models/reviewModel.js";
import Order from "../models/ordersModel.js";

const setNewReview = asyncHandler(async (req, res) => {
  const { data } = req.body;
  let _id = data.orderId;

  const order = await Order.findOne({ _id });
  console.log(_id);

  data.userName = req.user.name;
  data.userEmail = req.user.email;
  data.createAt = order.createdAt;

  const newReview = new Reviews({
    details: data,
  });

  await newReview.save();

  res.json({ newReview });
});

const getReviews = asyncHandler(async (req, res) => {
  const reviews = await Reviews.find();

  try {
    res.json(reviews);
  } catch (error) {
    res.status(404);
    throw new Error("foods not found");
  }
});
export { setNewReview, getReviews };
