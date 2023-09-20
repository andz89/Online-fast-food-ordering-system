import express from "express";
import {
  addFood,
  getFoods,
  removeFood,
} from "../controllers/foodsController.js";
import { protect } from "../middleware/authMiddleware.js";
import multer from "multer";
import path from "path";
import { getString } from "../middleware/randomString.js";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "backend/public/images");
  },
  filename: (req, file, cb) => {
    cb(null, getString() + "-" + uuidv4() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });
router.post(
  "/addFood",
  protect,
  upload.fields([
    {
      name: "image_one",
      maxCount: 1,
    },
    {
      name: "image_two",
      maxCount: 1,
    },
  ]),
  addFood
);
// router.put("/addComment", protect, addComment);
router.put("/removeFood", protect, removeFood);
// router.put("/removeComment", protect, removeComment);
// router.put("/editPost", protect, editPost);

router.route("/").get(protect, getFoods);
// router.route("/publicPosts").get(protect, getPublicPosts);

export default router;
