import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgetPassword from "./pages/ForgotPassword";
import ChangePassword from "./pages/ChangePassword";
import NurseHome from "./pages/nurse/NurseHome";
import DoctorHome from "./pages/doctor/DoctorHome";
import Profile from "./pages/Profile";
import LandingPage from "./pages/LandingPage";
import PageNotFound from "./pages/PageNotFound";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { themeSettings } from "./components/theme/Theme";
import Navbar from "./components/navbar/Navbar";
import { useEffect, useState } from "react";

function App() {
  const [mode, setMode] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    localStorage.setItem("theme", mode);
  }, [mode]);

  const toggleMode = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  const theme = createTheme(themeSettings(mode));
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Navbar toggleMode={toggleMode} mode={mode} />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/nurse" element={<NurseHome />} />
          <Route path="/doctor" element={<DoctorHome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgetPassword />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
