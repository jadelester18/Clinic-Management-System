import { Box, Grid, Stack } from "@mui/material";
import React from "react";
import NurseLeftBar from "../../../components/nurse/ViewAppointment/leftbar/NurseLeftBar";
import NurseRightBar from "../../../components/nurse/ViewAppointment/righbar/NurseRightBar";
import NurseContentBottom from "../../../components/nurse/ViewAppointment/content/NurseContentBottom";
import NurseQueue from "../../../components/nurse/ViewAppointment/content/Queue/NurseQueue";

function NurseViewAppointmentQueue() {
  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12} lg={4}>
              <NurseLeftBar />
            </Grid>
            <Grid item xs={12} lg={8}>
              <NurseRightBar />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <NurseContentBottom />
        </Grid>
        <Grid item xs={12}>
          <NurseQueue />
        </Grid>
      </Grid>
    </Box>
  );
}

export default NurseViewAppointmentQueue;
