import { CgProfile } from "react-icons/cg";
import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";
import Settings from "./Settings";

export default function Navbar() {
  const [showSettings, setShowsettings] = useState(false);
  const { currentUser } = useAuth();
  const email = currentUser.email;

  function handleClick() {
    setShowsettings(!showSettings);
  }

  return (
    <div className=" w-full flex justify-between px-12 py-3  ">
      <div>
        <h1 className=" font-bold text-2xl font-sans ">Future Note</h1>
      </div>
      <div className=" relative">
        <CgProfile
          size="2rem"
          className="cursor-pointer"
          onClick={handleClick}
        />
        {showSettings && <Settings email={email} />}
      </div>
    </div>
  );
}
