import { Box, Button, Divider, Grid, Paper, Typography } from "@mui/material";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import React, { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";

const MedicalCertificate = ({ componentRefMedicalCertificate }) => {
  return (
    <Box>
      <Box
        className="actual-content"
        sx={{ width: "50%", height: "100vh" }}
        component={Paper}
        ml={"25%"}
        mt={5}
      >
        <Box ref={componentRefMedicalCertificate}>
          <Box ml={10} mr={10}>
            <Grid container spacing={2}>
              <Grid item xs={12} textAlign={"center"}>
                <Typography variant="h4" sx={{ fontWeight: 1000 }}>
                  GRAND BUDAPEST CLINIC
                </Typography>

                <Typography variant="body1" sx={{ fontWeight: 400 }}>
                  Ortigas, Pasig City
                </Typography>
                <Typography variant="subtitle2" sx={{ fontWeight: 500 }}>
                  Contact: +639123456789 Email: example@gmail.com
                </Typography>
              </Grid>
            </Grid>
            <Divider
              variant="middle"
              sx={{ borderBottomWidth: 5, border: "1px solid black" }}
            />
          </Box>

          <Box mt={5} ml={15} mr={10}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography>Patient:</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>Address:</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>Date:</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>Age/Sex:</Typography>
              </Grid>
            </Grid>
            <Grid container spacing={2} mt={5}>
              <Grid item xs={2}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="100"
                  height="100"
                  fill="none"
                  viewBox="0 0 48 48"
                  id="rx"
                >
                  <path
                    fill="#333"
                    fill-rule="evenodd"
                    d="M24 6C14.0589 6 6 14.0589 6 24C6 33.9411 14.0589 42 24 42C33.9411 42 42 33.9411 42 24C42 14.0589 33.9411 6 24 6ZM4 24C4 12.9543 12.9543 4 24 4C35.0457 4 44 12.9543 44 24C44 35.0457 35.0457 44 24 44C12.9543 44 4 35.0457 4 24ZM16 30V14C16 13.4477 16.4477 13 17 13H23C25.7614 13 28 15.2386 28 18C28 20.6273 25.9736 22.7813 23.3984 22.9844L28 27.5859L32.2929 23.293L33.7072 24.7072L29.4142 29.0001L33.7071 33.293L32.2928 34.7072L28 30.4143L23.7072 34.7072L22.2929 33.293L26.5858 29.0001L20.5857 23H18V30H16ZM18 21H23C24.6569 21 26 19.6569 26 18C26 16.3431 24.6569 15 23 15H18V21Z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </Grid>
              <Grid item xs={10}>
                <Grid item xs={12}>
                  <Typography variant="body2">
                    This is to certify that [Patient Name] has been examined and
                    diagnosed with [Medical Condition] on [Date].
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2">
                    The patient is advised to take [Medication/Treatment] and
                    follow the prescribed They are also advised to refrain from
                    [Activities to Avoid] until further notice.
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2">
                    This certificate is issued for the purpose of{" "}
                    <ypography sx={{ fontWeight: 500 }}>
                      [Reason for Certificate]
                    </ypography>
                    .
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid container mt={10}>
              <Grid item xs={6}></Grid>
              <Grid item xs={6}>
                <Typography
                  variant="body1"
                  sx={{ fontWeight: 1000, textDecoration: "underline" }}
                  textAlign={"center"}
                >
                  LEIRA JIM V. TANGIAN, M.D.
                </Typography>

                <Typography variant="subtitle2" textAlign={"center"}>
                  Doctor
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default MedicalCertificate;
