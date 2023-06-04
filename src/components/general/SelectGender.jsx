import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";

export default function SelectGender({ value, onSelect }) {
  return (
    <FormControl fullWidth>
      <InputLabel>Gender</InputLabel>
      <Select label="Gender" value={value} onChange={onSelect}>
        <MenuItem value={"MALE"}>Male</MenuItem>
        <MenuItem value={"FEMALE"}>Female</MenuItem>
      </Select>
    </FormControl>
  );
}
