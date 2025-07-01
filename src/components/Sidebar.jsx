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
  const task = useSelector(Alltask);

  function handleClick() {
    setCreateList(true);
    console.log(list);
  }

  function filterTaskByList(item) {
    console.log(item);
  }

  return (
    <div className=" flex flex-col justify-between col-span-1 bg-black-50 p-4 pb-10 rounded-r-2xl">
      <div>
        <ul className="flex flex-col gap-2 ">
          {list.map((item, index) => (
            <List
              onclick={() => filterTaskByList(item)}
              key={index}
              name={item}
            />
          ))}
        </ul>
      </div>
      <div className="  ">
        <NewList createList={createList} setCreateList={setCreateList} />
        <div
          onClick={handleClick}
          className="flex items-center gap-2 rounded-2xl p-3 bg-black-100 hover:bg-black hover:text-white transition delay-40 ease-in-out "
        >
          <CgAdd />
          Create new list
        </div>
      </div>
    </div>
  );
}
