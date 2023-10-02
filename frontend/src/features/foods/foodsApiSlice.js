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
    EditFood: builder.mutation({
      query: (data) => ({
        url: `${FOOD_URL}/EditFood`,
        method: "PUT",
        body: data,
      }),
    }),
    getFoods: builder.mutation({
      //get organizer FOOD
      query: () => ({
        url: `${FOOD_URL}`,
        method: "GET",
      }),
    }),
    getFoodAsUser: builder.mutation({
      //get organizer FOOD
      query: (data) => ({
        url: `${FOOD_URL}/menus`,
        method: "POST",
        body: data,
      }),
    }),

    deleteFood: builder.mutation({
      query: (data) => ({
        url: `${FOOD_URL}/removeFood`,
        method: "PUT",
        body: data,
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
  useEditFoodMutation,
  useGetFoodsMutation,

  useDeleteFoodMutation,
  useGetFoodAsUserMutation,

  useUploadImageMutation,
} = foodsApiSlice;
