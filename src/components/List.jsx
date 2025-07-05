export default function List({ onclick, name }) {
  return (
    <li
      onClick={() => onclick(name)}
      className=" rounded-sm px-2.5 py-1.5 bg-light-primary dark:bg-dark-primary animate-fade animate-ease-in-out"
    >
      {name}
    </li>
  );
}
