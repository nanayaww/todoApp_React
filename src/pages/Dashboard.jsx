import Container from "../components/Container";
import Navbar from "../components/Navbar";
import TaskBar from "../components/TaskBar";
import Sidebar from "../components/Sidebar";
import { createContext, useState } from "react";
import { Toaster } from "react-hot-toast";

// eslint-disable-next-line react-refresh/only-export-components
export const TaskBarIsOpenContext = createContext();
// eslint-disable-next-line react-refresh/only-export-components
export const isEditingContext = createContext();
// eslint-disable-next-line react-refresh/only-export-components
export const isEditingDataContext = createContext();

export default function Dashboard() {
  const [openTaskBar, setOpenTaskBar] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingData, setIsEditingData] = useState(false);

  return (
    <div className="  flex flex-col relative dark:bg-dark-background dark:text-dark-text  ">
      <TaskBarIsOpenContext.Provider value={{ openTaskBar, setOpenTaskBar }}>
        <isEditingContext.Provider value={{ isEditing, setIsEditing }}>
          <isEditingDataContext.Provider
            value={{ isEditingData, setIsEditingData }}
          >
            <div className=" w-full min-h-dvh flex flex-col ">
              <div className=" h-[48] border-b border-black-50 dark:border-black-900">
                <Navbar />
              </div>

              <div className=" relative flex-1 grid grid-cols-4 mt-3 ">
                <Sidebar />
                <Container />
              </div>
            </div>{" "}
            <TaskBar />
            <div>
              <Toaster />
            </div>
          </isEditingDataContext.Provider>
        </isEditingContext.Provider>
      </TaskBarIsOpenContext.Provider>
    </div>
  );
}
