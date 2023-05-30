import { Grid, TextField, Typography } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React from "react";
import SelectBirthdate from "./SelectBirthdate";

export default function PatientSearchFilter({ form, onInput }) {
  return (
    <Grid container spacing={2}>
      <Grid item>
        <Typography variant="body1" mt={3}>
          Filter By:
        </Typography>
      </Grid>
      <Grid item xs={3}>
        <TextField
          value={form.firstName}
          onChange={(event) => onInput(event, "firstName")}
          margin="dense"
          label="First Name"
          fullWidth
          variant="outlined"
        />
      </Grid>
      <Grid item xs={3}>
        <TextField
          value={form.lastName}
          onChange={(event) => onInput(event, "lastName")}
          margin="dense"
          label="Last Name"
          fullWidth
          variant="outlined"
        />
      </Grid>
      <Grid item xs={3} mt={1}>
        <SelectBirthdate
          value={form.birthdate}
          onChange={(event) => onInput(event, "birthdate")}
        />
      </Grid>
    </Grid>
  );
}
