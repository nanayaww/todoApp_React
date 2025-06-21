export default function List({ onclick, name }) {
  return (
    <li onClick={() => onclick(name)} className=" rounded-2xl p-2 bg-black-100">
      {name}
    </li>
  );
}
