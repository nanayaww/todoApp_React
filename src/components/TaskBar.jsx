import { IoMdClose } from "react-icons/io";
import Button from "./Button";
import FormInput from "./FormInput";
import { useState } from "react";
import { useSelector } from "react-redux";
// import { add } from "../redux/taskSlice";
import { useAddTasks } from "../hooks/useAddTAsks";
import { useAuth } from "../contexts/AuthContext";
import { Lists } from "../redux/listSlice";

export default function TaskBar({ newList, setNewList }) {
  const list = useSelector(Lists);
  // const dispatch = useDispatch();
  const { createTask } = useAddTasks();
  const { currentUser } = useAuth();

  const [taskItem, setTaskItem] = useState({
    title: "",
    note: "",
    definedCategory: "",
  });

  function handleSetTask(e) {
    e.preventDefault();
    createTask(currentUser.uid, taskItem);
    setTaskItem({
      title: "",
      note: "",
      // status: "false",
      definedCategory: "",
    });
    // dispatch(add(taskItem));
    closeTaskBar();

    console.log(taskItem);
  }

  function closeTaskBar() {
    setNewList(false);
  }
  return (
    <div
      className={` ${
        newList
          ? "translate-x-[0%] active:transition active:delay-1000 duration-75 ease-in-out"
          : "hidden"
      }  bg-black text-white p-4 rounded-l-2xl absolute right-0 z-50 flex-1 min-h-screen w-[30%] max-w-80 `}
    >
      <div className=" flex justify-between items-center ">
        <h2 className=" text-2xl">Task</h2>
        <span onClick={() => closeTaskBar()}>
          <IoMdClose size="1.5rem" />
        </span>
      </div>

      <form action="" onSubmit={(e) => handleSetTask(e)}>
        <div className=" flex justify-end ">
          <label htmlFor="category"></label>
          <select
            className=" border rounded-2xl px-3 py-2 bg-white text-black"
            name="category"
            id="category"
            onChange={(e) =>
              setTaskItem({ ...taskItem, definedCategory: e.target.value })
            }
          >
            <option value="">Select</option>
            {list.map((item, index) => {
              return (
                <option key={index} value={taskItem.definedCategory}>
                  {item}
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
          className="w-full min-h-40 border rounded-2xl p-2 mt-10"
          name=""
          id=""
          placeholder="add note..."
          value={taskItem.note}
          onChange={(e) => setTaskItem({ ...taskItem, note: e.target.value })}
        />

        <div>
          <Button
            style={{
              padding: "5px 24px",
              borderRadius: "16px",
              backgroundColor: "#fff",
              marginTop: "12px",
              color: "#000",
            }}
            value="Add"
            // onclick={handleSetTask}
            type="submit"
          />
        </div>
      </form>
    </div>
  );
}
