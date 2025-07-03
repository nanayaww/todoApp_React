import { useRef, useState } from "react";
import FormInput from "../components/FormInput";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";

export default function ForgotPassword() {
  const emailRef = useRef();
  const [email, setEmail] = useState("");
  const [checkbox, setCheckbox] = useState(!false);
  const [loading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const { resetPassword } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setError("");
      setIsLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage("Check your inbox for further instructions");
      navigate("/login");
    } catch {
      setError("Failed to reset password");
    }

    setIsLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center bg-black-300 justify-center font-sans">
      <div className=" w-[60%] max-w-[25rem] bg-black-100 rounded-2xl px-20 py-10 shadow-2xl ">
        <h1 className=" text-center pt-2 text-2xl font-bold">
          Forgot Password
        </h1>
        <span>{message}</span>

        <form action="" onSubmit={(e) => handleSubmit(e)}>
          <div>
            <FormInput
              id="userEmail"
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              ref={emailRef}
              error={error}
              required
            />
          </div>
          <div className=" flex justify-center ">
            <button
              disabled={loading}
              type="submit"
              className="w-full bg-black text-white rounded-2xl px-6 py-2.5 mt-5 disabled:opacity-50 cursor-pointer"
            >
              Reset password
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

        <div className=" flex justify-center mt-5 ">
          <p>
            <Link className=" underline" to="/login">
              Already have an account?
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
