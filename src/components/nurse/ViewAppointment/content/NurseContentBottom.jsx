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
  List,
  ListItemButton,
  ListItemText,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import React, { useEffect, useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDateTimePicker } from "@mui/x-date-pickers";
import axios from "axios";
import NurseAssessment from "./Assessment/QueueAssessment";
import NurseConsultation from "./Consultation/QueueConsultation";
import QueueScheduled from "./Scheduled/QueueScheduled";
import QueueForAssessment from "./ForAssessment/QueueForAssessment";
import QueueAssessment from "./Assessment/QueueAssessment";
import QueueForConsultation from "./ForConsultation/QueueForConsultation";
import QueueConsultation from "./Consultation/QueueConsultation";
import QueueFinished from "./Finished/QueueFinished";
import ApprovedAppointment from "../AppointmentList/ApprovedAppointment";

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
  const [procedureType, setProcedureType] = useState("Appointment");

  //For Option Assessment and Consultation List
  const [menuData, setMenuData] = useState("SCHEDULED");
  return (
    <Box flex={2} p={2}>
      <Card sx={{ height: 440, borderRadius: 10 }} elevation={3}>
        <CardContent mt={6}>
          <Grid container spacing={2} ml={4}>
            <Grid item>
              <Typography>Type :</Typography>
            </Grid>
            <Grid item>
              <Button
                variant="outlined"
                onClick={() => setProcedureType("Appointment")}
                sx={{ borderRadius: 10 }}
              >
                Appointment
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="outlined"
                onClick={() => setProcedureType("Queue")}
                sx={{ borderRadius: 10 }}
              >
                Queue
              </Button>
            </Grid>
          </Grid>
        </CardContent>
        <CardContent>
          {procedureType === "Queue" && (
            <Grid container spacing={2} ml={4}>
              <Grid item>
                <Typography>Status :</Typography>
              </Grid>
              <Grid item>
                <Button
                  variant="outlined"
                  onClick={() => setMenuData("SCHEDULED")}
                  sx={{ borderRadius: 10 }}
                  size="small"
                >
                  SCHEDULED
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="outlined"
                  onClick={() => setMenuData("FOR ASSESSMENT")}
                  sx={{ borderRadius: 10 }}
                  size="small"
                >
                  FOR ASSESSMENT
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="outlined"
                  onClick={() => setMenuData("ONGOING ASSESSMENT")}
                  sx={{ borderRadius: 10 }}
                  size="small"
                >
                  ONGOING ASSESSMENT
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="outlined"
                  onClick={() => setMenuData("FOR CONSULTATION")}
                  sx={{ borderRadius: 10 }}
                  size="small"
                >
                  FOR CONSULTATION
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="outlined"
                  onClick={() => setMenuData("ONGOING CONSULTATION")}
                  sx={{ borderRadius: 10 }}
                  size="small"
                >
                  ONGOING CONSULTATION
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="outlined"
                  onClick={() => setMenuData("FINISHED")}
                  sx={{ borderRadius: 10 }}
                  size="small"
                >
                  FINISHED
                </Button>
              </Grid>
            </Grid>
          )}

          {procedureType === "Appointment" && (
            <ApprovedAppointment
              handleClickOpenViewPatientProfile={
                handleClickOpenViewPatientProfile
              }
              handleClickOpenCreateAppointment={
                handleClickOpenCreateAppointment
              }
            />
          )}

          {procedureType === "Queue" && (
            <>
              {menuData === "SCHEDULED" && (
                <QueueScheduled
                  handleClickOpenViewPatientProfile={
                    handleClickOpenViewPatientProfile
                  }
                  handleClickOpenCreateAppointment={
                    handleClickOpenCreateAppointment
                  }
                />
              )}
              {menuData === "FOR ASSESSMENT" && (
                <QueueForAssessment
                  handleClickOpenViewPatientProfile={
                    handleClickOpenViewPatientProfile
                  }
                  handleClickOpenCreateAppointment={
                    handleClickOpenCreateAppointment
                  }
                />
              )}
              {menuData === "ONGOING ASSESSMENT" && (
                <QueueAssessment
                  handleClickOpenViewPatientProfile={
                    handleClickOpenViewPatientProfile
                  }
                  handleClickOpenCreateAppointment={
                    handleClickOpenCreateAppointment
                  }
                />
              )}
              {menuData === "FOR CONSULTATION" && (
                <QueueForConsultation
                  handleClickOpenViewPatientProfile={
                    handleClickOpenViewPatientProfile
                  }
                  handleClickOpenCreateAppointment={
                    handleClickOpenCreateAppointment
                  }
                />
              )}
              {menuData === "ONGOING CONSULTATION" && (
                <QueueConsultation
                  handleClickOpenViewPatientProfile={
                    handleClickOpenViewPatientProfile
                  }
                  handleClickOpenCreateAppointment={
                    handleClickOpenCreateAppointment
                  }
                />
              )}
              {menuData === "FINISHED" && (
                <QueueFinished
                  handleClickOpenViewPatientProfile={
                    handleClickOpenViewPatientProfile
                  }
                  handleClickOpenCreateAppointment={
                    handleClickOpenCreateAppointment
                  }
                />
              )}
            </>
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
              <Grid item xs={12} md={4}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="subtitle2">Old Records :</Typography>
                  </Grid>
                  <List
                    sx={{
                      width: "100%",
                      bgcolor: "background.paper",
                      display: "grid",
                      gridTemplateColumns: "repeat(2, 1fr)",
                      gap: "16px",
                      marginLeft: "15px",
                      height: "25rem",
                      flexDirection: "column",
                      overflowY: "scroll",
                      "&::-webkit-scrollbar": {
                        width: "0em",
                      },
                    }}
                  >
                    <ListItemButton
                      component="a"
                      href="#simple-list"
                      variant="contained"
                      sx={{
                        backgroundColor: "#03a9f4",
                        boxShadow: 6,
                        borderRadius: 3,
                      }}
                    >
                      <ListItemText
                        primary={
                          <Typography variant="h6" fontWeight="bold">
                            Main Title
                          </Typography>
                        }
                        secondary={
                          <Typography variant="subtitle1">Subtitle</Typography>
                        }
                      />
                    </ListItemButton>
                    <ListItemButton
                      component="a"
                      href="#simple-list"
                      variant="contained"
                      sx={{
                        backgroundColor: "#03a9f4",
                        boxShadow: 6,
                        borderRadius: 3,
                      }}
                    >
                      <ListItemText
                        primary={
                          <Typography variant="h6" fontWeight="bold">
                            Main Title
                          </Typography>
                        }
                        secondary={
                          <Typography variant="subtitle1">Subtitle</Typography>
                        }
                      />
                    </ListItemButton>
                    <ListItemButton
                      component="a"
                      href="#simple-list"
                      variant="contained"
                      sx={{
                        backgroundColor: "#03a9f4",
                        boxShadow: 6,
                        borderRadius: 3,
                      }}
                    >
                      <ListItemText
                        primary={
                          <Typography variant="h6" fontWeight="bold">
                            Main Title
                          </Typography>
                        }
                        secondary={
                          <Typography variant="subtitle1">Subtitle</Typography>
                        }
                      />
                    </ListItemButton>
                    <ListItemButton
                      component="a"
                      href="#simple-list"
                      variant="contained"
                      sx={{
                        backgroundColor: "#03a9f4",
                        boxShadow: 6,
                        borderRadius: 3,
                      }}
                    >
                      <ListItemText
                        primary={
                          <Typography variant="h6" fontWeight="bold">
                            Main Title
                          </Typography>
                        }
                        secondary={
                          <Typography variant="subtitle1">Subtitle</Typography>
                        }
                      />
                    </ListItemButton>
                    <ListItemButton
                      component="a"
                      href="#simple-list"
                      variant="contained"
                      sx={{
                        backgroundColor: "#03a9f4",
                        boxShadow: 6,
                        borderRadius: 3,
                      }}
                    >
                      <ListItemText
                        primary={
                          <Typography variant="h6" fontWeight="bold">
                            Main Title
                          </Typography>
                        }
                        secondary={
                          <Typography variant="subtitle1">Subtitle</Typography>
                        }
                      />
                    </ListItemButton>
                    <ListItemButton
                      component="a"
                      href="#simple-list"
                      variant="contained"
                      sx={{
                        backgroundColor: "#03a9f4",
                        boxShadow: 6,
                        borderRadius: 3,
                      }}
                    >
                      <ListItemText
                        primary={
                          <Typography variant="h6" fontWeight="bold">
                            Main Title
                          </Typography>
                        }
                        secondary={
                          <Typography variant="subtitle1">Subtitle</Typography>
                        }
                      />
                    </ListItemButton>
                    <ListItemButton
                      component="a"
                      href="#simple-list"
                      variant="contained"
                      sx={{
                        backgroundColor: "#03a9f4",
                        boxShadow: 6,
                        borderRadius: 3,
                      }}
                    >
                      <ListItemText
                        primary={
                          <Typography variant="h6" fontWeight="bold">
                            Main Title
                          </Typography>
                        }
                        secondary={
                          <Typography variant="subtitle1">Subtitle</Typography>
                        }
                      />
                    </ListItemButton>
                    <ListItemButton
                      component="a"
                      href="#simple-list"
                      variant="contained"
                      sx={{
                        backgroundColor: "#03a9f4",
                        boxShadow: 6,
                        borderRadius: 3,
                      }}
                    >
                      <ListItemText
                        primary={
                          <Typography variant="h6" fontWeight="bold">
                            Main Title
                          </Typography>
                        }
                        secondary={
                          <Typography variant="subtitle1">Subtitle</Typography>
                        }
                      />
                    </ListItemButton>
                    <ListItemButton
                      component="a"
                      href="#simple-list"
                      variant="contained"
                      sx={{
                        backgroundColor: "#03a9f4",
                        boxShadow: 6,
                        borderRadius: 3,
                      }}
                    >
                      <ListItemText
                        primary={
                          <Typography variant="h6" fontWeight="bold">
                            Main Title
                          </Typography>
                        }
                        secondary={
                          <Typography variant="subtitle1">Subtitle</Typography>
                        }
                      />
                    </ListItemButton>
                    <ListItemButton
                      component="a"
                      href="#simple-list"
                      variant="contained"
                      sx={{
                        backgroundColor: "#03a9f4",
                        boxShadow: 6,
                        borderRadius: 3,
                      }}
                    >
                      <ListItemText
                        primary={
                          <Typography variant="h6" fontWeight="bold">
                            Main Title
                          </Typography>
                        }
                        secondary={
                          <Typography variant="subtitle1">Subtitle</Typography>
                        }
                      />
                    </ListItemButton>
                  </List>
                </Grid>
              </Grid>
              <Grid item xs={12} md={8}>
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
