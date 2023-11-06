import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authUser/authSlice";

import { apiSlice } from "../features/api/apiSlice";

import foodsReducer from "../features/foods/foodsSlice";
import sellersReducer from "../features/seller/sellersSlice";
import cartsReducer from "../features/carts/cartsSlice";
import ordersReducer from "../features/orders/ordersSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    foods: foodsReducer,
    sellers: sellersReducer,
    orders: ordersReducer,
    carts: cartsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
