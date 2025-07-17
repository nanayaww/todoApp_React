import { IoMdClose } from "react-icons/io";
import Button from "./Button";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { create } from "../redux/listSlice";

export default function NewList({ createList, setCreateList }) {
  const [listItem, setListItem] = useState({ title: "" });
  const dispatch = useDispatch();

  function handleChange(e) {
    setListItem({ title: e.target.value });
  }

  function handleClick() {
    if (listItem.title !== "") {
      dispatch(create(listItem));
    }
    closeCreateList();
  }

  function closeCreateList() {
    setCreateList(false);
    setListItem({ title: "" });
  }

  return (
    <div
      className={`${
        createList ? "block" : "hidden"
      }   duration-300 animate-ease-in-out dark:bg-dark-background rounded-lg p-2 mb-4`}
    >
      <form action="">
        <div className=" flex justify-between items-center ">
          <h2>Create a list</h2>
          <IoMdClose onClick={() => closeCreateList()} size="1.5rem" />
        </div>

        <div className="mt-3">
          <input
            onChange={(e) => handleChange(e)}
            value={listItem.title}
            className=" w-full border rounded-2xl px-3 py-2"
            type="text"
          />
        </div>

        <Button
          style={{
            padding: "5px 24px",
            borderRadius: "16px",
            marginTop: "12px",
          }}
          value="Create"
          onclick={() => handleClick()}
        />
      </form>
    </div>
  );
}
