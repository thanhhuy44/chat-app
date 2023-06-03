import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userName: "",
  isLogin: process.browser ? localStorage.getItem("isLogin") : false,
};

const chatSlice = createSlice({
  name: "chatApp",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.isLogin = action.payload;
      localStorage.setItem("isLogin", JSON.stringify(action.payload));
    },
  },
});

export const { setLogin } = chatSlice.actions;

export default chatSlice.reducer;
