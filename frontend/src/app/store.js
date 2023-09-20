import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authUser/authSlice";

import { apiSlice } from "../features/api/apiSlice";

import foodsReducer from "../features/foods/foodsSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    foods: foodsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
