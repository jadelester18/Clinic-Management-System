import { Box, Grid, Stack } from "@mui/material";
import React from "react";
import NurseLeftBar from "../../../components/nurse/ViewAppointment/leftbar/NurseLeftBar";
import NurseRightBar from "../../../components/nurse/ViewAppointment/righbar/NurseRightBar";
import NurseContentBottom from "../../../components/nurse/ViewAppointment/content/NurseContentBottom";

function NurseViewAppointmentQueue() {
  return (
    <Box>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="center"
        alignItems="center"
        // spacing={2}
      >
        <Grid container spacing={0}>
          <Grid xs={12}>
            <Stack
              direction={{ xs: "column", sm: "column", md: "row" }}
              justifyContent={{ xs: "center", md: "flex-start" }}
              alignItems={{ xs: "center", md: "flex-start" }}
              spacing={1}
            >
              <Grid lg={3}>
                <NurseLeftBar />
              </Grid>
              <Grid lg={9}>
                <NurseRightBar />
              </Grid>
            </Stack>
          </Grid>
          <Grid xs={12}>
            <NurseContentBottom />
          </Grid>
        </Grid>
      </Stack>
    </Box>
  );
}

export default NurseViewAppointmentQueue;
