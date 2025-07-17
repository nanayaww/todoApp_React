import { createSlice } from "@reduxjs/toolkit";
import { loadFromLocalStorage } from "./LocalStorage";

const color = window.matchMedia("(prefers-color-scheme: dark)").matches;

const currentAppMode = loadFromLocalStorage();
const initialState = currentAppMode?.appState || { Theme: color };

const appStateSlice = createSlice({
  name: "appState",
  initialState,
  reducers: {
    setMode: (state, action) => {
      state.Theme = action.payload;
    },
  },
});

export const appState = (state) => state.appState;

export const { setMode } = appStateSlice.actions;
export default appStateSlice.reducer;
