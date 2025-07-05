// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./taskSlice";
import listReducer from "./listSlice";
import { saveToLocalStorage } from "./LocalStorage";
import appstateReducer from "./appStateSlice";

// Create store with preloadedState
export const store = configureStore({
  reducer: {
    task: taskReducer,
    list: listReducer,
    appState: appstateReducer,
  },
  // preloadedState: loadFromLocalStorage(),
});

// Persist to localStorage on state change
store.subscribe(() => saveToLocalStorage(store.getState()));
