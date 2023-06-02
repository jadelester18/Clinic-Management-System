import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import HelpIcon from "@mui/icons-material/Help";
import VitalSignsSection from "./VitalSignsSection";
import PatientSection from "./PatientSection";
import LabProceduresSection from "./LabProceduresSection";
import * as util from "../../redux/util";
import ReportSectionHeader from "./ReportSectionHeader";
import { grey } from "@mui/material/colors";
import ConsultationSection from "./ConsultationSection";
import { useSelector } from "react-redux";
import PrescriptionsSection from "./PrescriptionsSection";

const INTEGER_TYPES = ["respiratoryRateBPM", "heartRateBPM"];
const DOUBLE_TYPES = ["temperatureC", "oxygenSaturation"];

export default function Report({ report }) {
  const loginDetails = useSelector((state) => state.user?.user);

  const userIsNurse = loginDetails.user.role === "ROLE_NURSE";
  const userIsDoctor = loginDetails.user.role === "ROLE_DOCTOR";
  const userIsPatient = loginDetails.user.role === "ROLE_PATIENT";
  // let userObject = userLoggedinDetails?.user;
  // let user = userLoggedinDetails?.user?.user;

  const patient = report?.queue.patient;
  const [form, setForm] = useState({
    doctor: null,
    nurse: null,
    consultationType: "",
    chiefComplaint: "",
    medicalHistory: "",
    bloodPressure: "",
    temperatureC: "",
    respiratoryRateBPM: "",
    heartRateBPM: "",
    oxygenSaturation: "",
    diagnosis: "",
    prognosis: "",
    management: "",
    labProcedures: [],
    prescriptions: [
      {
        id: 1,
        formulation: "Paracetamol 500mg",
        signatura: "Take one tablet twice a day for 7 days",
        subscription: 14,
      },
      {
        id: 2,
        formulation: "Amoxicillin 250mg",
        signatura: "Take two capsules three times a day with meals for 2 days",
        subscription: 12,
      },
    ],
  });
  console.log(form);

  function handleTextInput(event) {
    const { name, value } = event.target;
    if (INTEGER_TYPES.some((prop) => prop === name)) {
      const numericValue = value.replace(/[^0-9.-]+/g, "");
      if (numericValue >= 0) {
        setForm({ ...form, [name]: +numericValue });
      }
    } else if (DOUBLE_TYPES.some((prop) => prop === name)) {
      const numericValue = value.replace(/[^0-9.-]+/g, "");
      if (numericValue >= 0) {
        setForm({ ...form, [name]: numericValue });
      }
    } else {
      setForm({ ...form, [name]: value });
    }
  }

  function handleSpecialInput(event, value, origin) {
    switch (origin) {
      case "consultationType":
        {
          setForm({ ...form, consultationType: event.target.value });
        }
        break;
      case "labProcedures":
        {
          const isCurrentlySelected = form.labProcedures.some(
            (procedure) => procedure.id === value.id
          );
          if (isCurrentlySelected) {
            const updated = form.labProcedures.filter(
              (procedure) => procedure.id !== value.id
            );
            setForm({ ...form, labProcedures: updated });
          } else {
            const updated = [...form.labProcedures, value];
            setForm({ ...form, labProcedures: updated });
          }
        }
        break;
      default:
        throw new Error("Invalid input");
    }
  }

  useEffect(() => {
    if (report) {
      const { reportDetails } = report;
      const vitalSigns = reportDetails?.vitalSigns;
      let newForm = {
        ...form,
        ...report,
        doctor: report.doctor,
        nurse: report.nurse || loginDetails.person,
      };
      console.log("adding report to form", newForm);
      if (reportDetails) {
        newForm = {
          ...newForm,
          ...reportDetails,
        };
        console.log("adding reportDetails to form", newForm);
      }
      if (vitalSigns) {
        newForm = { ...newForm, ...vitalSigns };
        console.log("adding vitalSigns to form", newForm);
      }
      setForm(newForm);
    }
  }, [report]);

  return (
    <Card item>
      <CardHeader
        title="Visitation Report"
        subheader={util.date(report?.queue?.date)}
      />
      {/* <CardContent>
        <Grid container>
          <Grid item xs={10}>
            <Typography variant="h6">{steps[activeStep].label}</Typography>
            <Typography>{steps[activeStep].descriptionReport}</Typography>
          </Grid>
          <Grid item>
            <Typography variant="body2">View Recent Reports</Typography>
            <Stack
              direction="row"
              spacing={2}
              sx={{ padding: 1 }}
              boxShadow={10}
              borderRadius={2}
            >
              <Button variant="contained" onClick={handleNext} size="small">
                {activeStep === steps.length - 1 ? "Finish" : "Continue"}
              </Button>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                size="small"
              >
                Back
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </CardContent> */}
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {patient && <PatientSection patient={patient} />}
          </Grid>
          <Grid item xs={12}>
            <ConsultationSection
              form={form}
              onChange={(event) => {
                handleSpecialInput(event, null, "consultationType");
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <ReportSectionHeader
              title="Chief complaint & observed symptoms"
              helpText="A concise statement of the symptoms that caused a patient to seek medical care."
            />
            <Grid item xs={12}>
              <TextField
                value={form.chiefComplaint}
                onChange={handleTextInput}
                size="small"
                name="chiefComplaint"
                label="Remarks"
                fullWidth
                multiline
              />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <VitalSignsSection form={form} onInput={handleTextInput} />
          </Grid>
          <Grid item xs={12}>
            <ReportSectionHeader
              title="Diagnosis"
              helpText="The identified disease, condition, or injury based on signs and symptoms"
            />
            <Grid item xs={12}>
              <TextField
                value={form.diagnosis}
                onChange={handleTextInput}
                size="small"
                name="diagnosis"
                fullWidth
                multiline
              />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <ReportSectionHeader
              title="Prognosis"
              helpText="The likely outcome or course of a disease"
            />
            <Grid item xs={12}>
              <TextField
                value={form.prognosis}
                onChange={handleTextInput}
                size="small"
                name="prognosis"
                fullWidth
                multiline
              />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <ReportSectionHeader
              title="Management"
              helpText="Treatment plan for the condition or disease"
            />
            <Grid
              container
              item
              spacing={1}
              sx={{ border: 1, borderColor: grey[500], borderRadius: 3, p: 2 }}
            >
              <Grid item xs={12}>
                <LabProceduresSection
                  form={form}
                  onChange={handleSpecialInput}
                />
              </Grid>
              <Grid item xs={12}>
                <PrescriptionsSection
                  form={form}
                  onAdd={() => {}}
                  onRemove={() => {}}
                />
              </Grid>
              <Grid item xs={12}>
                <ReportSectionHeader title="Additional remarks" />
                <Grid item xs={12}>
                  <TextField
                    value={form.management}
                    onChange={handleTextInput}
                    size="small"
                    name="management"
                    fullWidth
                    multiline
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sx={{ textAlign: "right" }}>
            <Typography variant="caption">Attending Physician</Typography>
            <Typography variant="body1">{util.name(form.doctor)}</Typography>
          </Grid>
          {/* <Grid item xs={12}>
            <Typography variant="subtitle2">
              Medicines.
              <Tooltip title="This for Medicines cotent.">
                <HelpIcon />
              </Tooltip>
            </Typography>
            {medicines.map((medicine, index) => (
              <Grid container spacing={2} key={index}>
                <Grid item xs={12} md={10}>
                  <TextField
                    size="small"
                    margin="normal"
                    name={`medicine-${index}`}
                    fullWidth
                    label="Medicine"
                    autoComplete="Medicine"
                    value={medicine.name}
                    onChange={(event) =>
                      handleMedicineChange(index, "name", event.target.value)
                    }
                    onClick={() => handleOpenModalMedication(index)}
                    required
                  />
                </Grid>
                <Grid item xs={6} md={2} mt={2}>
                  <Button
                    // size="small"
                    variant="contained"
                    color="secondary"
                    onClick={() => handleRemoveMedicine(index)}
                  >
                    Close
                  </Button>
                </Grid>
              </Grid>
            ))}
            <Button variant="contained" onClick={handleAddMedicine}>
              Add Medicine
            </Button>
          </Grid>
          <Grid item xs={10}></Grid>
          <Grid item>
            <Button variant="standard">Clear</Button>
          </Grid>
          <Grid item>
            <Button variant="contained">Save</Button>
          </Grid> */}
        </Grid>

        {/* {activeStep === steps.length && (
          <Paper square elevation={0} sx={{ p: 3 }}>
            <Typography>All steps completed - you&apos;re finished</Typography>
            <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
              Reset
            </Button>
          </Paper>
        )} */}
      </CardContent>
    </Card>
  );
}
