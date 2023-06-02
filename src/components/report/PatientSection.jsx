import { Grid, TextField } from "@mui/material";
import React from "react";
import ReportSectionHeader from "./ReportSectionHeader";

export default function PatientSection({ patient }) {
  return (
    <>
      <ReportSectionHeader
        title="Patient Information"
        helpText="The patient details for the report"
      />
      <Grid item container spacing={2}>
        <Grid item xs={12} md={3}>
          <TextField
            defaultValue={patient ? patient.lastName : ""}
            size="small"
            name="lastName"
            fullWidth
            label="Last name"
            InputProps={{ readOnly: true }}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            defaultValue={patient ? patient.firstName : ""}
            size="small"
            name="firstName"
            fullWidth
            label="First name"
            InputProps={{ readOnly: true }}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            defaultValue={patient ? patient.middleName : ""}
            size="small"
            name="middleName"
            fullWidth
            label="Middle name"
            InputProps={{ readOnly: true }}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            defaultValue={patient ? patient.suffixName : ""}
            size="small"
            name="suffixName"
            fullWidth
            label="Suffix"
            InputProps={{ readOnly: true }}
          />
        </Grid>
      </Grid>
    </>
  );
}
