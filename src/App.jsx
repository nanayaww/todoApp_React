// Example inside App.jsx
// import { useSelector, useDispatch } from "react-redux";
// import { increment, decrement } from "./redux/counterSlice";
// import { inputValue } from "./redux/nameSlice";

import { BrowserRouter, Route, Routes } from "react-router";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Signup from "./pages/Signup";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  // const dispatch = useDispatch();
  // const count = useSelector((state) => state.counter.value);
  // const value = useSelector((state) => {
  //   return state.input.value;
  // });

  // function handleChange(e) {
  //   dispatch(inputValue(e.target.value));
  // }

  return (
    <div className=" font-sans">
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
