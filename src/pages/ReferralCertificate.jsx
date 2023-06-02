import {
  Box,
  Divider,
  Grid,
  List,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import React from "react";

const ReferralCertificate = ({ componentRefReferralCertificate }) => {
  return (
    <Box>
      <Box
        className="actual-content"
        sx={{ width: "50%", height: "100vh" }}
        component={Paper}
        ml={"25%"}
        mt={5}
      >
        <Box ref={componentRefReferralCertificate}>
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
          </Box>
          <Box ml={10} mr={10}>
            <Divider
              variant="middle"
              sx={{ borderBottomWidth: 5, border: "1px solid black" }}
            />
          </Box>
          <Box mt={2} ml={15} mr={10}>
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
          </Box>
          <Box mt={2} ml={10} mr={10}>
            <Divider
              variant="middle"
              sx={{ borderBottomWidth: 5, border: "1px solid black" }}
            />
          </Box>
          <Box mt={5} ml={10} mr={10}>
            <Grid container spacing={2} mt={5}>
              <Grid item xs={12}>
                <Grid item xs={12}>
                  <Typography variant="h6">Diagnostic Procedure(s):</Typography>
                </Grid>
                <Grid item xs={12}>
                  <List>
                    <ListItemText variant="subtitle2">
                      ◉ RT-PCR Nasopharyngeal Swab
                    </ListItemText>
                    <ListItemText variant="subtitle2">◉ X-ray</ListItemText>
                    <ListItemText variant="subtitle2">◉ CBC</ListItemText>
                  </List>
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

export default ReferralCertificate;
