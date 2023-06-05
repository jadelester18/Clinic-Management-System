import { Box, Grid, Stack } from "@mui/material";
import React from "react";
import PatientLeftBar from "../../../components/patient/home/leftbar/PatientLeftBar";
import PatientRightBar from "../../../components/patient/home/rightbar/PatientRightBar";
import { useSelector } from "react-redux";

const PatientDashboard = () => {
  const userLoggedinDetails = useSelector((state) => state.user);
  const currentPatient = userLoggedinDetails?.user.person;
  return (
    <Box p={2}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="center"
        alignItems="center"
        // spacing={2}
      >
        <Grid container spacing={0}>
          <Grid xs={12} mt={2}>
            <Stack
              direction={{ xs: "column", sm: "column", md: "row" }}
              justifyContent={{ xs: "center", md: "flex-start" }}
              alignItems={{ xs: "center", md: "flex-start" }}
              spacing={2}
            >
              <Grid item xs={12} lg={3}>
                <PatientLeftBar currentPatient={currentPatient} />
              </Grid>
              <Grid item xs={12} lg={9}>
                <PatientRightBar currentPatient={currentPatient} />
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

export default PatientDashboard;
