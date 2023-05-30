import { Toolbar, Grid, Typography } from "@mui/material";
import React from "react";

export default function ApprovedAppointmentsHeader() {
  const styles = {
    toolbar: { display: { xs: "none", md: "grid" }, width: "100%" },
  };
  return (
    <Toolbar variant="dense" sx={styles.toolbar}>
      <Grid container justifyContent="center">
        <Grid item md={4} textAlign="left">
          <Typography variant="button">PATIENT</Typography>
        </Grid>
        <Grid item md={4} textAlign="center">
          <Typography variant="button">DOCTOR AND SCHEDULE</Typography>
        </Grid>
        <Grid item md={4} textAlign="right">
          <Typography variant="button">ACTIONS</Typography>
        </Grid>
      </Grid>
    </Toolbar>
  );
}
