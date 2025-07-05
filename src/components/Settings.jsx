import { useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { appState, setMode } from "../redux/appStateSlice";
import { useRef, useState } from "react";
import { useClickOutside } from "../hooks/useClickOutside";

export default function Settings({ email, showSettings }) {
  const ref = useRef();
  const { logOut } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { Theme } = useSelector(appState);
  const [darkMode, setDarKMode] = useState(false);

  useClickOutside(showSettings, ref);

  function handleMode() {
    setDarKMode(!darkMode);
    dispatch(setMode(darkMode));
  }

  async function handleLogOut(e) {
    e.preventDefault();

    try {
      await logOut();
      window.localStorage.clear();
      navigate("/logIn");
    } catch {
      console.error("unable to log out");
    }
  }

  return (
    <div
      className=" flex flex-col gap-3 absolute translate-x-[-10rem] translate-y-3 bg-light-background dark:bg-dark-primary rounded-md  px-2.5 py-3 z-20 shadow-md"
      ref={ref}
    >
      <div>
        <div className=" text-sm ">{email}</div>
        <div onClick={handleMode} className=" cursor-pointer">
          <span>Appearance: </span>
          {Theme ? (
            <MdLightMode className="inline-block" />
          ) : (
            <MdDarkMode className=" inline-block" />
          )}
        </div>
      </div>

      <div className="  ">
        <button
          onClick={handleLogOut}
          className=" bg-red-700 rounded-sm px-2 cursor-pointer w-40"
        >
          Log Out
        </button>
      </div>
    </div>
  );
}
