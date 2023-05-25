import { Box, Grid, Stack } from "@mui/material";
import React from "react";
import NurseLeftBar from "../../../components/nurse/ViewNewAppointment/leftbar/NurseLeftBar";
import NurseRightBar from "../../../components/nurse/ViewNewAppointment/righbar/NurseRightBar";

function NurseViewNewAppointment() {
  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12} lg={4}>
          <NurseLeftBar />
        </Grid>
        <Grid item xs={12} lg={8}>
          <NurseRightBar />
        </Grid>
      </Grid>
    </Box>
  );
}

export default NurseViewNewAppointment;
