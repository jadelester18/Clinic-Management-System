import React from "react";
import { ReactComponent as Sun } from "./Sun.svg";
import { ReactComponent as Moon } from "./Moon.svg";
import "./DarkMode.css";

const DarkMode = ({ toggleMode, mode }) => {
  const toggleTheme = (e) => {
    toggleMode();
  };

  return (
    <div className="dark_mode">
      <input
        className="dark_mode_input"
        type="checkbox"
        id="darkmode-toggle"
        onChange={toggleTheme}
        checked={mode === "dark"} 
      />
      <label className="dark_mode_label" for="darkmode-toggle">
        {mode === "dark" ? <Moon /> : <Sun />}
      </label>
    </div>
  );
};

export default DarkMode;
