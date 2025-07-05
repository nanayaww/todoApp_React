import { useSelector } from "react-redux";
import { Alltask } from "../redux/taskSlice";
import { FaCheck } from "react-icons/fa";
import { RiEdit2Fill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import { useContext, useEffect } from "react";
import {
  isEditingContext,
  isEditingDataContext,
  TaskBarIsOpenContext,
} from "../pages/Dashboard";
import { useAddTasks } from "../hooks/useAddTasks";
import { CurrentTaskContext } from "./Container";

export default function Options({ mousePosition, setIsOpen, id }) {
  const tasks = useSelector(Alltask);
  // const { currentTasks, setCurrentTask } = useContext(CurrentTaskContext);
  const { setIsEditing } = useContext(isEditingContext);
  const { setIsEditingData } = useContext(isEditingDataContext);
  const { toggleTaskStatus, deleteTask } = useAddTasks();

  // Sync currentTasks with tasks from Redux when tasks change
  // useEffect(() => {
  //   setCurrentTask(tasks);
  // }, [tasks, setCurrentTask]);

  // function allTasks() {
  //   setCurrentTask(tasks);
  // }

  // function filterPendingTasks() {
  //   // Filter for tasks with status === true (pending)
  //   setCurrentTask(tasks.filter((task) => task.status === false));
  // }

  // function filterCompletedTasks() {
  //   // Filter for tasks with status === false (completed)
  //   setCurrentTask(tasks.filter((task) => task.status === true));
  // }

  // Function to handle whether a task has been completed or not.
  function handlecheck() {
    const task = tasks.filter((task) => task.id === id);
    if (task) {
      console.log(task[0].status);

      toggleTaskStatus(id, task[0].status);
      // setCurrentTask(currentTasks);
      // filterPendingTasks();
      // filterCompletedTasks();
      // allTasks();
    }

    console.log(task);
    setIsOpen(false);
  }

  function handleEdit() {
    const task = tasks.filter((task) => task.id === id);
    const { title, note, definedCategory, status } = task[0];
    setIsEditingData({ title, note, definedCategory, id, status });
    setIsEditing(true);
  }

  function handleDelete() {
    deleteTask(id);
    setIsOpen(false);
  }

  const optionStyle =
    " flex items-center gap-2 hover:bg-black-900 rounded-sm px-2 cursor-pointer";

  return (
    <div
      className={` flex absolute z-50 right-10 flex-col gap-2 px-2.5 py-5 bg-black text-white rounded-2xl animate-fade animate-delay-none`}
    >
      <div
        className={optionStyle}
        style={{
          top: `${mousePosition.y + 5}px`,
          left: `${mousePosition.x + 5}px`,
        }}
        onClick={handlecheck}
      >
        <FaCheck />
        <span>Check</span>
      </div>
      <div className={optionStyle} onClick={handleEdit}>
        <RiEdit2Fill /> <span>Edit</span>
      </div>
      <div className={optionStyle} onClick={() => handleDelete()}>
        <MdDelete /> <span>Delete</span>
      </div>
    </div>
  );
}
