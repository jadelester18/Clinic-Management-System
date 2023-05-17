import { Box, SpeedDial, SpeedDialAction, SpeedDialIcon } from "@mui/material";
import React, { useEffect, useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import BubbleChartIcon from "@mui/icons-material/BubbleChart";
import PatientDashboard from "./Dashboard/PatientDashboard";
import { Link } from "react-router-dom";
import PatientReminders from "./Reminders/PatientReminders";

function PatientHome() {
  const [selectedLink, setSelectedLink] = useState(() => {
    return localStorage.getItem("selectedLink") || "Home";
  });

  useEffect(() => {
    localStorage.setItem("selectedLink", selectedLink);
  }, [selectedLink]);

  const handleLinkClick = (link) => {
    setSelectedLink(link);
  };
  return (
    <Box>
      {selectedLink === "Home" && <PatientDashboard />}
      {selectedLink === "Reminders" && <PatientReminders />}
      {/* <Box sx={{ height: 320, transform: "translateZ(0px)", flexGrow: 1 }}> */}
      {/* Speed dial component is moved outside of the Box component */}
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{
          position: "fixed",
          bottom: { xs: "16px", md: "30px" },
          right: "16px",
          width: 100,
          // height: 100,
        }} // modified sx props
        icon={<SpeedDialIcon />}
      >
        <SpeedDialAction
          key="Home"
          icon={<HomeIcon />}
          tooltipTitle="Home"
          onClick={() => {
            handleLinkClick("Home");
          }}
          sx={{
            "&:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.04)", // set the background color when hovered
            },
          }}
        />
        <SpeedDialAction
          key="Reminders"
          icon={<BubbleChartIcon />}
          tooltipTitle="Reminders"
          onClick={() => {
            handleLinkClick("Reminders");
          }}
          sx={{
            "&:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.04)", // set the background color when hovered
            },
          }}
        />
      </SpeedDial>
      {/* </Box> */}
    </Box>
  );
}

export default PatientHome;
