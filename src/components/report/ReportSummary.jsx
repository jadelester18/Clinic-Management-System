import { Box, Card, CardContent, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import * as util from "../../redux/util";

export default function ReportSummary({ report }) {
  const { details } = report;
  return (
    <Grid container direction={`row`} spacing={2}>
      <Grid item>
        <Typography variant="body2">Chief Complaint</Typography>
        <Typography variant="body1">
          {details.chiefComplaint || "Not yet assessed"}
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="body2">Diagnosis</Typography>
        <Typography variant="body1">
          {details.diagnosis || "Not yet examined"}
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="body2">Examined by</Typography>
        <Typography variant="body1">
          {details.diagnosis ? util.name(report.doctor) : "Not yet examined"}
        </Typography>
      </Grid>
    </Grid>
  );
}
