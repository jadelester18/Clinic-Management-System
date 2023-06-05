import { Box, Divider, Grid, Typography } from "@mui/material";
import React from "react";
import * as util from "../../redux/util";
import dayjs from "dayjs";
import { DoctorSignature } from "../general/DoctorSignature";
import { PatientInfoClinicForm } from "../general/PatientInfoClinicForm";

export default function MedicalCertificateForm({ certificate }) {
  const { patient, date, report, purpose, type, totalRestDays, remarks } =
    certificate;
  const patientAge = `${dayjs(date).diff(
    patient.birthDate,
    "year"
  )} year/s old`;
  return (
    <>
      <Box mt={5} ml={10} mr={10}>
        <PatientInfoClinicForm patient={patient} date={date} />
        <Grid container spacing={2} mt={5}>
          <Grid item xs={12}>
            <Typography variant="body1"> To Whom It May Concern:</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">
              {`This is to certify that ${util.name(patient)}, ${patientAge} ${
                patient.gender
              }, has been under my medical care/attention for ${
                report.details.diagnosis
              }.`}
            </Typography>
          </Grid>
          {type === "FIT" && (
            <Grid item xs={12}>
              <Typography variant="body1">
                {`I have conducted a medical evaluation of the patient and can confirm that they are now fit for ${util.medCertPurpose(
                  purpose
                )} without restrictions, effective ${util.date(dayjs(date))}.`}
              </Typography>
            </Grid>
          )}
          {type === "UNFIT" && (
            <Grid item xs={12}>
              <Typography variant="body1">
                {`Based on the patient's medical condition, I consider that a period of absence from ${util.medCertPurpose(
                  purpose
                )} for ${totalRestDays} day/s starting on ${util.date(
                  dayjs(date)
                )} is absolutely necessary for the restoration of the patient's health.`}
              </Typography>
            </Grid>
          )}
          <Grid item xs={12}>
            <Typography variant="body1">{remarks}</Typography>
          </Grid>
        </Grid>
        <Grid container mt={10} justifyContent={`end`}>
          <Grid item xs={4}>
            <DoctorSignature doctor={report.doctor} />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
