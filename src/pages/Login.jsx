import { Link, useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";
import FormInput from "../components/FormInput";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useAddTasks } from "../hooks/useAddTasks";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setIsLoading] = useState(false);
  const [checkbox, setCheckbox] = useState(!false);
  const { logIn } = useAuth();
  const { loadUserTasks } = useAddTasks();

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setIsLoading(true);
      console.log("Attempting login with:", email);

      // Wait for login to complete and get the user credential
      const userCredential = await logIn(email, password);
      const user = userCredential.user;

      console.log("Login successful, user ID:", user.uid);

      localStorage.setItem("uid", user.uid);

      // Load user tasks with the UID
      await loadUserTasks(user.uid);
      console.log("Tasks loaded successfully");

      // Navigate to home page
      navigate("/");
    } catch (error) {
      console.error("Login failed:", { error });
      setError("Invalid credentials. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center bg-black-300 justify-center font-sans">
      <div className=" w-[60%] max-w-[25rem] bg-black-100 rounded-2xl px-20 py-10 shadow-2xl ">
        <h1 className=" text-center pt-2 text-2xl font-bold">Login</h1>

        {/* Display error message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form action="" onSubmit={handleSubmit}>
          <div>
            <FormInput
              id="userEmail"
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <FormInput
              id="userPassword"
              label="Password"
              type={checkbox ? "password" : "text"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className=" flex justify-center ">
            <button
              disabled={loading}
              type="submit"
              className="w-full bg-black text-white rounded-2xl px-6 py-2.5 mt-5 disabled:opacity-50 cursor-pointer"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>
        <div className=" mt-3 text-sm flex justify-between  ">
          <span className=" underline text-blue-600">
            <Link to="/forgotPassword">Forgot Password?</Link>
          </span>{" "}
          <span>
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
