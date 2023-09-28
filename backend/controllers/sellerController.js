import asyncHandler from "express-async-handler";
import Seller from "../models/sellerModel.js";
import { deleteImage } from "../helper/deleteImage.js";
import {
  generateRefreshToken,
  generateAccessToken,
} from "../utils/generateToken.js";

// @desc    Auth user & get token
// @route   POST /api/users/auth
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  console.log(email);
  const user = await Seller.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    const data = {
      name: user.name,
      email: user.email,
      roles: user.roles,
      userId: user._id,
      number: user.number,
      storeName: user.storeName,
    };
    // create JWTs
    const accessToken = generateAccessToken(res, user.name, user.roles);
    generateRefreshToken(res, user);

    res.json({ data, accessToken });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, storeName, number, description, address } =
    req.body;

  const sellerExists = await Seller.findOne({ email });

  if (sellerExists) {
    res.status(400);
    throw new Error("seller already exists");
  }

  const roles = ["seller"];
  const seller = await Seller.create({
    name,
    email,
    password,
    roles,
    storeName,
    number,
    description,
    address,
  });

  if (seller) {
    generateRefreshToken(res, seller);
    const roles = seller.roles;
    const data = {
      name: seller.name,
      email: seller.email,
      roles: seller.roles,
      number: seller.number,
      storeName: seller.storeName,
      description: seller.description,
      address: seller.address,
    };
    const accessToken = generateAccessToken(res, seller.name, roles);

    res.status(201).json({
      data,
      accessToken,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc    Logout user / clear cookie
// @route   POST /api/users/logout
// @access  Public
const logoutUser = (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out successfully" });
};

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await Seller.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateSellerProfile = asyncHandler(async (req, res) => {
  const user = await Seller.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.storeName = req.body.storeName;
    user.number = req.body.number;
    user.description = req.body.description;
    user.address = req.body.address;

    const updatedUser = await user.save();

    res.json(updatedUser);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});
const updateImageBg = asyncHandler(async (req, res) => {
  const user = await Seller.findById(req.user._id);

  if (user) {
    req.files.imageBg.forEach(async (e) => {
      let arrayImgs = [user.imageBg];

      user.imageBg && (await deleteImage(arrayImgs));
      user.imageBg = e.filename;
    });

    const bgName = await user.save();

    res.json(bgName);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});
// const updateSellerProfile = asyncHandler(async (req, res) => {
//   const user = await User.findById(req.user._id);

//   if (user) {
//     user.name = req.body.name || user.name;
//     user.email = req.body.email || user.email;

//     if (
//       req.body.currentPassword &&
//       (await user.matchPassword(req.body.currentPassword))
//     ) {
//       user.password = req.body.newPassword;
//       const updatedUser = await user.save();

//       res.json({
//         _id: updatedUser._id,
//         name: updatedUser.name,
//         email: updatedUser.email,
//         roles: updatedUser.roles,
//       });
//     } else {
//       res.status(404);
//       throw new Error("Wrong current password");
//     }
//   } else {
//     res.status(404);
//     throw new Error("User not found");
//   }
// });
const updateUserPassword = asyncHandler(async (req, res) => {
  const user = await Seller.findById(req.user._id);

  if (user) {
    if (
      req.body.currentPassword &&
      (await user.matchPassword(req.body.currentPassword))
    ) {
      user.password = req.body.newPassword;
      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        roles: updatedUser.roles,
      });
    } else {
      res.status(404);
      throw new Error("Wrong current password");
    }
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateSellerProfile,
  updateUserPassword,
  updateImageBg,
};
