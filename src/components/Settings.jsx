import { useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";

export default function Settings({ email }) {
  const { logOut } = useAuth();
  const navigate = useNavigate();

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
    <div className=" flex flex-col gap-3 absolute translate-x-[-10rem] translate-y-3 bg-black-100 rounded-md text-center px-2.5 py-3 z-20 shadow-md">
      <div>
        <div className=" text-sm ">{email}</div>
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
