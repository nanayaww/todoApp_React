import { CgProfile } from "react-icons/cg";
import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";
import Settings from "./Settings";

export default function Navbar() {
  const [showSettings, setShowsettings] = useState(false);
  const { currentUser } = useAuth();
  // const username = currentUser?.displayName || "User";
  const username = "User";

  console.log(currentUser);

  function handleClick() {
    setShowsettings(!showSettings);
    console.log(showSettings);
  }

  return (
    <div className=" w-full flex justify-between px-4 py-3  ">
      <div>
        <h1 className=" font-bold text-2xl ">{` ${username}'s Task App`}</h1>
      </div>
      <div className=" text-2xl relative">
        <CgProfile onClick={handleClick} />
        {showSettings && <Settings />}
      </div>
    </div>
  );
}
