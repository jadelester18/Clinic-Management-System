import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import React from "react";
import { MED_CERT_PURPOSES, MED_CERT_TYPES } from "../../redux/default";

export default function SelectMedCertType({ value, onChange }) {
  return (
    <FormControl sx={{ width: "100%" }}>
      <FormLabel>Type</FormLabel>
      <RadioGroup name="Type" value={value} onChange={onChange} row>
        {MED_CERT_TYPES.map((type) => (
          <FormControlLabel
            value={type.value}
            control={<Radio />}
            label={type.text}
            key={type.value}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}
