import { createSlice } from "@reduxjs/toolkit";
const initialState = ["welcome"];

const listSlice = createSlice({
  name: "create",
  initialState,
  reducers: {
    create: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const Lists = (state) => state.list;

export const { create } = listSlice.actions;
export default listSlice.reducer;
