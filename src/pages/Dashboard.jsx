import Container from "../components/Container";
import Navbar from "../components/Navbar";
import TaskBar from "../components/TaskBar";
import Sidebar from "../components/Sidebar";
import { createContext, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const TaskBarIsOpenContext = createContext(null);
// eslint-disable-next-line react-refresh/only-export-components
export const isEditingContext = createContext(null);
// eslint-disable-next-line react-refresh/only-export-components
export const isEditingDataContext = createContext({});

export default function Dashboard() {
  const [openTaskBar, setOpenTaskBar] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingData, setIsEditingData] = useState(false);

  return (
    <div className=" flex flex-col ">
      <TaskBarIsOpenContext.Provider value={{ openTaskBar, setOpenTaskBar }}>
        <isEditingContext.Provider value={{ isEditing, setIsEditing }}>
          <isEditingDataContext.Provider
            value={{ isEditingData, setIsEditingData }}
          >
            <div className=" w-full min-h-dvh flex flex-col ">
              <div className=" h-[48] border-b border-black-50">
                <Navbar />
              </div>

              <div className=" relative flex-1 grid grid-cols-4 mt-3 ">
                <Sidebar />
                <Container />
              </div>
            </div>{" "}
            <TaskBar />
          </isEditingDataContext.Provider>
        </isEditingContext.Provider>
      </TaskBarIsOpenContext.Provider>
    </div>
  );
}
