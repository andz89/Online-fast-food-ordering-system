//backend mutation
import { apiSlice } from "../api/apiSlice";
const REVIEW_URL = "/api/reviews";

export const reviewsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    setNewReview: builder.mutation({
      query: (data) => ({
        url: `${REVIEW_URL}/setNewReview`,
        method: "POST",
        body: data, // Ensure data is properly included in the request body
      }),
    }),

    getReviews: builder.mutation({
      //get organizer FOOD
      query: () => ({
        url: `${REVIEW_URL}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useSetNewReviewMutation, useGetReviewsMutation } =
  reviewsApiSlice;
