import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  FormControlLabel,
  FormLabel,
  Grid,
  List,
  RadioGroup,
  Stack,
  Step,
  StepButton,
  Stepper,
} from "@mui/material";
import React, { useState } from "react";
import CreatingNewWalkIn from "./SetFormForWalkIn/CreatingNewWalkIn";
import PatientSearchStep from "./PatientSearchStep/PatientSearchStep";
import DoctorSearchStep from "./DoctorSearchStep/DoctorSearchStep";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import DoctorRow from "./DoctorSearchStep/DoctorRow";
import PatientRow from "./PatientSearchStep/PatientRow";
import PatientHeader from "./PatientSearchStep/PatientHeader";
import DoctorHeader from "./DoctorSearchStep/DoctorHeader";
import {
  DEFAULT_DATE_FORMAT,
  DISPLAY_DATE_FORMAT,
} from "../../../../../redux/default";
import { FormControl } from "@mui/base";
import SelectPatientType from "./SelectPatientType";
import {
  cities,
  countries,
  provinces,
} from "../../../../../pages/addressDb/adress";
import dayjs from "dayjs";
import * as patientSvc from "../../../../../redux/GetApiCalls/patient";

const DEFAULT_FORM = {
  honorific: "",
  firstName: "",
  lastName: "",
  suffixName: "",
  birthDate: null,
  gender: "",
  contactNo: "",
  email: "",
  country: null,
  province: null,
  city: null,
  barangay: "",
  street: "",
  postalCode: "",
};

const SetUpWalkInPatient = ({ open, onClose, date, onSubmit }) => {
  const steps = ["Search Patient", "Search Doctor", "Summary"];
  const [activeStep, setActiveStep] = React.useState(0);
  console.log("activestep", activeStep);
  const [completed, setCompleted] = React.useState({});
  const [form, setForm] = useState({
    patientType: "EXISTING",
    patient: null,
    doctor: null,
  });

  const [patientForm, setPatientForm] = useState(DEFAULT_FORM);

  const fillUpPatientForm = (patient) => {
    const countryForAddress = countries.find(
      (country) => country.label === patient.address?.country
    );
    const province = provinces.find(
      (province) => province.name === patient.address.province
    );

    const filteredCities = cities.filter(
      (city) => city.province_code === province.id
    );
    const city = filteredCities.find(
      (city) => city.name === patient.address.city
    );
    setPatientForm({
      ...patient,
      ...patient.address,
      birthDate: dayjs(patient.birthDate),
      country: countryForAddress,
      province: province,
      city: city,
    });
  };

  const handleSelect = (value, origin) => {
    switch (origin) {
      case "patient":
        {
          setForm({ ...form, patient: value });
          if (value) {
            fillUpPatientForm(value);
          } else {
            setPatientForm(DEFAULT_FORM);
          }
        }
        break;
      case "doctor":
        setForm({ ...form, doctor: value });
        break;
      case "patientType":
        setForm({ ...form, patientType: value });
        break;
      default:
        throw new Error("Invalid input");
    }
  };

  const handleSubmit = async () => {
    if (form.patientType === "EXISTING") {
      onSubmit(form.patient.id, form.doctor.id);
    } else {
      const newPatient = await registerPatient();
      console.log("newPatient in handleSubmit", newPatient);
      if (newPatient) {
        onSubmit(newPatient.id, form.doctor.id);
      }
    }
    onClose();
  };

  const registerPatient = async () => {
    try {
      const createPatientDto = convertFormToDto(patientForm);
      const { data } = await patientSvc.createPatient(createPatientDto);
      console.log("new patient", data);
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const convertFormToDto = (form) => {
    return {
      honorific: form.honorific,
      firstName: form.firstName,
      middleName: form.middleName,
      lastName: form.lastName,
      suffixName: form.suffixName,
      gender: form.gender,
      birthDate: form.birthDate.format(DEFAULT_DATE_FORMAT),
      contactNo: form.contactNo,
      street: form.street,
      barangay: form.barangay,
      city: form.city.name,
      province: form.province.name,
      country: form.country.label,
      postalCode: form.postalCode,
      email: form.email,
    };
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
      <Stack direction="row" justifyContent="space-between" p={0} m={0}>
        <DialogTitle variant="h5">Walk-in Patient</DialogTitle>
        <DialogTitle variant="h5">
          {date.format(DISPLAY_DATE_FORMAT)}
        </DialogTitle>
      </Stack>
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
              <Box m={1}>
                <SelectPatientType
                  value={form.patientType}
                  onChange={(value) => handleSelect(value, "patientType")}
                />
              </Box>
              {form.patientType === "EXISTING" && (
                <PatientSearchStep
                  selected={form.patient}
                  onSelect={(patient) => handleSelect(patient, "patient")}
                />
              )}
              <CreatingNewWalkIn form={patientForm} setForm={setPatientForm} />
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
                {form.patient && (
                  <>
                    <Divider textAlign="center">PATIENT</Divider>
                    <PatientHeader />
                    <PatientRow
                      selected={form.patient}
                      patient={form.patient}
                      onSelect={() => {}}
                    />
                  </>
                )}

                <Divider textAlign="center">DOCTOR</Divider>
                <DoctorHeader />
                <DoctorRow
                  date={date}
                  selected={form.doctor}
                  doctor={form.doctor}
                  onSelect={() => {}}
                />
              </List>
            </Grid>
          )}
        </Grid>
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
