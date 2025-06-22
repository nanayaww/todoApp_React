// useAddTasks.js
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { db } from "../firebase/fireBaseConfig";
import { add, setTasks } from "../redux/taskSlice";

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

  // Separate function to load all tasks for a user
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

      // Set all tasks at once instead of adding them one by one
      dispatch(setTasks(tasks));

      console.log("Loaded tasks:", tasks);
    } catch (error) {
      console.error("Error loading tasks:", error);
    }
  };

  return { createTask, loadUserTasks };
}
