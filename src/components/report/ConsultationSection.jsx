import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
} from "@mui/material";
import React from "react";
import ReportSectionHeader from "./ReportSectionHeader";

const CONSULTATION_TYPES = [
  { value: "INITIAL", text: "Initial" },
  { value: "FOLLOW_UP", text: "Follow-up" },
  { value: "CLEARANCE", text: "Clearance" },
];

export default function ConsultationSection({ form, onChange }) {
  return (
    <>
      <ReportSectionHeader
        title="Consultation Type"
        helpText="Indicate whether the consultation is the first, a follow-up, or for clearance purposes"
      />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormControl sx={{ width: "100%" }}>
            <RadioGroup
              name="consultationType"
              value={form.consultationType}
              onChange={onChange}
              row
            >
              {CONSULTATION_TYPES.map((type) => (
                <FormControlLabel
                  value={type.value}
                  control={<Radio />}
                  label={type.text}
                  key={type.value}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </Grid>
      </Grid>
    </>
  );
}
