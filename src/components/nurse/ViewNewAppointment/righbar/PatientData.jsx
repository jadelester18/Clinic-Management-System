import { Grid, TextField, Typography } from "@mui/material";
import React from "react";
import * as util from "../../../../redux/util";

export function PatientData({ patient }) {
  const {
    firstName,
    middleName,
    lastName,
    suffixName,
    address,
    hmoCards,
    contactNo,
    email,
  } = patient;
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="subtitle2">PERSONAL INFORMATION</Typography>
      </Grid>
      <Grid item xs={12} md={3}>
        <TextField
          defaultValue={firstName}
          label="First Name"
          variant="outlined"
          fullWidth
          disabled
        />
      </Grid>
      <Grid item xs={12} md={3}>
        <TextField
          defaultValue={middleName}
          label="Middle Name"
          variant="outlined"
          fullWidth
          disabled
        />
      </Grid>
      <Grid item xs={12} md={3}>
        <TextField
          defaultValue={lastName}
          label="Last Name"
          variant="outlined"
          fullWidth
          disabled
        />
      </Grid>
      <Grid item xs={12} md={3}>
        <TextField
          defaultValue={suffixName || ""}
          label="Suffix"
          variant="outlined"
          fullWidth
          disabled
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          defaultValue={`${util.fullAddress(address)}`}
          label="Address"
          variant="outlined"
          fullWidth
          disabled
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <TextField
          defaultValue=""
          label="HMO"
          variant="outlined"
          fullWidth
          disabled
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <TextField
          defaultValue={contactNo}
          label="Contact Number"
          variant="outlined"
          fullWidth
          disabled
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <TextField
          defaultValue={email}
          label="Email"
          variant="outlined"
          fullWidth
          disabled
        />
      </Grid>
    </Grid>
  );
}
