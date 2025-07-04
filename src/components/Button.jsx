export default function Button({
  style,
  value,
  onclick = null,
  type = "button",
}) {
  return (
    <div>
      <button
        onClick={onclick}
        type={type}
        style={style}
        className=" bg-black-200s hover:bg-black hover:text-white px-2.5 py-1.5 rounded-sm cursor-pointer hover:animate-fade hover:animate-ease-in"
      >
        {value}
      </button>
    </div>
  );
}
