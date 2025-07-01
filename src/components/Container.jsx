import { useSelector } from "react-redux";
import Button from "../components/Button";
import Card from "../components/Card";
import Tabs from "./Tabs";
import { useState, useEffect, useContext } from "react";
import { Alltask } from "../redux/taskSlice";
import { TaskBarIsOpenContext } from "../pages/Dashboard";

export default function Container() {
  const tasks = useSelector(Alltask);
  const [currentTasks, setCurrentTask] = useState(tasks);
  const { setNewList } = useContext(TaskBarIsOpenContext);

  console.log(tasks);

  // Sync currentTasks with tasks from Redux when tasks change
  useEffect(() => {
    setCurrentTask(tasks);
  }, [tasks]);

  useEffect(() => {});

  function filterPendingTasks() {
    // Filter for tasks with status === true (pending)
    setCurrentTask(tasks.filter((task) => task.status !== false));
  }

  function filterCompletedTasks() {
    // Filter for tasks with status === false (completed)
    setCurrentTask(tasks.filter((task) => task.status !== true));
  }

  function allTasks() {
    setCurrentTask(tasks);
  }

  function handleclick() {
    setNewList(true);
  }

  return (
    <div className={`col-span-3 px-10 pt-4 md:px-25`}>
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-2xl">My Tasks</h1>
        <Button
          style={{
            padding: "5px 24px",
            borderRadius: "16px",
          }}
          value="Add"
          onclick={handleclick}
        />
      </div>
      <div className="flex gap-4 mt-8 border-b border-black-50 pb-4">
        {/* Fixed: Call the functions directly, not as arrow functions */}
        <Tabs onclick={allTasks} value="All Tasks" />
        <Tabs onclick={filterPendingTasks} value="Pending" />
        <Tabs onclick={filterCompletedTasks} value="Completed" />
      </div>
      <div className="flex flex-col gap-4 mt-4">
        {/* Fixed: Check for array length instead of truthiness */}
        {currentTasks && currentTasks.length > 0 ? (
          currentTasks.map((item, index) => (
            <Card
              key={item.id || index}
              title={item.title}
              note={item.note}
              id={item.id}
            />
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">No tasks found</div>
        )}
      </div>
    </div>
  );
}
