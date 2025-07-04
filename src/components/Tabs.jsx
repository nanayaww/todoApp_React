import { useState } from "react";

export default function Tabs({ value, onclick }) {
  const [clicked, setClicked] = useState(false);
  return (
    <div
      onClick={() => {
        onclick();
        setClicked(!clicked);
      }}
      className={` hover:bg-black hover:text-white hover:animate-fade cursor-pointer px-2.5 py-1.5  rounded-sm`}
    >
      {value}
    </div>
  );
}
