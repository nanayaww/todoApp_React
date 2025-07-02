import { createSlice } from "@reduxjs/toolkit";
import { loadFromLocalStorage } from "./LocalStorage";

const initialState = () => {
  if (loadFromLocalStorage() !== undefined) {
    return loadFromLocalStorage()?.list;
  } else {
    return [{ title: "welcome" }];
  }
};

const listSlice = createSlice({
  name: "create",
  initialState,
  reducers: {
    create: (state, action) => {
      console.log(action.payload);

      state.push(action.payload);
    },
  },
});

export const Lists = (state) => state.list;

export const { create } = listSlice.actions;
export default listSlice.reducer;
