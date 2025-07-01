// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./taskSlice";
import listReducer from "./listSlice";
import { saveToLocalStorage } from "./LocalStorage";

// Create store with preloadedState
export const store = configureStore({
  reducer: {
    task: taskReducer,
    list: listReducer,
  },
  // preloadedState: loadFromLocalStorage(),
});

// Persist to localStorage on state change
store.subscribe(() => saveToLocalStorage(store.getState()));
