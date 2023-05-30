import { Grid, Toolbar, Typography } from "@mui/material";
import React from "react";

export default function QueueListHeader() {
  const styles = {
    toolbar: { display: { xs: "none", md: "grid" }, width: "100%" },
  };
  return (
    <Toolbar variant="dense" sx={styles.toolbar}>
      <Grid container justifyContent="center" textAlign="center">
        <Grid item md={3}>
          <Typography variant="button">Patient</Typography>
        </Grid>
        <Grid item md={3}>
          <Typography variant="button">Doctor</Typography>
        </Grid>
        <Grid item md={2.5}>
          <Typography variant="button">Arrived at</Typography>
        </Grid>
        <Grid item md={3.5}>
          <Typography variant="button">Actions</Typography>
        </Grid>
      </Grid>
    </Toolbar>
  );
}
