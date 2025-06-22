export default function Button({ style, value, onclick, type = "button" }) {
  return (
    <div>
      <button
        onClick={() => onclick()}
        type={type}
        style={style}
        className=" bg-black-100 hover:bg-black hover:text-white"
      >
        {value}
      </button>
    </div>
  );
}
