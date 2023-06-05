import { Box, Divider, Grid, Paper, Typography } from "@mui/material";
import React from "react";

const ClinicForm = ({ certificate, componentRef, children }) => {
  return (
    <Box>
      <Box
        className="actual-content"
        // sx={{ width: "50%", height: "100vh" }}
        sx={{ height: "100vh" }}
        component={Paper}
        // ml={"25%"}
        mt={5}
      >
        <Box ref={componentRef}>
          <Box ml={10} mr={10}>
            <Grid container spacing={2}>
              <Grid item xs={12} textAlign={"center"}>
                <Typography variant="h4" sx={{ fontWeight: 1000 }}>
                  GRAND BUDAPEST CLINIC
                </Typography>

                <Typography variant="body1" sx={{ fontWeight: 400 }}>
                  The Orient Square, Emerald Ave., Brgy. San Antonio, Pasig City
                  1600
                </Typography>
                <Typography variant="subtitle2" sx={{ fontWeight: 500 }}>
                  Contact: (02) 6666-6666 / Email: info@thegbc.com
                </Typography>
              </Grid>
            </Grid>
            <Divider
              variant="middle"
              sx={{ borderBottomWidth: 5, border: "1px solid black" }}
            />
          </Box>
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default ClinicForm;
