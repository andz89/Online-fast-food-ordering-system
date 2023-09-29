//local mutation
import { createSlice } from "@reduxjs/toolkit";
import { sub } from "date-fns";
const initialState = {
  sellers: [],
};

const sellersSlice = createSlice({
  name: "sellers",
  initialState,
  reducers: {
    sellersFetched: (state, action) => {
      // Update the state with the posts received from the server
      state.sellers = action.payload;
    },
  },
});

export const { sellersFetched } = sellersSlice.actions;

export default sellersSlice.reducer;
