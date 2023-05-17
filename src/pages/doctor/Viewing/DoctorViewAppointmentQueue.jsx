import { Box, Grid, Stack } from "@mui/material";
import React from "react";
import DoctorLeftBar from "../../../components/doctor/ViewAppointment/leftbar/DoctorLeftBar";
import DoctorRightBar from "../../../components/doctor/ViewAppointment/righbar/DoctorRightBar";
import DoctorContentBottom from "../../../components/doctor/ViewAppointment/content/DoctorContentBottom";

function DoctorViewAppointmentQueue() {
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
                <DoctorLeftBar />
              </Grid>
              <Grid lg={9}>
                <DoctorRightBar />
              </Grid>
            </Stack>
          </Grid>
          <Grid xs={12}>
            <DoctorContentBottom />
          </Grid>
        </Grid>
      </Stack>
    </Box>
  );
}

export default DoctorViewAppointmentQueue;
