import { createSlice } from "@reduxjs/toolkit";

export const main = createSlice({
  getMe:{},
  reducers: {
    setMe: (state, action) => {
      state.getMe = action.payload;
    },
  },
});
