import React, { useEffect, useState } from "react";
import { cities } from "../../pages/addressDb/adress";
import { Autocomplete, TextField, Box } from "@mui/material";

const SelectCity = ({ value, province, onSelect }) => {
  const [filteredCities, setFilteredCities] = useState(cities);

  useEffect(() => {
    if (province) {
      setFilteredCities(
        cities.filter((city) => city.province_code === province.id)
      );
    } else {
      setFilteredCities([]);
    }
  }, [province]);

  return (
    <Autocomplete
      value={value}
      onChange={onSelect}
      options={filteredCities}
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
          label="City"
          inputProps={{
            ...params.inputProps,
          }}
        />
      )}
    />
  );
};

export default SelectCity;
