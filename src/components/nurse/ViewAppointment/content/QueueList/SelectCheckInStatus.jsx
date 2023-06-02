import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";
import { CHECK_IN_STATUS } from "../../../../../redux/default";

export default function SelectCheckInStatus({ value, onSelect }) {
  return (
    <FormControl sx={{ width: "100%" }} size="small">
      <InputLabel>Status</InputLabel>
      <Select value={value} label="Status" onChange={onSelect}>
        {CHECK_IN_STATUS.map((status) => (
          <MenuItem value={status.value} key={status.value}>
            {status.text}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
