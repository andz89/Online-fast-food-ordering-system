//backend mutation
import { apiSlice } from "../api/apiSlice";
const CART_URL = "/api/carts";

export const cartsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addFoodToCart: builder.mutation({
      query: (data) => ({
        url: `${CART_URL}/addFoodToCart`,
        method: "POST",
        body: data, // Ensure data is properly included in the request body
      }),
    }),

    getCart: builder.mutation({
      //get organizer FOOD
      query: () => ({
        url: `${CART_URL}`,
        method: "GET",
      }),
    }),

    deleteFoodFromCart: builder.mutation({
      query: (data) => ({
        url: `${CART_URL}/removeFoodFromCart`,
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const {
  useAddFoodToCartMutation,
  useGetCartMutation,
  useDeleteFoodFromCartMutation,
} = cartsApiSlice;
