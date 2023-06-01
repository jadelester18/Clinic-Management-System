import {
  FormControlLabel,
  Grid,
  TextField,
  Typography,
  Checkbox,
} from "@mui/material";
import React from "react";
import SelectHmo from "../../../../../patient/appointment/ViewAllDoctors/SelectHmo";
import SelectSpecialization from "../../../../../patient/appointment/ViewAllDoctors/SelectSpecialization";

export default function DoctorSearchFilter({ query, onSelect, onTextInput }) {
  return (
    <Grid container spacing={2} alignItems="stretch">
      <Grid item xs={12}>
        <Typography variant="body1" mt={2}>
          Filter By:
        </Typography>
      </Grid>
      <Grid item xs={2.5} height="100%">
        <TextField
          value={query.firstName}
          name="firstName"
          margin="dense"
          label="First Name"
          fullWidth
          variant="outlined"
          onChange={onTextInput}
        />
      </Grid>
      <Grid item xs={2.5}>
        <TextField
          value={query.lastName}
          name="lastName"
          margin="dense"
          label="Last Name"
          fullWidth
          variant="outlined"
          onChange={onTextInput}
        />
      </Grid>
      <Grid item xs={2.5} mt={1}>
        <SelectHmo
          value={query.hmo}
          onSelect={(event, newValue) => onSelect(newValue, "hmo")}
        />
      </Grid>
      <Grid item xs={2.5} mt={1}>
        <SelectSpecialization
          value={query.specialization}
          onSelect={(event, newValue) => onSelect(newValue, "specialization")}
        />
      </Grid>
      <Grid item xs={12}>
        <FormControlLabel
          label="Only show scheduled for the day"
          control={
            <Checkbox
              checked={query.onlyScheduled}
              onChange={(event) =>
                onSelect(event.target.checked, "onlyScheduled")
              }
            />
          }
        />
      </Grid>
    </Grid>
  );
}
