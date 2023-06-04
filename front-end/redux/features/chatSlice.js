import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currUser: process.browser
    ? localStorage.getItem("currUser")
      ? JSON.parse(localStorage.getItem("currUser"))
      : null
    : null,
  isLogin: process.browser
    ? localStorage.getItem("isLogin")
      ? JSON.parse(localStorage.getItem("isLogin"))
      : false
    : false,
};

const chatSlice = createSlice({
  name: "chatApp",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.isLogin = action.payload;
      localStorage.setItem("isLogin", JSON.stringify(action.payload));
    },
    setCurrUser: (state, action) => {
      state.userName = action.payload;
      localStorage.setItem("currUser", JSON.stringify(action.payload));
    },
  },
});

export const { setLogin, setCurrUser } = chatSlice.actions;

export default chatSlice.reducer;
