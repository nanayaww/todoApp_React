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
    <div className=" relative px-3 pt-3">
      <div className="bg-black-100 flex gap-2 rounded-sm shadow">
        <TbListDetails className=" min-w-[40px]" size={"2rem"} />
        <div className=" w-full flex justify-between items-center pr-3">
          <p className=" cursor-pointer" onClick={handleExpandCardItem}>
            {title}
          </p>
          <div className=" p-0.5 hover:bg-black-100 rounded-sm" ref={ref}>
            <SlOptionsVertical
              cursor="pointer"
              onClick={(e) => handleClickedOption(e)}
            />
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
        <span className=" block bg-black-50 ml-[48px] px-2.5 py-1.5 shadow">
          {note}
        </span>
      )}
    </div>
  );
}
