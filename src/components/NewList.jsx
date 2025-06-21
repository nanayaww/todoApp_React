import { IoMdClose } from "react-icons/io";
import Button from "./Button";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { create } from "../redux/listSlice";

export default function NewList({ createList, setCreateList }) {
  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch();

  function handleChange(e) {
    setInputValue(e.target.value);
  }

  function handleClick() {
    dispatch(create(inputValue));
    closeCreateList();
  }

  function closeCreateList() {
    setCreateList(false);
    setInputValue("");
  }

  return (
    <div className={`${createList ? "block" : "hidden"} py-4`}>
      <form action="">
        <div className=" flex justify-between items-center ">
          <h2>Create a list</h2>
          <IoMdClose onClick={() => closeCreateList()} size="1.5rem" />
        </div>

        <div className="mt-3">
          <input
            onChange={(e) => handleChange(e)}
            value={inputValue}
            className=" w-full border rounded-2xl p-2"
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
          onclick={handleClick}
        />
      </form>
    </div>
  );
}
