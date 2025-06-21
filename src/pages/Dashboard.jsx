import Container from "../components/Container";
import Navbar from "../components/Navbar";
import TaskBar from "../components/TaskBar";
import Sidebar from "../components/Sidebar";
import { useState } from "react";

export default function Dashboard() {
  const [newList, setNewList] = useState(false);

  return (
    <div className=" flex flex-col ">
      <div className=" w-full min-h-dvh flex flex-col ">
        <div className=" h-[48] border-b border-black-50">
          <Navbar />
        </div>

        <div className=" relative flex-1 grid grid-cols-4 mt-3 ">
          <Sidebar />
          <Container newList={newList} setNewList={setNewList} />
        </div>
      </div>{" "}
      <TaskBar newList={newList} setNewList={setNewList} />
    </div>
  );
}
