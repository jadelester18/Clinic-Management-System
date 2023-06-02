import {
  Grid,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import ReportSectionHeader from "./ReportSectionHeader";
import * as util from "../../redux/util";

export default function VitalSignsSection({ form, onInput }) {
  return (
    <>
      <ReportSectionHeader
        title="Vital Signs"
        helpText="The patient's physiological state and overall health at the time of visit."
      />
      <Grid container spacing={2}>
        <Grid item xs={12} md={2.4}>
          <TextField
            value={form.bloodPressure}
            size="small"
            name="bloodPressure"
            fullWidth
            label="Blood Pressure"
            onChange={onInput}
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">mmHg</InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} md={2.4}>
          <TextField
            value={form.temperatureC}
            onChange={onInput}
            size="small"
            name="temperatureC"
            fullWidth
            label="Temperature"
            required
            InputProps={{
              endAdornment: <InputAdornment position="end">°C</InputAdornment>,
            }}
          />
        </Grid>
        <Grid item xs={12} md={2.4}>
          <TextField
            value={form.respiratoryRateBPM}
            onChange={onInput}
            size="small"
            name="respiratoryRateBPM"
            fullWidth
            label="Respiratory Rate"
            required
            InputProps={{
              endAdornment: <InputAdornment position="end">BPM</InputAdornment>,
            }}
          />
        </Grid>
        <Grid item xs={12} md={2.4}>
          <TextField
            value={form.heartRateBPM}
            onChange={onInput}
            size="small"
            name="heartRateBPM"
            fullWidth
            label="Heart Rate"
            required
            InputProps={{
              endAdornment: <InputAdornment position="end">BPM</InputAdornment>,
            }}
          />
        </Grid>
        <Grid item xs={12} md={2.4}>
          <TextField
            value={form.oxygenSaturation}
            onChange={onInput}
            size="small"
            name="oxygenSaturation"
            fullWidth
            label="Oxygen Saturation"
            required
            InputProps={{
              endAdornment: <InputAdornment position="end">%</InputAdornment>,
            }}
          />
        </Grid>
        <Grid item xs={12} sx={{ textAlign: "right" }}>
          <Typography variant="caption">Evaluating Nurse</Typography>
          <Typography variant="body1">{util.name(form.nurse)}</Typography>
        </Grid>
      </Grid>
      <Stack direction={`row`} justifyContent={`end`}></Stack>
    </>
  );
}
