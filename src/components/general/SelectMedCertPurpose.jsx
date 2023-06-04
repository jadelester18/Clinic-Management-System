import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import React from "react";
import { MED_CERT_PURPOSES } from "../../redux/default";

export default function SelectMedCertPurpose({ value, onChange }) {
  return (
    <FormControl sx={{ width: "100%" }}>
      <FormLabel>Purpose</FormLabel>
      <RadioGroup name="purpose" value={value} onChange={onChange} row>
        {MED_CERT_PURPOSES.map((purpose) => (
          <FormControlLabel
            value={purpose.value}
            control={<Radio />}
            label={purpose.text}
            key={purpose.value}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}
