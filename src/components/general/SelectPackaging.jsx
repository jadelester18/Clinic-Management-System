import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import React from "react";

const COMMON_PACKAGINGS = ["capsule/s", "tablet/s"];

export default function SelectPackaging({ value, onSelect }) {
  return (
    <FormControl fullWidth>
      <InputLabel>Packaging</InputLabel>
      <Select label="Packaging" value={value} onChange={onSelect}>
        {COMMON_PACKAGINGS.map((packaging) => (
          <MenuItem key={packaging} value={packaging}>
            {packaging}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
