//local mutation
import { createSlice } from "@reduxjs/toolkit";
import { sub } from "date-fns";
const initialState = {
  orders: [],
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    orderAdded: {
      reducer(state, action) {
        state.orders.push(action.payload);
      },
      prepare({ foods, _id, status }) {
        return {
          payload: {
            foods,
            status,
            _id,
          },
        };
      },
    },
    ordersFetched: (state, action) => {
      // Update the state with the posts received from the server
      state.orders = action.payload;
    },

    removeCart: (state, action) => {
      const { orderId } = action.payload;
      const orders = state.orders.filter((cart) => cart._id !== orderId);

      if (orders) {
        state.orders = orders;
      }
    },
  },
});

export const { orderAdded, ordersFetched, removeCart } = ordersSlice.actions;

export default ordersSlice.reducer;
