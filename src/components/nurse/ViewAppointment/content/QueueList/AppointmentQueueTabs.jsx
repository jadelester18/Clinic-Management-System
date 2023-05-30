import { Button, Grid, Typography } from "@mui/material";
import React from "react";

export default function AppointmentQueueTabs({ activeTab, onTabChange }) {
  const styles = {
    gContainer: {
      spacing: 2,
      mx: 3,
      mt: 1,
    },
  };
  return (
    <Grid container {...styles.gContainer}>
      <Grid item>
        <Button
          variant={activeTab === "APPOINTMENT" ? "contained" : "outlined"}
          onClick={() => onTabChange("APPOINTMENT")}
          sx={{ borderRadius: 10 }}
        >
          Appointment
        </Button>
      </Grid>
      <Grid item>
        <Button
          variant={activeTab === "QUEUE" ? "contained" : "outlined"}
          onClick={() => onTabChange("QUEUE")}
          sx={{ borderRadius: 10 }}
        >
          Queue
        </Button>
      </Grid>
    </Grid>
  );
}
