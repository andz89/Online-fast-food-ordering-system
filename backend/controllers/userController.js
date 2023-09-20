import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

import {
  generateRefreshToken,
  generateAccessToken,
} from "../utils/generateToken.js";

// @desc    Auth user & get token
// @route   POST /api/users/auth
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    const data = {
      name: user.name,
      email: user.email,
      roles: user.roles,
      userId: user._id,
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
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const roles = ["user"];
  const user = await User.create({
    name,
    email,
    password,
    roles,
  });

  if (user) {
    generateRefreshToken(res, user);
    const roles = user.roles;
    const data = {
      name: user.name,
      email: user.email,
      roles: user.roles,
    };
    const accessToken = generateAccessToken(res, user.name, roles);

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
  const user = await User.findById(req.user._id);

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
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    const updatedUser = await user.save();

    res.json({
      userId: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      roles: updatedUser.roles,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});
// const updateUserProfile = asyncHandler(async (req, res) => {
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
  const user = await User.findById(req.user._id);

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
  updateUserProfile,
  updateUserPassword,
};
