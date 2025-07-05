// Updated Card component
import { TbListDetails } from "react-icons/tb";
import Options from "./Options";
import { SlOptionsVertical } from "react-icons/sl";
import { useRef, useState } from "react";
import { useClickOutside } from "../hooks/useClickOutside";

export default function Card({ title, note, id }) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [expandCardItem, setExpandCardItem] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  function handleExpandCardItem() {
    setExpandCardItem(!expandCardItem);
  }

  function handleClickedOption(e) {
    const { clientX, clientY } = e;
    setMousePosition({ x: clientX, y: clientY });
    console.log(mousePosition);

    setIsOpen(!isOpen);
  }

  useClickOutside(() => {
    setIsOpen(false);
  }, ref);

  return (
    <div className=" relative px-3">
      <div className="bg-light-primary dark:bg-dark-primary flex rounded-sm shadow py-3 ">
        <TbListDetails className=" min-w-[40px]" size={"1.5rem"} />
        <div className=" w-full flex justify-between items-center px-3">
          <div className="">
            <p className=" cursor-pointer" onClick={handleExpandCardItem}>
              {title}
            </p>
          </div>

          <div
            className=" hover:bg-black hover:text-white rounded-sm cursor-pointer p-1"
            ref={ref}
          >
            <SlOptionsVertical onClick={(e) => handleClickedOption(e)} />
            <div>
              {isOpen ? (
                <Options
                  mousePosition={mousePosition}
                  setIsOpen={setIsOpen}
                  id={id}
                />
              ) : null}
            </div>
          </div>
        </div>
      </div>
      {expandCardItem && (
        <span className=" block bg-black-50 dark:bg-dark-secondary dark:text-black ml-[48px] px-2.5 py-1.5 shadow">
          {note}
        </span>
      )}
    </div>
  );
}
