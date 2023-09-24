import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import Seller from "../models/sellerModel.js";

const protect = asyncHandler(async (req, res, next) => {
  let token;

  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      if (decoded.userId.roles[0] === "user") {
        req.user = await User.findById(decoded.userId._id).select("-password");
      }
      if (decoded.userId.roles[0] === "seller") {
        req.user = await Seller.findById(decoded.userId._id).select(
          "-password"
        );
      }

      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

export { protect };
