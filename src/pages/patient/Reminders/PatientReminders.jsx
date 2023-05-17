import { Box, Grid, Stack } from "@mui/material";
import React from "react";
import ViewListOfDoctors from "../../../components/patient/appointment/ViewAllDoctors/ViewListOfDoctors";

const PatientReminders = () => {
  return (
    <Box p={2}>
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
              spacing={2}
            >
              <Grid xs={12}>
                <ViewListOfDoctors />
              </Grid>
            </Stack>
          </Grid>
          {/* <Grid xs={12}>
            <DoctorContentBottom />
          </Grid> */}
        </Grid>
      </Stack>
    </Box>
  );
};

export default PatientReminders;
