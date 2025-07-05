import { CgAdd } from "react-icons/cg";
import NewList from "../components/NewList";
import { useState } from "react";
import List from "./List";
import { useSelector } from "react-redux";
import { Alltask } from "../redux/taskSlice";
import { Lists } from "../redux/listSlice";

export default function Sidebar() {
  const [createList, setCreateList] = useState(false);
  const list = useSelector(Lists);

  function handleClick() {
    setCreateList(true);
  }

  function filterTaskByList(item) {
    console.log(item);
  }

  return (
    <div className=" flex flex-col justify-between col-span-1 bg-black-50 dark:bg-black-900 p-4 pb-10 rounded-r-2xl">
      <div>
        <ul className="flex flex-col gap-2 ">
          {list.map((item, index) => (
            <List
              onclick={() => filterTaskByList(item.title)}
              key={index}
              name={item.title}
            />
          ))}
        </ul>
      </div>
      <div className="  ">
        <NewList createList={createList} setCreateList={setCreateList} />
        <div
          onClick={handleClick}
          className="flex items-center gap-2 rounded-sm px-2.5 py-1.5 bg-black-400 hover:bg-black hover:text-white dark:bg-dark-primary  transition delay-40 ease-in-out "
        >
          <CgAdd />
          Create new list
        </div>
      </div>
    </div>
  );
}
