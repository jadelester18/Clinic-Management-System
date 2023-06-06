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
      <Grid container spacing={2} justifyContent={"center"}>
        <Grid item xs={12} lg={3}>
          <PatientLeftBar currentPatient={currentPatient} />
        </Grid>
        <Grid item xs={12} lg={9}>
          <PatientRightBar currentPatient={currentPatient} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default PatientDashboard;
