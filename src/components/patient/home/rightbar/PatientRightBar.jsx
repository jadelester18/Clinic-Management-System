import { Box, Grid, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import PatientMedication from "./medication/PatientMedication";
import LabReports from "./reports/LabReports";
import PatientCompilation from "./activities/PatientCompilation";
import { useSelector } from "react-redux";
import axios from "axios";

//Getting the current date
const currentDate = new Date().toLocaleString("en-US", {
  weekday: "long",
  month: "short",
  day: "numeric",
  year: "numeric",
});

const formattedDate = currentDate.replace(",", " |");
// console.log(formattedDate); // Output: "Monday | May 15, 2023"

//Current Time
const currentTime = new Date().toLocaleTimeString("en-US", {
  hour: "numeric",
  minute: "numeric",
  hour12: true,
});
// console.log(currentTime); // Output: "4:26 PM"

const PatientRightBar = () => {
  const userLoggedinDetails = useSelector((state) => state.user);
  let userObject = userLoggedinDetails?.user;
  let user = userLoggedinDetails?.user?.user;
  let accesstoken = userObject?.token;

  //Get the user post
  const [userPatientDetails, setUserPatientDetails] = useState();
  console.log(userPatientDetails);

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/v1/patients/me`,
          {
            headers: {
              Authorization: `Bearer ${accesstoken}`, // Use the 'Authorization' header
            },
          }
        );
        setUserPatientDetails(res.data);
        console.log(res.data); // Log the response data
      } catch (error) {
        console.log("Post details have an issue.");
      }
    };
    getUserDetails();
  }, []);

  return (
    <Box>
      <Grid container spacing={0}>
        <Grid xs={12}>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            justifyContent={{ xs: "center", md: "flex-start" }}
            alignItems={{ xs: "center", md: "flex-start" }}
            spacing={2}
          >
            <Grid item lg={8}>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                justifyContent={{ xs: "center", md: "flex-start" }}
                alignItems={{ xs: "center", md: "flex-start" }}
                spacing={2}
              >
                <Grid item lg={6}>
                  <Typography variant="h3">
                    Hello, {userPatientDetails?.firstName}!
                  </Typography>
                  <Typography variant="h6" color="text.secondary">
                    How are you feeling today?
                  </Typography>
                </Grid>
                <Grid item lg={6} textAlign={"right"}>
                  <Typography variant="h6">{formattedDate}</Typography>
                  <Typography variant="h3" color="text.secondary">
                    {currentTime}
                  </Typography>
                </Grid>
              </Stack>
              <Stack
                direction={{ xs: "column", lg: "row" }}
                justifyContent={{ xs: "center", md: "flex-start" }}
                alignItems={{ xs: "center", md: "flex-start" }}
                spacing={2}
                mt={4}
              >
                <Grid item lg={5}>
                  <PatientMedication />
                </Grid>
                <Grid item lg={7}>
                  <PatientCompilation />
                </Grid>
              </Stack>
            </Grid>
            <Grid item lg={4}>
              <LabReports />
            </Grid>
          </Stack>
        </Grid>
        {/* <Grid xs={12}>
            <DoctorContentBottom />
          </Grid> */}
      </Grid>
    </Box>
  );
};

export default PatientRightBar;
