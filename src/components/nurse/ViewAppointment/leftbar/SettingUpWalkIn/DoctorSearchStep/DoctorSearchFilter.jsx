import {
  Autocomplete,
  Avatar,
  Divider,
  Grid,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import React, { useEffect, useRef, useState } from "react";
import * as hmoService from "../../../../../../redux/GetApiCalls/hmo";
import * as specializationService from "../../../../../../redux/GetApiCalls/specialization";
import SelectHmo from "../../../../../patient/appointment/ViewAllDoctors/SelectHmo";
import SelectSpecialization from "../../../../../patient/appointment/ViewAllDoctors/SelectSpecialization";

export default function DoctorSearchFilter({ query, onSelect, onTextInput }) {
  return (
    <Grid container spacing={2}>
      <Grid item>
        <Typography variant="body1" mt={2}>
          Filter By:
        </Typography>
      </Grid>
      <Grid item xs={2.5}>
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
    </Grid>
  );
}
