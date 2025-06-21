import { createSlice } from "@reduxjs/toolkit";

const inputSlice = createSlice({
  name: "input",
  initialState: { value: "" },
  reducers: {
    inputValue: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { inputValue } = inputSlice.actions;
export default inputSlice.reducer;
