import { Autocomplete, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";

import * as specializationService from "../../redux/GetApiCalls/specialization";

export default function SelectSpecialization({ value, onSelect }) {
  const [specializations, setSpecializations] = useState([]);

  async function fetchSpecializationList() {
    try {
      const { data } = await specializationService.getSpecializations();
      setSpecializations(data);
      console.log("specializations", specializations);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchSpecializationList();
  }, []);

  return (
    <Autocomplete
      options={specializations}
      getOptionLabel={(option) => option.description}
      value={value}
      renderInput={(params) => <TextField {...params} label="Specialization" />}
      onChange={onSelect}
      fullWidth
    />
  );
}
