//backend mutation
import { apiSlice } from "../api/apiSlice";

const SELLER = "/api/seller";
export const foodsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSellers: builder.mutation({
      //get organizer FOOD
      query: () => ({
        url: `${SELLER}/sellers`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetSellersMutation } = foodsApiSlice;
