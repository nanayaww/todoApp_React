import { IoMdClose } from "react-icons/io";

export default function Toast() {
  return (
    <div className=" absolute right-50 top-5 z-40 bg-black text-white px-2.5 py-5 rounded-sm">
      <span className="flex justify-end   ">
        <IoMdClose
          size="1rem"
          className=" rounded-full hover:bg-white hover:text-black"
        />
      </span>
      Unable to added task
    </div>
  );
}
