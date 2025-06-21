// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./taskSlice";
import listReducer from "./listSlice";

export const store = configureStore({
  reducer: {
    add: taskReducer,
    create: listReducer,
  },
});
