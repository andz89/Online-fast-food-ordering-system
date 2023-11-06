//local mutation
import { createSlice } from "@reduxjs/toolkit";
import { sub } from "date-fns";
const initialState = {
  carts: [],
};

const cartsSlice = createSlice({
  name: "carts",
  initialState,
  reducers: {
    cartAdded: {
      reducer(state, action) {
        state.carts.push(action.payload);
      },
      prepare({
        food_name,
        price,
        description,
        createdAt,
        updatedAt,
        _id,
        image_one,
      }) {
        return {
          payload: {
            image_one,
            food_name,
            price,
            description,
            createdAt,
            updatedAt,
            _id,
          },
        };
      },
    },
    cartsFetched: (state, action) => {
      // Update the state with the posts received from the server
      state.carts = action.payload;
    },

    removeCart: (state, action) => {
      const { cartId } = action.payload;
      const carts = state.carts.filter((cart) => cart._id !== cartId);

      if (carts) {
        state.carts = carts;
      }
    },
  },
});

export const { cartAdded, cartsFetched, removeCart } = cartsSlice.actions;

export default cartsSlice.reducer;
