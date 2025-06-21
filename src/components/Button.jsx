export default function Button({ style, value, onclick }) {
  return (
    <div>
      <button
        onClick={() => onclick()}
        type="button"
        style={style}
        className=" bg-black-100 hover:bg-black hover:text-white"
      >
        {value}
      </button>
    </div>
  );
}
