import {
  Box,
  Divider,
  Grid,
  List,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import React from "react";
import * as util from "../../redux/util";
import dayjs from "dayjs";
import { DoctorSignature } from "../general/DoctorSignature";

export const ReferralForm = ({ report }) => {
  const { details, queue } = report;
  const { patient, date } = queue;
  const patientAge = `${dayjs(date).diff(
    patient.birthDate,
    "year"
  )} year/s old`;
  return (
    <Box mt={5} ml={10} mr={10}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Typography variant="subtitle1">Patient:</Typography>
          <Typography variant="subtitle1">{util.name(patient)}</Typography>
          <Divider />
        </Grid>
        <Grid item xs={6}>
          <Typography variant="subtitle1">Address:</Typography>
          <Typography variant="subtitle1">
            {util.fullAddress(patient.address)}
          </Typography>
          <Divider />
        </Grid>
        <Grid item xs={6}>
          <Typography variant="subtitle1">Date:</Typography>
          <Typography variant="subtitle1">{util.date(dayjs(date))}</Typography>
          <Divider />
        </Grid>
        <Grid item xs={3}>
          <Typography variant="subtitle1">Age:</Typography>
          <Typography variant="subtitle1">{patientAge}</Typography>
          <Divider />
        </Grid>
        <Grid item xs={3}>
          <Typography variant="subtitle1">Gender:</Typography>
          <Typography variant="subtitle1">{patient.gender}</Typography>
          <Divider />
        </Grid>
      </Grid>
      <Grid container spacing={2} mt={5}>
        <Grid item xs={12}>
          <Grid item xs={12}>
            <Typography variant="h6">Diagnostic Procedure(s):</Typography>
          </Grid>
          <Grid item xs={12}>
            <List>
              {details?.labProcedures.length > 0 &&
                details?.labProcedures.map((procedure) => (
                  <ListItemText
                    key={procedure.id}
                    variant="subtitle2"
                  >{`◉ ${procedure.code} - ${procedure.title}`}</ListItemText>
                ))}
              {details?.management && (
                <ListItemText variant="subtitle2">
                  {`◉ ${details?.management}`}
                </ListItemText>
              )}
            </List>
          </Grid>
        </Grid>
      </Grid>
      <Grid container mt={10} justifyContent={`end`}>
        <Grid item xs={4}>
          <DoctorSignature doctor={report.doctor} />
        </Grid>
      </Grid>
    </Box>
  );
};
