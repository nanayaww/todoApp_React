import { Link, useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";
import FormInput from "../components/FormInput";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useAddTasks } from "../hooks/useAddTAsks";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setIsLoading] = useState(false);
  const { currentUser, logIn } = useAuth();
  const { loadUserTasks } = useAddTasks();

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setIsLoading(true);
      console.log(email, password);

      await logIn(email, password);

      localStorage.setItem("uid", JSON.stringify(currentUser.uid));
      const uid = localStorage.getItem("uid");
      console.log(uid);

      loadUserTasks(uid);

      navigate("/");
    } catch {
      console.error("Invalid credentials");
    }
    setIsLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center bg-black-300 justify-center font-sans">
      <div className=" w-[60%] max-w-[25rem] bg-black-100 rounded-2xl px-20 py-10 shadow-2xl ">
        <h1 className=" text-center pt-2 text-2xl font-bold">Login</h1>
        <form action="" onSubmit={handleSubmit}>
          <div>
            <FormInput
              id="userEmail"
              label="Email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={error}
            />
            <FormInput
              id="userPassword"
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={error}
            />
          </div>
          <div className=" flex justify-center ">
            <button
              disabled={loading}
              type="submit"
              className="w-full bg-black text-white rounded-2xl px-6 py-2.5 mt-5"
            >
              Login
            </button>
          </div>
        </form>
        <div className=" mt-1 underline text-blue-600 text-sm  ">
          <a href="">Forgot Password?</a>
        </div>
        <div>
          <button className="w-full bg-black text-white rounded-2xl px-6 py-2.5 mt-5 flex items-center justify-center gap-2">
            <FcGoogle size="1.5em" />
            <span>Sign In with Google</span>
          </button>
        </div>
        <div className=" flex justify-center mt-5 ">
          <p>
            Don't have an account?{" "}
            <Link className=" underline" to="/signup">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
