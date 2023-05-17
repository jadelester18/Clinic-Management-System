import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import DoctorsCardInfo from "./doctorsCard/DoctorsCardInfo";

const ViewListOfDoctors = () => {
  //For HMO Accredted
  const [HMOAccredited, setHMOAccredited] = React.useState("");

  const handleChangeHMOAccredited = (event) => {
    setHMOAccredited(event.target.value);
  };

  //For Specialization
  const [specialization, setSpecialization] = React.useState("");

  const handleChangeSpecialization = (event) => {
    setSpecialization(event.target.value);
  };

  //For Location
  const [location, setLocation] = React.useState("");

  const handleChangeLocation = (event) => {
    setLocation(event.target.value);
  };

  //Checking if screen is extra small
  const isMdScreen = useMediaQuery((theme) => theme.breakpoints.up("sm"));

  return (
    <Box>
      <Card>
        <CardContent>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={3} sm={3} md={3} lg={1.5}>
              <Button variant="contained" size="medium">
                {isMdScreen ? "Monday" : "Mon"}
              </Button>
            </Grid>
            <Grid item xs={3} sm={3} md={3} lg={1.5}>
              <Button variant="contained" size="medium">
                {isMdScreen ? "Tuesday" : "Tue"}
              </Button>
            </Grid>
            <Grid item xs={3} sm={3} md={3} lg={1.5}>
              <Button variant="contained" size="medium">
                {isMdScreen ? "Wednesday" : "Wed"}
              </Button>
            </Grid>
            <Grid item xs={3} sm={3} md={3} lg={1.5}>
              <Button variant="contained" size="medium">
                {isMdScreen ? "Thursday" : "Thu"}
              </Button>
            </Grid>
            <Grid item xs={3} sm={3} md={3} lg={1.5}>
              <Button variant="contained" size="medium">
                {isMdScreen ? "Friday" : "Fri"}
              </Button>
            </Grid>
            <Grid item xs={3} sm={3} md={3} lg={1.5}>
              <Button variant="contained" size="medium">
                {isMdScreen ? "Saturday" : "Sat"}
              </Button>
            </Grid>
            <Grid item xs={3} sm={3} md={3} lg={1.5}>
              <Button variant="contained" size="medium">
                {isMdScreen ? "Sunday" : "Sun"}
              </Button>
            </Grid>
          </Grid>
          <Grid container spacing={2} mt={2} justifyContent="center">
            <Grid item xs={12} sm={4} md={4} lg={2}>
              <TextField
                id="outlined-basic"
                label="Doctor's Surname"
                variant="outlined"
                size="large"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={4} md={4} lg={2}>
              <TextField
                id="outlined-basic"
                label="Doctor's First Name"
                variant="outlined"
                size="large"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={4} md={4} lg={2}>
              <FormControl fullWidth size="large">
                <InputLabel id="demo-simple-select-label">
                  HMO Accredition
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={HMOAccredited}
                  label="HMO Accredition"
                  onChange={handleChangeHMOAccredited}
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4} md={4} lg={2}>
              <FormControl fullWidth size="large">
                <InputLabel id="demo-simple-select-label">
                  Specialization
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={specialization}
                  label="Specialization"
                  onChange={handleChangeSpecialization}
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={4} md={4} lg={2}>
              <Stack
                direction={{ xs: "row", sm: "row" }}
                justifyContent="center"
                alignItems="center"
                spacing={1}
              >
                <Button variant="outlined" size="large">
                  Clear
                </Button>
                <Button variant="contained" size="large">
                  Search
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      {/* <Card> */}
      {/* <CardContent> */}
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
          <DoctorsCardInfo />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
          <DoctorsCardInfo />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
          <DoctorsCardInfo />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
          <DoctorsCardInfo />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
          <DoctorsCardInfo />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
          <DoctorsCardInfo />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
          <DoctorsCardInfo />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
          <DoctorsCardInfo />
        </Grid>
      </Grid>
      {/* </CardContent> */}
      {/* </Card> */}
    </Box>
  );
};

export default ViewListOfDoctors;
