import { createSlice } from "@reduxjs/toolkit";

// local mutation

const initialState = {
  userInfo: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      // localStorage.setItem("UserInfo", JSON.stringify(action.payload));
    },
    logout: (state, action) => {
      state.userInfo = null;
      // localStorage.removeItem("UserInfo");
    },
  },
});
export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
