import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import Organizer from "../models/adminModel.js";

import jwt from "jsonwebtoken";
import { generateAccessToken } from "../utils/generateToken.js";

const handleRefreshToken = asyncHandler(async (req, res) => {
  let token;

  token = req.cookies.jwt;
  console.log("from token");
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      let user;
      if (decoded.userId.roles[0] === "user") {
        user = await User.findById(decoded.userId).select("-password");
      } else if (decoded.userId.roles) {
        user = await Organizer.findById(decoded.userId).select("-password");
      } else {
        res.status(401);
        throw new Error("Not authorized, token failed");
      }
      const data = {
        name: user.name,
        email: user.email,
        number: user.number,
        agency: user.agency,
        roles: user.roles,
        userId: user._id,
      };

      // create JWTs
      const accessToken = generateAccessToken(res, user.name, user.roles);

      res.json({ data, accessToken });
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  } else {
    const data = null;
    const accessToken = null;
    res.json({ data, accessToken });

    // res.status(401);
    // throw new Error("Not authorized, no token");
  }
});

export { handleRefreshToken };
