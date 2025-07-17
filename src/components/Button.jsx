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
        className=" bg-black-200 hover:bg-black dark:bg-dark-primary px-2.5 py-1.5 rounded-sm cursor-pointer hover:duration-300 animate-ease-in"
      >
        {value}
      </button>
    </div>
  );
}
