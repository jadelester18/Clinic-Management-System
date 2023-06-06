import {
  FormControl,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Radio,
} from "@mui/material";
import React from "react";

const SelectPatientType = ({ value, onChange }) => {
  return (
    <FormControl sx={{ width: "100%" }}>
      <RadioGroup
        name="Type"
        value={value}
        onChange={(event, value) => onChange(value)}
        row
      >
        <FormControlLabel
          value={"EXISTING"}
          control={<Radio />}
          label={"Existing Patient"}
        />
        <FormControlLabel
          value={"NEW"}
          control={<Radio />}
          label={"New Patient"}
        />
      </RadioGroup>
    </FormControl>
  );
};

export default SelectPatientType;
