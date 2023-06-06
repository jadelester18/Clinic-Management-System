import React from "react";
import { countries } from "../../pages/addressDb/adress";
import { Autocomplete, Box, TextField } from "@mui/material";

export default function SelectCountry({ value, onSelect }) {
  return (
    <Autocomplete
      options={countries.sort((a, b) => a.label.localeCompare(b.label))}
      value={value}
      onChange={onSelect}
      getOptionLabel={(option) => option.label}
      renderOption={(props, option) => (
        <Box
          component="li"
          sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
          {...props}
        >
          <img
            loading="lazy"
            width="20"
            src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
            srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
            alt=""
          />
          {option.label}
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Country"
          inputProps={{
            ...params.inputProps,
          }}
        />
      )}
    />
  );
}
