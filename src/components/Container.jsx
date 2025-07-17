import { useSelector } from "react-redux";
import Button from "../components/Button";
import Card from "../components/Card";
import Tabs from "./Tabs";
import { useState, useContext, createContext, useEffect } from "react";
import { Alltask } from "../redux/taskSlice";
import { TaskBarIsOpenContext } from "../pages/Dashboard";
import { useAuth } from "../contexts/AuthContext";

// eslint-disable-next-line react-refresh/only-export-components
export const CurrentTaskContext = createContext();

export default function Container() {
  const tasks = useSelector(Alltask);
  const [currentTasks, setCurrentTask] = useState(tasks);
  const { currentUser } = useAuth();
  const username = currentUser.displayName;
  const { setOpenTaskBar } = useContext(TaskBarIsOpenContext);

  useEffect(() => {
    setCurrentTask(tasks);
  }, [tasks]);

  function allTasks() {
    setCurrentTask(tasks);
  }

  function filterPendingTasks() {
    // Filter for tasks with status === true (pending)
    setCurrentTask(tasks.filter((task) => task.status === false));
  }

  function filterCompletedTasks() {
    // Filter for tasks with status === false (completed)
    setCurrentTask(tasks.filter((task) => task.status === true));
  }

  function handleclick() {
    setOpenTaskBar(true);
  }

  return (
    <CurrentTaskContext.Provider value={{ currentTasks, setCurrentTask }}>
      <div className={`col-span-4 px-10 pt-4 md:px-50`}>
        <div className="flex justify-between items-center">
          <div>
            <h1 className="font-bold text-2xl">Notes</h1>
            <h3 className=" font-sans">Welcome👋 {username}</h3>
          </div>

          <Button
            style={{
              padding: "5px 24px",
            }}
            value="Add"
            onclick={() => handleclick()}
          />
        </div>
        <div className="flex gap-4 mt-8 border-b border-black-50 dark:border-black-900 pb-4">
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
    </CurrentTaskContext.Provider>
  );
}
