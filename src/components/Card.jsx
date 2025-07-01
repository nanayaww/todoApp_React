// Updated Card component
import { TbListDetails } from "react-icons/tb";
import Options from "./Options";
import { SlOptionsVertical } from "react-icons/sl";
import { useRef, useState } from "react";
import { useClickOutside } from "../hooks/useClickOutside";

export default function Card({ title, note, id }) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  useClickOutside(() => {
    setIsOpen(false);
  }, ref);

  return (
    <div className=" relative  px-3 pt-3 rounded-2xl">
      <div className="bg-black-100 flex gap-2">
        <TbListDetails className=" min-w-[40px]" size={"2rem"} />
        <div className=" w-full flex justify-between items-center pr-3">
          <p>{title}</p>
          <div className=" p-0.5 hover:bg-black-100 rounded-sm" ref={ref}>
            <SlOptionsVertical
              cursor="pointer"
              onClick={() => setIsOpen(!isOpen)}
            />
            <div>
              {isOpen ? <Options setIsOpen={setIsOpen} id={id} /> : null}
            </div>
          </div>
        </div>
      </div>
      <span className=" block bg-black-50 ml-[48px]">{note}</span>
    </div>
  );
}
