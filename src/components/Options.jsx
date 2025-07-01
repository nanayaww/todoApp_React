import { useSelector } from "react-redux";
import { Alltask } from "../redux/taskSlice";
import { FaCheck } from "react-icons/fa";
import { RiEdit2Fill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import { useContext } from "react";
import {
  isEditingContext,
  isEditingDataContext,
  TaskBarIsOpenContext,
} from "../pages/Dashboard";
import { useAddTasks } from "../hooks/useAddTasks";

export default function Options({ setIsOpen, id }) {
  const tasks = useSelector(Alltask);
  const { setIsEditing } = useContext(isEditingContext);
  const { setIsEditingData } = useContext(isEditingDataContext);
  const { toggleTaskStatus, deleteTask } = useAddTasks();

  function handlecheck() {
    const task = tasks.filter((task) => task.id === id);
    if (task) {
      console.log(task[0].status);

      toggleTaskStatus(id, task[0].status);
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
  }
  const optionStyle =
    " flex items-center gap-2 hover:bg-black-900 rounded-sm px-2 cursor-pointer";

  return (
    <div
      className={` flex absolute z-50 top-5 right-10 flex-col gap-2 px-2.5 py-5 bg-black text-white rounded-2xl cur`}
    >
      <div className={optionStyle} onClick={handlecheck}>
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
