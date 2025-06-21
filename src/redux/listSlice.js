import { createSlice } from "@reduxjs/toolkit";

const listSlice = createSlice({
  name: "create",
  initialState: { list: ["welcome"] },
  reducers: {
    create: (state, action) => {
      state.list.push(action.payload);
    },
  },
});

export const { create } = listSlice.actions;
export default listSlice.reducer;
