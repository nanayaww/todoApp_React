import { useState } from "react";

export default function Tabs({ value, onclick }) {
  const [clicked, setClicked] = useState(false);
  return (
    <div
      onClick={() => {
        onclick();
        setClicked(!clicked);
      }}
      className={`${
        clicked && "bg-black"
      }text-black-400 active:text-black cursor-pointer`}
    >
      {value}
    </div>
  );
}
