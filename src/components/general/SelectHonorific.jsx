import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";

const HONORIFICS = ["Mr.", "Ms.", "Mrs.", "Mx.", "Dr."];

export default function SelectHonorific({ value, onSelect }) {
  console.log("honorific value", value);
  return (
    <FormControl fullWidth>
      <InputLabel>Honorific</InputLabel>
      <Select value={value} onChange={onSelect} label="Honorific">
        {HONORIFICS.map((hon) => (
          <MenuItem value={hon} key={hon}>
            {hon}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
