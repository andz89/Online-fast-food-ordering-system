import express from "express";
import { handleRefreshToken } from "../controllers/tokenController.js";

const router = express.Router();

router.get("/refresh", handleRefreshToken);

export default router;
