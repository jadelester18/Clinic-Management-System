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
import QueueScheduled from "./Scheduled/QueueScheduled";
import ApprovedAppointment from "../AppointmentList/ApprovedAppointment";

const NurseContentBottom = () => {
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
      <Card sx={{ borderRadius: 10 }} elevation={3}>
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
        {procedureType === "Queue" && (
          <CardContent>
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
          </CardContent>
        )}
        {procedureType === "Appointment" && (
          <ApprovedAppointment
            handleClickOpenViewPatientProfile={
              handleClickOpenViewPatientProfile
            }
            handleClickOpenCreateAppointment={handleClickOpenCreateAppointment}
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
              <QueueScheduled
                handleClickOpenViewPatientProfile={
                  handleClickOpenViewPatientProfile
                }
                handleClickOpenCreateAppointment={
                  handleClickOpenCreateAppointment
                }
              />
            )}
            {menuData === "ONGOING ASSESSMENT" && (
              <QueueScheduled
                handleClickOpenViewPatientProfile={
                  handleClickOpenViewPatientProfile
                }
                handleClickOpenCreateAppointment={
                  handleClickOpenCreateAppointment
                }
              />
            )}
            {menuData === "FOR CONSULTATION" && (
              <QueueScheduled
                handleClickOpenViewPatientProfile={
                  handleClickOpenViewPatientProfile
                }
                handleClickOpenCreateAppointment={
                  handleClickOpenCreateAppointment
                }
              />
            )}
            {menuData === "ONGOING CONSULTATION" && (
              <QueueScheduled
                handleClickOpenViewPatientProfile={
                  handleClickOpenViewPatientProfile
                }
                handleClickOpenCreateAppointment={
                  handleClickOpenCreateAppointment
                }
              />
            )}
            {menuData === "FINISHED" && (
              <QueueScheduled
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
      </Card>
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
