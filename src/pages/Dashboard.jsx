import Container from "../components/Container";
import Navbar from "../components/Navbar";
import TaskBar from "../components/TaskBar";
import Sidebar from "../components/Sidebar";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import {
  IsEditingContext,
  IsEditingDataContext,
  TaskBarIsOpenContext,
} from "../contexts/AppContext";

export default function Dashboard() {
  const [openTaskBar, setOpenTaskBar] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingData, setIsEditingData] = useState(false);

  return (
    <div className="  flex flex-col relative dark:bg-dark-background dark:text-dark-text  ">
      <TaskBarIsOpenContext.Provider value={{ openTaskBar, setOpenTaskBar }}>
        <IsEditingContext.Provider value={{ isEditing, setIsEditing }}>
          <IsEditingDataContext.Provider
            value={{ isEditingData, setIsEditingData }}
          >
            <div className=" w-full min-h-dvh flex flex-col ">
              <div className=" h-[48] border-b border-black-50 dark:border-black-900">
                <Navbar />
              </div>

              <div className=" relative flex-1 grid grid-cols-5 mt-3 ">
                <Sidebar />
                <Container />
              </div>
            </div>{" "}
            <TaskBar />
            <div>
              <Toaster />
            </div>
          </IsEditingDataContext.Provider>
        </IsEditingContext.Provider>
      </TaskBarIsOpenContext.Provider>
    </div>
  );
}
