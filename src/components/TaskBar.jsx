import { IoMdClose } from "react-icons/io";
import Button from "./Button";
import FormInput from "./FormInput";
import { useContext, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useAddTasks } from "../hooks/useAddTasks";
import { useAuth } from "../contexts/AuthContext";
import { Lists } from "../redux/listSlice";
import { useClickOutside } from "../hooks/useClickOutside";
import {
  IsEditingContext,
  IsEditingDataContext,
  TaskBarIsOpenContext,
} from "../contexts/AppContext";

export default function TaskBar() {
  const ref = useRef();
  const list = useSelector(Lists);
  const { createTask, updateUserTask } = useAddTasks();
  const { currentUser } = useAuth();
  const { openTaskBar, setOpenTaskBar } = useContext(TaskBarIsOpenContext);
  const { isEditing, setIsEditing } = useContext(IsEditingContext);
  const { isEditingData } = useContext(IsEditingDataContext);
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [taskItem, setTaskItem] = useState({
    title: "",
    note: "",
    definedCategory: "",
  });
  const { id } = isEditingData;

  useEffect(() => {
    if (isEditing) {
      setOpenTaskBar(true);
      setTaskItem(isEditingData);
      // setIsEditing(false);
    }
  }, [isEditing, isEditingData, setOpenTaskBar]);

  // function to handle click outside events
  useClickOutside(closeTaskBar, ref);

  function handleSetTask(e) {
    e.preventDefault();
    if (
      taskItem.definedCategory !== "" &&
      taskItem.note !== "" &&
      taskItem.title !== ""
    ) {
      if (isEditing) {
        setIsAddingTask(true);
        updateUserTask(id, taskItem);
        setIsEditing(false);
      } else {
        setIsAddingTask(true);
        createTask(currentUser.uid, taskItem);
      } // Clear after save
      setTaskItem({
        title: "",
        note: "",
        definedCategory: "",
      });
      setIsAddingTask(false);
      closeTaskBar();
    }
    return null;
  }

  function closeTaskBar() {
    setOpenTaskBar(false);
  }

  return (
    <div
      className={` ${
        openTaskBar
          ? "translate-x-[0%] animate-fade animate-ease-in-out "
          : "hidden"
      }  bg-light-secondary dark:bg-black-900 text-white p-4 rounded-l-2xl absolute right-0 z-50 flex-1 min-h-screen w-[30%] max-w-80 duration-100 animate-ease-in`}
      ref={ref}
    >
      <div className=" flex justify-between items-center ">
        <h2 className=" text-2xl">Task</h2>
        <span
          className=" hover:bg-white hover:text-black rounded-full p-1.5 "
          onClick={() => closeTaskBar()}
        >
          <IoMdClose size="1rem" />
        </span>
      </div>

      <form action="" onSubmit={(e) => handleSetTask(e)}>
        <div className=" flex justify-end ">
          <label htmlFor="category"></label>
          <select
            className=" border rounded-sm px-2.5 py-1.5 bg-white text-black"
            name="category"
            id="category"
            required
            onChange={(e) =>
              setTaskItem({ ...taskItem, definedCategory: e.target.value })
            }
          >
            <option value="">Select list Category</option>
            {list.map((item, index) => {
              return (
                <option key={index} value={item.title}>
                  {item.title}
                </option>
              );
            })}
          </select>
        </div>
        <FormInput
          value={taskItem.title}
          onChange={(e) => setTaskItem({ ...taskItem, title: e.target.value })}
          label="Title"
          type="text"
          placeholder="type here"
        />
        <textarea
          className="w-full min-h-40 border rounded-sm p-2 mt-10"
          name=""
          id=""
          placeholder="add note..."
          value={taskItem.note}
          onChange={(e) => setTaskItem({ ...taskItem, note: e.target.value })}
        />

        <div>
          <Button
            disable={isAddingTask}
            value={isEditing ? "Update" : "Add"}
            type="submit"
          />
        </div>
      </form>
    </div>
  );
}
