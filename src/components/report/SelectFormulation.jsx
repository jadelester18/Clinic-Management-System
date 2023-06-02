import { Autocomplete, TextField } from "@mui/material";
import React, { useRef, useState } from "react";
import * as formulationSvc from "../../redux/GetApiCalls/formulation";

export default function SelectFormulation({ value, onSelect }) {
  const [formulations, setFormulations] = useState([]);
  console.log(formulations);

  async function fetchFormulations(inputValue) {
    try {
      if (inputValue) {
        const { data } = await formulationSvc.searchFormulations({
          searchTerm: inputValue,
        });
        console.log("formulation result", data);
        if (data.length > 0) {
          setFormulations(data.map((formulation) => formulation.name));
        } else {
          setFormulations([inputValue]);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  const debounce = useRef(null);

  function handleInputChange(event, value) {
    if (debounce.current) {
      clearTimeout(debounce.current);
    }
    debounce.current = setTimeout(() => fetchFormulations(value), 400);
  }

  return (
    <Autocomplete
      freeSolo
      value={value}
      options={formulations}
      renderInput={(params) => <TextField {...params} label="Formulation" />}
      onInputChange={(event, value) => handleInputChange(event, value)}
      onChange={onSelect}
    />
  );
}
