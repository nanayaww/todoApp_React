// Updated Card component
import { TbListDetails } from "react-icons/tb";
import Options from "./Options";
import { SlOptionsVertical } from "react-icons/sl";

export default function Card({ id, title, note, showOptions, setCardId }) {
  const handleOptionsClick = () => {
    if (showOptions) {
      !showOptions;
    }
    setCardId(id);
  };

  return (
    <div className=" relative  px-3 pt-3 rounded-2xl">
      <div className="bg-amber-100 flex gap-2">
        <TbListDetails className=" min-w-[40px]" size={"2rem"} />
        <div className=" w-full flex justify-between items-center pr-3">
          <p>{title}</p>
          <div className=" p-0.5 hover:bg-black-100 rounded-sm">
            <SlOptionsVertical cursor="pointer" onClick={handleOptionsClick} />
          </div>
        </div>
      </div>
      <span className=" block bg-amber-50 ml-[48px]">{note}</span>
      <div>{showOptions ? <Options /> : null}</div>
    </div>
  );
}
