import { BrowserRouter, Route, Routes } from "react-router";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Signup from "./pages/Signup";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoutes from "./pages/ProtectedRoutes";
import ForgotPassword from "./pages/ForgotPassword";
import { useSelector } from "react-redux";
import { appState } from "./redux/appStateSlice";

function App() {
  const { Theme } = useSelector(appState);

  return (
    <div className={` ${Theme && "dark"}  font-sans`}>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoutes>
                  <Dashboard />
                </ProtectedRoutes>
              }
            />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgotPassword" element={<ForgotPassword />} />
            <Route path="*" element={""} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
