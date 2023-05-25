import {
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import React, { useEffect, useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDateTimePicker } from "@mui/x-date-pickers";
import axios from "axios";
import NurseAssessment from "./Assessment/NurseAssessment";
import NurseConsultation from "./Consultation/NurseConsultation";

const NurseContentBottom = () => {
  //Fetching the list of IDs
  const [idTypeIdList, setIdTypeIdList] = React.useState([]);

  useEffect(() => {
    const fetchIdTypeIdListData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/id-type`
        );
        setIdTypeIdList(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchIdTypeIdListData();
  }, []);

  //Storing the ID Number, Type, Path
  const [idTypeId, setIdTypeId] = React.useState("");
  const [idNumber, setIdNumber] = React.useState("");
  const [idFileUrl, setIdFileUrl] = React.useState("");

  //For Creating Appointment Modal
  const [openCreateAppointment, setOpenCreateAppointment] =
    React.useState(false);

  const handleClickOpenCreateAppointment = () => {
    setOpenCreateAppointment(true);
  };

  const handleCloseCreateAppointment = () => {
    setOpenCreateAppointment(false);
  };

  //For Creating Appointment Confirmation
  const [openConfirmation, setOpenConfirmation] = React.useState(false);

  const handleClickOpenConfirmation = () => {
    setOpenConfirmation(true);
  };

  const handleClickCloseConfirmation = () => {
    setOpenConfirmation(false);
  };

  //Open view patient profile
  const [openViewPatientProfile, setOpenViewPatientProfile] =
    React.useState(false);

  const handleClickOpenViewPatientProfile = () => {
    setOpenViewPatientProfile(true);
  };

  const handleClickCloseViewPatientProfile = () => {
    setOpenViewPatientProfile(false);
  };

  //For Option Assessment and Consultation List
  const [menuData, setMenuData] = useState("Assessment");
  return (
    <Box
      flex={2}
      p={2}
      sx={{ display: { xs: "block", sm: "block", lg: "block" } }}
    >
      <Card sx={{ height: 440, borderRadius: 10 }} elevation={3}>
        <CardContent>
          <Stack direction="row" spacing={2}>
            <Typography>Type :</Typography>
            <Button
              variant="outlined"
              onClick={() => setMenuData("Consultation")}
              sx={{ borderRadius: 10 }}
            >
              Queue
            </Button>
            <Button
              variant="outlined"
              onClick={() => setMenuData("Consultation")}
              sx={{ borderRadius: 10 }}
            >
              Appointment
            </Button>
            </Stack>
        </CardContent>
        <CardContent>
          <Stack direction="row" spacing={2}>
            <Button
              variant="outlined"
              onClick={() => setMenuData("Consultation")}
              sx={{ borderRadius: 10 }}
            >
              SCHEDULED
            </Button>
            <Button
              variant="outlined"
              onClick={() => setMenuData("Consultation")}
              sx={{ borderRadius: 10 }}
            >
              FOR ASSESSMENT
            </Button>
            <Button
              variant="outlined"
              onClick={() => setMenuData("Assessment")}
              sx={{ borderRadius: 10 }}
            >
              ONGOING ASSESSMENT
            </Button>
            <Button
              variant="outlined"
              onClick={() => setMenuData("Assessment")}
              sx={{ borderRadius: 10 }}
            >
              FOR CONSULTATION
            </Button>
            <Button
              variant="outlined"
              onClick={() => setMenuData("Consultation")}
              sx={{ borderRadius: 10 }}
            >
              ONGOING CONSULTATION
            </Button>
            <Button
              variant="outlined"
              onClick={() => setMenuData("Consultation")}
              sx={{ borderRadius: 10 }}
            >
              FINISHED
            </Button>
          </Stack>
          {menuData === "Assessment" && (
            <NurseAssessment
              handleClickOpenViewPatientProfile={
                handleClickOpenViewPatientProfile
              }
              handleClickOpenCreateAppointment={
                handleClickOpenCreateAppointment
              }
            />
          )}
          {menuData === "Consultation" && (
            <NurseConsultation
              handleClickOpenViewPatientProfile={
                handleClickOpenViewPatientProfile
              }
              handleClickOpenCreateAppointment={
                handleClickOpenCreateAppointment
              }
            />
          )}
        </CardContent>
      </Card>

      {/* Updating appointment */}
      {/* For Creating New Appointment For Walk In */}
      <Dialog
        open={openCreateAppointment}
        onClose={handleCloseCreateAppointment}
      >
        <DialogTitle>Patient Name Here</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <DialogContentText>
                Updating Appointment must be correct, and all information
                supplied must be true.
              </DialogContentText>
            </Grid>
          </Grid>
          <Grid
            container
            spacing={2}
            mt={2}
            direction={{ xs: "column", sm: "row" }}
          >
            <Grid item xs={12}>
              <Grid
                container
                direction="row"
                justifyContent="space-evenly"
                alignItems="center"
                spacing={2}
              >
                <Grid item xs={12}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <StaticDateTimePicker
                      orientation="landscape"
                      slotProps={{
                        actionBar: { actions: [] },
                      }}
                    />
                  </LocalizationProvider>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid
                container
                direction="row"
                justifyContent="space-evenly"
                alignItems="center"
                spacing={2}
              >
                <Grid item xs={12}>
                  <TextField
                    autoFocus
                    margin="dense"
                    label="Chief Complaint"
                    fullWidth
                    variant="standard"
                    multiline
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    name="idNumber"
                    fullWidth
                    label="Reason of Updating Appointment"
                    autoComplete="idNumber"
                    onChange={(e) => setIdNumber(e.target.value)}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCreateAppointment}>Cancel</Button>
          <Button onClick={handleClickOpenConfirmation}>Save</Button>
        </DialogActions>
      </Dialog>
      {/* Cofirmation in saving update of appointment */}
      <Dialog
        open={openConfirmation}
        onClose={handleClickCloseConfirmation}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to update this appointment?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This will reflect to that date.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickCloseConfirmation}>Disagree</Button>
          <Button
            onClick={() => {
              handleCloseCreateAppointment();
              handleClickCloseConfirmation();
            }}
            autoFocus
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
      {/* Checking profile of the patient with history */}
      <Dialog
        open={openViewPatientProfile}
        onClose={handleClickCloseViewPatientProfile}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth={"lg"}
        fullWidth={true}
      >
        <DialogTitle id="alert-dialog-title">{"Patient Name Here"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Patient Records
          </DialogContentText>
        </DialogContent>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="subtitle2">Old Records :</Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Button variant="contained" fullWidth>
                      Report Title
                    </Button>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Button variant="contained" fullWidth>
                      Report Title
                    </Button>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Button variant="contained" fullWidth>
                      Report Title
                    </Button>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Button variant="contained" fullWidth>
                      Report Title
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={8}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="subtitle2">
                      Paient Information :
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      id="outlined-basic"
                      label="First Name"
                      variant="outlined"
                      fullWidth
                      disabled
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      id="outlined-basic"
                      label="Middle Name"
                      variant="outlined"
                      fullWidth
                      disabled
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      id="outlined-basic"
                      label="Last Name"
                      variant="outlined"
                      fullWidth
                      disabled
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="outlined-basic"
                      label="Address"
                      variant="outlined"
                      fullWidth
                      disabled
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      id="outlined-basic"
                      label="HMO Covered"
                      variant="outlined"
                      fullWidth
                      disabled
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      id="outlined-basic"
                      label="Contact Number"
                      variant="outlined"
                      fullWidth
                      disabled
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      id="outlined-basic"
                      label="Email"
                      variant="outlined"
                      fullWidth
                      disabled
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      id="outlined-basic"
                      label="Patient ID Type"
                      variant="outlined"
                      fullWidth
                      disabled
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      id="outlined-basic"
                      label="Patient ID Number"
                      variant="outlined"
                      fullWidth
                      disabled
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClickCloseViewPatientProfile}
            variant="contained"
          >
            Close
          </Button>
          {/* <Button
            onClick={() => {
              handleClickCloseViewPatientProfile();
            }}
            autoFocus
          >
            Agree
          </Button> */}
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default NurseContentBottom;
