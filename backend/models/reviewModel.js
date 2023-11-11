import mongoose from "mongoose";

const reviewSchema = mongoose.Schema(
  {
    details: {
      type: Object,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Reviews = mongoose.model("Reviews", reviewSchema);

export default Reviews;
