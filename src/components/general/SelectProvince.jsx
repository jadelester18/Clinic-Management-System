import { Autocomplete, TextField, Box } from "@mui/material";
import React from "react";
import { provinces } from "../../pages/addressDb/adress";

const SelectProvince = ({ value, onSelect }) => {
  return (
    <Autocomplete
      options={provinces}
      value={value}
      onChange={onSelect}
      getOptionLabel={(option) => option.name}
      renderOption={(props, option) => (
        <Box
          component="li"
          sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
          {...props}
        >
          {option.name}
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Province"
          inputProps={{
            ...params.inputProps,
          }}
        />
      )}
    />
  );
};

export default SelectProvince;
