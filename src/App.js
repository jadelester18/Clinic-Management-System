import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgetPassword from "./pages/ForgotPassword";
import ChangePassword from "./pages/ChangePassword";
import Home from "./pages/nurse/Home";
import Profile from "./pages/Profile";
import PageNotFound from "./pages/PageNotFound";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={`/landingpage`} element={<LandingPage />} />
          <Route path={`/login`} element={<Login />} />
          <Route path={`/register`} element={<Register />} />
          <Route path={`/forgot-password`} element={<ForgetPassword />} />
          <Route path={`/change-password`} element={<ChangePassword />} />
          <Route path={`/`} element={<Home />} />
          <Route path={`/Profile`} element={<Profile />} />
          <Route path={`/*`} element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
