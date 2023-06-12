import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogin: JSON.parse(localStorage.getItem("isLogin")) || false,
  authInfo: JSON.parse(localStorage.getItem("authInfo")) || null,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setLogIn: (state, action) => {
      state.isLogin = action.payload;
      localStorage.setItem("isLogin", JSON.stringify(action.payload));
    },
    setAuthInfo: (state, action) => {
      state.authInfo = action.payload;
      localStorage.setItem("authInfo", JSON.stringify(action.payload));
    },
  },
});

export const { setLogIn, setAuthInfo } = chatSlice.actions;

export default chatSlice.reducer;
