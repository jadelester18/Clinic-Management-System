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
import DoctorRow from "./DoctorSearchStep/DoctorRow";
import PatientRow from "./PatientSearchStep/PatientRow";
import PatientHeader from "./PatientSearchStep/PatientHeader";
import DoctorHeader from "./DoctorSearchStep/DoctorHeader";

const SetUpWalkInPatient = ({ open, onClose, date, onSubmit }) => {
  const steps = ["Search Patient", "Search Doctor", "Summary"];
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});
  const [form, setForm] = useState({
    patient: null,
    doctor: null,
  });
  console.log("form", form);

  const handleSelect = (value, origin) => {
    switch (origin) {
      case "patient":
        setForm({ ...form, patient: value });
        break;
      case "doctor":
        setForm({ ...form, doctor: value });
        break;
      default:
        throw new Error("Invalid input");
    }
  };

  const handleSubmit = () => {
    onSubmit(form.patient.id, form.doctor.id);
    onClose();
  };

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
    <Dialog open={open} onClose={onClose} maxWidth="xl">
      <DialogTitle>Walk-in Patient</DialogTitle>
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
              <PatientSearchStep
                selected={form.patient}
                onSelect={(patient) => handleSelect(patient, "patient")}
              />
              <CreatingNewWalkIn patient={form.patient} />
            </Grid>
          )}

          {activeStep === 1 && (
            <Grid item xs={12}>
              <DoctorSearchStep
                date={date}
                selected={form.doctor}
                onSelect={(doctor) => handleSelect(doctor, "doctor")}
              />
            </Grid>
          )}

          {activeStep === 2 && (
            <Grid item xs={12}>
              <List>
                <Divider textAlign="center">PATIENT</Divider>
                <PatientHeader />
                <PatientRow patient={form.patient} onSelect={() => {}} />
                <Divider textAlign="center">DOCTOR</Divider>
                <DoctorHeader />
                <DoctorRow
                  date={date}
                  doctor={form.doctor}
                  onSelect={() => {}}
                />
              </List>
            </Grid>
          )}
        </Grid>
        {/* Creating Patient Form */}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
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
          <Button onClick={handleSubmit} variant="contained">
            Submit
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default SetUpWalkInPatient;
