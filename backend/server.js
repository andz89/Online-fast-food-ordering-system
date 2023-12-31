import path from "path";
import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import userRoutes from "./routes/userRoutes.js";
import sellerRoutes from "./routes/sellerRoutes.js";
import cartsRoutes from "./routes/cartsRoutes.js";
import ordersRoutes from "./routes/ordersRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import tokenRoutes from "./routes/tokenRoutes.js";
import foodsRoutes from "./routes/foodsRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";

const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use("/api/users", userRoutes);
app.use("/api/seller", sellerRoutes);
app.use("/api/carts", cartsRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/token", tokenRoutes);
app.use("/api/foods", foodsRoutes);
app.use("/api/orders", ordersRoutes);
app.use("/api/reviews", reviewRoutes);
app.use(express.static("backend/public/images"));
if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
