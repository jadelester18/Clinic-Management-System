import { Grid, Toolbar, Typography } from "@mui/material";
import React from "react";

export default function PatientHeader() {
  const styles = {
    gContainer: {
      spacing: 1,
      justifyContent: "center",
      alignItems: "stretch",
      textAlign: "center",
    },
    gItem: {
      xs: 12,
      md: 4,
    },
    stack: {
      height: "100%",
      justifyContent: "center",
      alignItems: "center",
    },
  };
  return (
    <Toolbar sx={{ display: { xs: "none", md: "grid" } }}>
      <Grid container {...styles.gContainer}>
        <Grid item {...styles.gItem}>
          <Typography variant="button">PERSONAL INFORMATION</Typography>
        </Grid>
        <Grid item {...styles.gItem}>
          <Typography variant="button">CONTACT INFORMATION</Typography>
        </Grid>
        <Grid item {...styles.gItem}>
          <Typography variant="button">ADDRESS</Typography>
        </Grid>
      </Grid>
    </Toolbar>
  );
}
