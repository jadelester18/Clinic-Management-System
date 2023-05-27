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
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { themeSettings } from "./components/theme/Theme";
import Navbar from "./components/navbar/Navbar";
import { useEffect, useState } from "react";
import PatientHome from "./pages/patient/PatientHome";
import BookAppointment from "./components/patient/appointment/SetAppointment/BookAppointment";
import { useSelector } from "react-redux";
import VerifyUser from "./pages/VerifyUser";
import { CssBaseline } from "@mui/material";

function App() {
  const userLoggedinDetails = useSelector((state) => state.user);
  let userObject = userLoggedinDetails?.user;
  let user = userLoggedinDetails?.user?.user;

  const [mode, setMode] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    localStorage.setItem("theme", mode);
  }, [mode]);

  const toggleMode = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  const theme = createTheme(themeSettings(mode));
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navbar toggleMode={toggleMode} mode={mode} />
        <Routes>
          <Route
            path="/"
            element={
              user?.enabled === true ? (
                user?.role === "ROLE_DOCTOR" ? (
                  <Navigate to={"/doctor"} replace={true} />
                ) : user?.role === "ROLE_NURSE" ? (
                  <Navigate to={"/nurse"} replace={true} />
                ) : user?.role === "ROLE_PATIENT" ? (
                  <Navigate to={"/patient"} replace={true} />
                ) : (
                  <Navigate to={"/"} />
                )
              ) : (
                <LandingPage />
              )
            }
          />
          <Route
            path="/nurse"
            element={
              user?.enabled === true ? (
                // user?.role === "ROLE_NURSE" ? (
                <NurseHome toggleMode={toggleMode} mode={mode} />
              ) : (
                //   ) : (
                //     <Navigate to={"/"} replace={true} />
                //   )
                <Navigate to={"/"} replace={true} />
              )
            }
          />
          <Route
            path="/doctor"
            element={
              user?.enabled === true ? (
                // user?.role === "ROLE_DOCTOR" ? (
                <DoctorHome toggleMode={toggleMode} mode={mode} />
              ) : (
                // <Navigate to={"/"} replace={true} />
                // )
                // ) : (
                <Navigate to={"/"} replace={true} />
              )
            }
          />
          <Route
            path="/patient"
            element={
              user?.enabled === true ? (
                // user?.role === "ROLE_PATIENT" ? (
                <PatientHome toggleMode={toggleMode} mode={mode} />
              ) : (
                // ) : (
                // <Navigate to={"/"} replace={true} />
                // )
                <Navigate to={"/"} replace={true} />
              )
            }
          />
          <Route
            path="/login"
            element={
              user?.enabled === true ? (
                user?.role === "ROLE_DOCTOR" ? (
                  <Navigate to={"/doctor"} replace={true} />
                ) : user?.role === "ROLE_NURSE" ? (
                  <Navigate to={"/nurse"} replace={true} />
                ) : user?.role === "ROLE_PATIENT" ? (
                  <Navigate to={"/patient"} replace={true} />
                ) : (
                  <Navigate to={"/"} />
                )
              ) : (
                <Login />
              )
            }
          />
          <Route
            path="/register"
            element={
              user?.enabled === true ? (
                user?.role === "ROLE_DOCTOR" ? (
                  <Navigate to={"/doctor"} replace={true} />
                ) : user?.role === "ROLE_NURSE" ? (
                  <Navigate to={"/nurse"} replace={true} />
                ) : user?.role === "ROLE_PATIENT" ? (
                  <Navigate to={"/patient"} replace={true} />
                ) : (
                  <Navigate to={"/"} replace={true} />
                )
              ) : (
                <Register />
              )
            }
          />
          <Route
            path="/forgot-password"
            element={
              userObject === null ? (
                <ForgetPassword />
              ) : user?.enabled === true ? (
                user?.role === "ROLE_DOCTOR" ? (
                  <Navigate to={"/doctor"} replace={true} />
                ) : user?.role === "ROLE_NURSE" ? (
                  <Navigate to={"/nurse"} replace={true} />
                ) : user?.role === "ROLE_PATIENT" ? (
                  <Navigate to={"/patient"} replace={true} />
                ) : (
                  <Navigate to={"/"} />
                )
              ) : (
                <Navigate to={"/"} />
              )
            }
          />
          <Route
            path="/change-password"
            element={
              userObject === null ? (
                <ChangePassword />
              ) : user?.enabled === true ? (
                user?.role === "ROLE_DOCTOR" ? (
                  <Navigate to={"/doctor"} replace={true} />
                ) : user?.role === "ROLE_NURSE" ? (
                  <Navigate to={"/nurse"} replace={true} />
                ) : user?.role === "ROLE_PATIENT" ? (
                  <Navigate to={"/patient"} replace={true} />
                ) : (
                  <Navigate to={"/"} />
                )
              ) : (
                <Navigate to={"/"} />
              )
            }
          />
          <Route
            path="/verify/:token"
            element={
              userObject !== null ? (
                <VerifyUser />
              ) : user?.enabled === true ? (
                user?.role === "ROLE_DOCTOR" ? (
                  <Navigate to={"/doctor"} replace={true} />
                ) : user?.role === "ROLE_NURSE" ? (
                  <Navigate to={"/nurse"} replace={true} />
                ) : user?.role === "ROLE_PATIENT" ? (
                  <Navigate to={"/patient"} replace={true} />
                ) : (
                  <Navigate to={"/"} />
                )
              ) : (
                <Navigate to={"/"} />
              )
            }
          />
          <Route
            path="/profile/:id"
            element={
              user?.enabled === true ? <Profile /> : <Navigate to={"/"} />
            }
          />
          <Route
            path="/book-appointment/:id"
            element={
              user?.enabled === true ? (
                user?.role === "ROLE_PATIENT" ? (
                  <BookAppointment />
                ) : (
                  <Navigate to={"/"} />
                )
              ) : (
                <Navigate to={"/"} />
              )
            }
          />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
