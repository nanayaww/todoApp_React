// useAddTasks.js
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { useDispatch } from "react-redux";
import { db } from "../firebase/fireBaseConfig";
import { add, removeTask, setTasks, updateTask } from "../redux/taskSlice";

export function useAddTasks() {
  const dispatch = useDispatch();

  const createTask = async (userId, taskData) => {
    try {
      const taskRef = collection(db, "taskData");

      // Add the new task to Firestore
      const docRef = await addDoc(taskRef, {
        ...taskData,
        userId: userId,
        status: false,
      });

      // Add the new task to Redux store with the generated ID
      dispatch(
        add({
          id: docRef.id,
          ...taskData,
          userId: userId,
          status: false,
        })
      );

      console.log("Task created successfully with ID:", docRef.id);
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  // load user task from firestore
  const loadUserTasks = async (userId) => {
    try {
      console.log(userId);

      const taskRef = collection(db, "taskData");
      const q = query(taskRef, where("userId", "==", userId));
      const querySnapshot = await getDocs(q);

      const tasks = [];
      querySnapshot.forEach((doc) => {
        tasks.push({ id: doc.id, ...doc.data() });
      });

      // Set all tasks to redux store

      dispatch(setTasks(tasks));

      console.log("Loaded tasks:", tasks);
    } catch (error) {
      console.error("Error loading tasks:", error);
    }
  };
  // function to update a task
  const updateUserTask = async (taskId, updatedData) => {
    try {
      const taskDocRef = doc(db, "taskData", taskId);

      // Update the task in Firestore
      await updateDoc(taskDocRef, updatedData);

      const { title, note, definedCategory, status } = updatedData;

      // Update the task in Redux store
      dispatch(
        updateTask({
          id: taskId,
          title,
          note,
          definedCategory,
          status,
        })
      );

      console.log("Task updated successfully:", taskId);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  // function to toggle task status (complete/incomplete)
  const toggleTaskStatus = async (taskId, currentStatus) => {
    try {
      const taskDocRef = doc(db, "taskData", taskId);

      console.log(currentStatus);

      const newStatus = !currentStatus;

      // Update status in Firestore
      await updateDoc(taskDocRef, { status: newStatus });

      // Update status in Redux store
      dispatch(
        updateTask({
          id: taskId,
          status: newStatus,
        })
      );

      console.log("Task status toggled:", taskId, "New status:", newStatus);
    } catch (error) {
      console.error("Error toggling task status:", error);
    }
  };

  // function to delete a task
  const deleteTask = async (taskId) => {
    try {
      const taskDocRef = doc(db, "taskData", taskId);

      // Delete from Firestore
      await deleteDoc(taskDocRef);

      // Remove from Redux store
      dispatch(removeTask(taskId));

      console.log("Task deleted successfully:", taskId);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };
  return {
    createTask,
    loadUserTasks,
    updateUserTask,
    deleteTask,
    toggleTaskStatus,
  };
}
