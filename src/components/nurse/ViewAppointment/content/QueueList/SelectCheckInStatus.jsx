import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";

const CHECK_IN_STATUS = [
  { value: "SCHEDULED", text: "Scheduled" },
  { value: "FOR_ASSESSMENT", text: "For assessment" },
  { value: "ONGOING_ASSESSMENT", text: "Ongoing assessment" },
  { value: "FOR_CONSULTATION", text: "For consultation" },
  { value: "ONGOING_CONSULTATION", text: "Ongoing consultation" },
  { value: "FINISHED", text: "Finished" },
  { value: "CANCELLED", text: "Cancelled" },
];

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
