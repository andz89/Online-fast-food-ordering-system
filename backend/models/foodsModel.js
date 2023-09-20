import mongoose from "mongoose";

const foodsSchema = mongoose.Schema(
  {
    food_name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image_one: {
      type: String,
      required: true,
    },
    image_two: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Foods = mongoose.model("Foods", foodsSchema);

export default Foods;
