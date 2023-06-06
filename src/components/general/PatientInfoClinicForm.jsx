import { Divider, Grid, Typography } from "@mui/material";
import React from "react";
import * as util from "../../redux/util";
import dayjs from "dayjs";

export const PatientInfoClinicForm = ({ patient, date }) => {
  const patientAge = `${dayjs(date).diff(
    patient.birthDate,
    "year"
  )} year/s old`;
  return (
    <Grid container spacing={2}>
      <Grid item xs={5}>
        <Typography variant="subtitle1">Patient:</Typography>
        <Typography variant="subtitle1">{util.name(patient)}</Typography>
        <Divider />
      </Grid>
      <Grid item xs={7}>
        <Typography variant="subtitle1">Address:</Typography>
        <Typography variant="subtitle1">
          {util.fullAddress(patient.address)}
        </Typography>
        <Divider />
      </Grid>
      <Grid item xs={5}>
        <Typography variant="subtitle1">Date:</Typography>
        <Typography variant="subtitle1">{util.date(dayjs(date))}</Typography>
        <Divider />
      </Grid>
      <Grid item xs={3.5}>
        <Typography variant="subtitle1">Age:</Typography>
        <Typography variant="subtitle1">{patientAge}</Typography>
        <Divider />
      </Grid>
      <Grid item xs={3.5}>
        <Typography variant="subtitle1">Gender:</Typography>
        <Typography variant="subtitle1">{patient.gender}</Typography>
        <Divider />
      </Grid>
    </Grid>
  );
};
