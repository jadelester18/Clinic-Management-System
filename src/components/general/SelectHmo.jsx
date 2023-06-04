import { Autocomplete, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";

import * as hmoService from "../../redux/GetApiCalls/hmo";

export default function SelectHmo({ value, onSelect }) {
  const [hmoList, setHmoList] = useState([]);

  async function fetchHmoList() {
    try {
      const { data } = await hmoService.getHmos();
      setHmoList(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchHmoList();
  }, []);

  return (
    <Autocomplete
      options={hmoList}
      getOptionLabel={(option) => option.title}
      value={value}
      renderInput={(params) => (
        <TextField {...params} label="HMO Accreditation" />
      )}
      onChange={onSelect}
      fullWidth
    />
  );
}
