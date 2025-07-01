import { useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";

export default function Settings() {
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
    <div className=" absolute translate-x-[-8rem] translate-y-3 w-40 bg-black-100  rounded-md text-center px-2.5 py-3 z-20 shadow-md">
      <div>
        <button onClick={handleLogOut} className=" bg-red-500 rounded-sm px-2">
          Log Out
        </button>
      </div>
    </div>
  );
}
