import { FcGoogle } from "react-icons/fc";
import FormInput from "../components/FormInput";
import { Link, useNavigate } from "react-router";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { updateProfile } from "firebase/auth";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [checkbox, setCheckbox] = useState(!false);

  const [error, setError] = useState("");
  const [loading, setLoding] = useState(false);
  const { currentUser, signUp } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    if (password != confirmPassword) {
      console.log(error);
      return setError("Password do not match");
    }
    try {
      setError("");
      setLoding(true);

      console.log(email, password);

      const userCredential = await signUp(email, password);
      await updateProfile(userCredential.user, {
        displayName: username,
      });

      navigate("/");

      localStorage.setItem("uid", JSON.stringify(currentUser.uid));
    } catch {
      console.error("unable to create account");
    }
    setLoding(false);
  }

  return (
    <div className=" min-h-screen flex items-center bg-black-300 justify-center font-sans">
      <div className=" w-[60%] max-w-[28rem] bg-black-100 rounded-2xl px-20 py-10 shadow-2xl ">
        <h1 className=" text-center pt-2 text-2xl font-bold">Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <FormInput
            id="username"
            label="Username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required={true}
          />
          <div>
            <FormInput
              id="userEmail"
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required={true}
            />
            <FormInput
              id="userPassword"
              label="Password"
              type={checkbox ? "password" : "text"}
              value={password}
              onChange={(e) => {
                setError(null);
                setPassword(e.target.value);
              }}
              required={true}
            />
            <FormInput
              id="confirmPassword"
              label="Confirm Password"
              type={checkbox ? "password" : "text"}
              value={confirmPassword}
              onChange={(e) => {
                setError(null);
                setConfirmPassword(e.target.value);
              }}
              error={error}
            />
          </div>
          <div>
            <span className=" flex gap-2 mt-2">
              <input
                id="showPassword"
                label="Show Password"
                type="checkbox"
                value={checkbox}
                onChange={(e) => {
                  setCheckbox(!e.target.checked);
                  console.log(checkbox);
                }}
              />
              <label htmlFor="showPassword">Show Password</label>
            </span>
          </div>

          <div>
            <button
              disabled={loading}
              type="submit"
              className="w-full bg-black text-white rounded-2xl px-6 py-2.5 mt-5"
            >
              Sign Up
            </button>
          </div>
        </form>
        <div>
          <button className="w-full bg-black text-white rounded-2xl px-6 py-2.5 mt-5 flex items-center justify-center gap-1">
            <FcGoogle size="2em" />
            <span>Sign Up with Google</span>
          </button>
        </div>
        <div className=" flex justify-center mt-5 ">
          <p>
            Already have an account?{" "}
            <Link className=" underline" to="/login">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
