// taskSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    add: (state, action) => {
      state.push(action.payload);
    },
    // Added additional reducers for better task management
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

// Fixed: Export selector function
export const Alltask = (state) => state.task;

// Export actions
export const { add, setTasks, updateTask, removeTask } = taskSlice.actions;

// Export reducer
export default taskSlice.reducer;
