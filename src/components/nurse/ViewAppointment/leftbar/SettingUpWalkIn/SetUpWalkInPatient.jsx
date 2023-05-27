import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Step,
  StepButton,
  Stepper,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import React, { useState } from "react";
import {
  countries,
  provinces,
  cities,
} from "../../../../../pages/addressDb/adress";
import CreatingNewWalkIn from "./SetFormForWalkIn/CreatingNewWalkIn";
import PatientSearchStep from "./PatientSearchStep/PatientSearchStep";
import DoctorSearchStep from "./DoctorSearchStep/DoctorSearchStep";
import { ArrowBack, ArrowForward } from "@mui/icons-material";

const SetUpWalkInPatient = ({
  openCreateAppointment,
  handleCloseCreateAppointment,
}) => {
  const steps = ["Search Patient", "Search Doctor", "Summary"];
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  return (
    <Dialog
      open={openCreateAppointment}
      onClose={handleCloseCreateAppointment}
      maxWidth="xl"
    >
      <DialogTitle>New Appointment For Walk In</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <DialogContentText>
              Walk-in registration must be correct, and all information supplied
              by the patient must be true.
            </DialogContentText>
          </Grid>
          <Grid item xs={12}>
            <Stepper nonLinear activeStep={activeStep}>
              {steps.map((label, index) => (
                <Step key={label} completed={completed[index]}>
                  <StepButton color="inherit" onClick={handleStep(index)}>
                    {label}
                  </StepButton>
                </Step>
              ))}
            </Stepper>
          </Grid>

          {activeStep === 0 && (
            <Grid item xs={12}>
              <PatientSearchStep />
            </Grid>
          )}

          {activeStep === 1 && (
            <Grid item xs={12}>
              <DoctorSearchStep />
            </Grid>
          )}

          {activeStep === 2 && (
            <Grid item xs={12}>
              <List>
                <ListItem>Patient:</ListItem>
                <ListItem>Doctor:</ListItem>
              </List>
            </Grid>
          )}
        </Grid>
        {/* Creating Patient Form */}
        <CreatingNewWalkIn />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseCreateAppointment}>Cancel</Button>
        <div style={{ flexGrow: 1 }} />
        {activeStep !== 0 && (
          <Button
            color="inherit"
            onClick={handleBack}
            startIcon={<ArrowBack />}
          >
            Back
          </Button>
        )}
        {activeStep !== steps.length - 1 && (
          <Button
            color="inherit"
            onClick={handleNext}
            endIcon={<ArrowForward />}
          >
            Next
          </Button>
        )}
        {activeStep === steps.length - 1 && (
          <Button onClick={handleCloseCreateAppointment} variant="contained">
            Submit
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default SetUpWalkInPatient;
