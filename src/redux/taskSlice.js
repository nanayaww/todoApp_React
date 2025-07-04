// taskSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { loadFromLocalStorage } from "./LocalStorage";

// Load the persisted task state or fallback to an empty array
const savedState = loadFromLocalStorage();
const initialState = savedState?.task || [];

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    add: (state, action) => {
      state.push(action.payload);
    },
    setTasks: (state, action) => {
      return action.payload;
    },
    updateTask: (state, action) => {
      const index = state.findIndex((task) => task.id === action.payload.id);

      if (index !== -1) {
        state[index] = { ...state[index], ...action.payload };
      }
    },
    removeTask: (state, action) => {
      return state.filter((task) => task.id !== action.payload);
    },
  },
});

export const Alltask = (state) => state.task;

// Actions
export const { add, setTasks, updateTask, removeTask } = taskSlice.actions;

// Reducer
export default taskSlice.reducer;
