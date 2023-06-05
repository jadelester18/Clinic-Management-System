import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import VitalSignsSection from "./VitalSignsSection";
import PatientSection from "./PatientSection";
import LabProceduresSection from "./LabProceduresSection";
import * as util from "../../redux/util";
import ReportSectionHeader from "./ReportSectionHeader";
import { grey } from "@mui/material/colors";
import ConsultationSection from "./ConsultationSection";
import { useSelector } from "react-redux";
import PrescriptionsSection from "./PrescriptionsSection";
import ClinicForm from "../general/ClinicForm";
import PrescriptionForm from "../general/PrescriptionForm";
import { useReactToPrint } from "react-to-print";
import { ReferralForm } from "../general/ReferralForm";

const INTEGER_TYPES = ["respiratoryRateBPM", "heartRateBPM"];
const DOUBLE_TYPES = ["temperatureC", "oxygenSaturation"];

export default function Report({ report, onSave, onViewMc, onViewReferral }) {
  const loginDetails = useSelector((state) => state.user?.user);

  const userIsNurse = loginDetails.user.role === "ROLE_NURSE";
  const userIsDoctor = loginDetails.user.role === "ROLE_DOCTOR";
  const userIsPatient = loginDetails.user.role === "ROLE_PATIENT";

  const visitIsFinished = report?.queue.checkInStatus === "FINISHED";

  const hasPrescriptions = report?.details?.prescriptions.length > 0;
  const componentRefRx = useRef();
  const handlePrintRx = useReactToPrint({
    pageStyle: "@page {size: 10in 13in}",
    content: () => componentRefRx.current,
    documentTitle: "Prescription.pdf",
  });

  const componentRefReferral = useRef();
  const handlePrintReferral = useReactToPrint({
    pageStyle: "@page {size: 10in 13in}",
    content: () => componentRefReferral.current,
    documentTitle: "Referral.pdf",
  });

  const patient = report?.queue.patient;
  const [form, setForm] = useState({
    formIsEdited: false,
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
    prescriptions: [],
    prescriptionsHasEdits: false,
  });

  function handleTextInput(event) {
    const { name, value } = event.target;
    if (INTEGER_TYPES.some((prop) => prop === name)) {
      const numericValue = value.replace(/[^0-9.-]+/g, "");
      if (numericValue >= 0) {
        setForm({ ...form, [name]: +numericValue, formIsEdited: true });
      }
    } else if (DOUBLE_TYPES.some((prop) => prop === name)) {
      const numericValue = value.replace(/[^0-9.-]+/g, "");
      if (numericValue >= 0) {
        setForm({ ...form, [name]: numericValue, formIsEdited: true });
      }
    } else {
      setForm({ ...form, [name]: value, formIsEdited: true });
    }
  }

  function handleSpecialInput(event, value, origin) {
    switch (origin) {
      case "consultationType":
        {
          setForm({
            ...form,
            consultationType: event.target.value,
            formIsEdited: true,
          });
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
            setForm({ ...form, labProcedures: updated, formIsEdited: true });
          } else {
            const updated = [...form.labProcedures, value];
            setForm({ ...form, labProcedures: updated, formIsEdited: true });
          }
        }
        break;
      default:
        throw new Error("Invalid input");
    }
  }

  function handleAddPrescription(prescription) {
    const updated = [...form.prescriptions, prescription];
    setForm({
      ...form,
      prescriptions: updated,
      prescriptionsHasEdits: true,
      formIsEdited: true,
    });
  }

  function handleRemovePrescription(index) {
    const updated = form.prescriptions.slice();
    updated.splice(index, 1);
    setForm({
      ...form,
      prescriptions: updated,
      prescriptionsHasEdits: true,
      formIsEdited: true,
    });
  }

  function isViewMcDisabled() {
    if (userIsDoctor) {
      const patientIsExamined =
        !!report.details.diagnosis && !!report.details.prognosis;
      return !patientIsExamined;
    } else {
      return !report.medicalCertificate;
    }
  }

  function isViewReferralDisabled() {
    return !form.management && form.labProcedures.length === 0;
  }

  function isSaveDisabled() {
    return !form.formIsEdited || visitIsFinished || userIsPatient;
  }

  function handleSave() {
    onSave(report.id, form);
    setForm({ ...form, formIsEdited: false });
  }

  useEffect(() => {
    if (report) {
      const { details } = report;
      const vitalSigns = details?.vitalSigns;
      let newForm = {
        ...form,
        ...report,
        consultationType: report.consultationType || "INITIAL",
        doctor: report.doctor,
        nurse: report.nurse || loginDetails.person,
      };
      if (details) {
        newForm = {
          ...newForm,
          ...details,
        };
      }
      if (vitalSigns) {
        newForm = { ...newForm, ...vitalSigns };
      }
      setForm(newForm);
    }
  }, [report]);

  return (
    <>
      <Card item>
        <CardHeader
          title="Visitation Report"
          subheader={util.date(report?.queue?.date)}
        />
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
                disabled={userIsPatient || visitIsFinished}
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
                  fullWidth
                  multiline
                  InputProps={{ readOnly: userIsPatient || visitIsFinished }}
                />
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <ReportSectionHeader
                title="Medical History"
                helpText="Allergies, illnesses, surgeries, immunizations, test results, etc."
              />

              <Grid item xs={12}>
                <TextField
                  value={form.medicalHistory}
                  onChange={handleTextInput}
                  size="small"
                  name="medicalHistory"
                  fullWidth
                  multiline
                  InputProps={{ readOnly: userIsPatient || visitIsFinished }}
                />
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <VitalSignsSection
                form={form}
                onInput={handleTextInput}
                disabled={userIsPatient || visitIsFinished}
              />
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
                  InputProps={{ readOnly: !userIsDoctor || visitIsFinished }}
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
                  InputProps={{ readOnly: !userIsDoctor || visitIsFinished }}
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
                sx={{
                  border: 1,
                  borderColor: grey[500],
                  borderRadius: 3,
                  p: 2,
                }}
              >
                <Grid item xs={12}>
                  <LabProceduresSection
                    form={form}
                    onChange={handleSpecialInput}
                    disabled={!userIsDoctor || visitIsFinished}
                    onPrint={handlePrintReferral}
                    disablePrint={isViewReferralDisabled()}
                  />
                </Grid>
                <Grid item xs={12}>
                  <ReportSectionHeader title="Others" />
                  <Grid item xs={12}>
                    <TextField
                      value={form.management}
                      onChange={handleTextInput}
                      size="small"
                      name="management"
                      fullWidth
                      multiline
                      InputProps={{
                        readOnly: !userIsDoctor || visitIsFinished,
                      }}
                    />
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <PrescriptionsSection
                    form={form}
                    onAdd={handleAddPrescription}
                    onRemove={handleRemovePrescription}
                    disabled={!userIsDoctor || visitIsFinished}
                    onPrint={handlePrintRx}
                    disablePrint={!hasPrescriptions}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sx={{ textAlign: "right" }}>
              <Typography variant="caption">Attending Physician</Typography>
              <Typography variant="body1">{util.name(form.doctor)}</Typography>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          {!userIsPatient && (
            <Button
              variant="contained"
              onClick={handleSave}
              disabled={isSaveDisabled()}
            >
              Save
            </Button>
          )}
          <Button
            variant="outlined"
            onClick={() => onViewMc(report)}
            disabled={isViewMcDisabled()}
          >
            VIEW MC
          </Button>
        </CardActions>
      </Card>
      {hasPrescriptions && (
        <Box display={`none`}>
          <ClinicForm componentRef={componentRefRx}>
            {report && <PrescriptionForm report={report} />}
          </ClinicForm>
        </Box>
      )}
      {!isViewReferralDisabled() && (
        <Box display={`none`}>
          <ClinicForm componentRef={componentRefReferral}>
            {report && <ReferralForm report={report} />}
          </ClinicForm>
        </Box>
      )}
    </>
  );
}
