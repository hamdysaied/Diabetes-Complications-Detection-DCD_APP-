import { createSlice } from "@reduxjs/toolkit";

const userData = JSON.parse(localStorage.getItem("user"));
const initialState = {
  user: userData ? userData : null,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("user");
      state.user = null;
    },
    login: (state, action) => {
      localStorage.setItem("user", JSON.stringify(action.payload));
      state.user = action.payload;
    },
  },
});

export const { logout, login } = authSlice.actions;
export default authSlice.reducer;
