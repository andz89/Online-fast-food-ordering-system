//backend mutation
import { apiSlice } from "../api/apiSlice";
const FOOD_URL = "/api/foods";

export const foodsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addFood: builder.mutation({
      query: (data) => ({
        url: `${FOOD_URL}/addfood`,
        method: "POST",
        body: data, // Ensure data is properly included in the request body
      }),
    }),
    getFoods: builder.mutation({
      //get organizer FOOD
      query: () => ({
        url: `${FOOD_URL}`,
        method: "GET",
      }),
    }),

    getFood: builder.mutation({
      query: () => ({
        url: `${FOOD_URL}`,
        method: "GET",
      }),
    }),

    deleteFood: builder.mutation({
      query: (data) => ({
        url: `${FOOD_URL}/removeFood`,
        method: "PUT",
        body: data,
      }),
    }),
    EditFood: builder.mutation({
      query: (data) => ({
        url: `${FOOD_URL}/EditFood`,
        method: "PUT",
        body: { ...data },
      }),
    }),
    uploadImage: builder.mutation({
      query: (formData) => ({
        url: `${FOOD_URL}/upload-image`, // The endpoint for image upload
        method: "POST",
        body: formData,
      }),
    }),
  }),
});

export const {
  useAddFoodMutation,
  useGetFoodsMutation,

  useDeleteFoodMutation,

  useEditFoodMutation,
  useUploadImageMutation,
} = foodsApiSlice;
