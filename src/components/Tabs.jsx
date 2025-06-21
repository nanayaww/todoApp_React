export default function Tabs({ value, onClick }) {
  return (
    <div onClick={onClick} className=" text-black-400 active:text-black ">
      {value}
    </div>
  );
}
