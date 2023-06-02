import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import * as labProcedureSvc from "../../redux/GetApiCalls/labProcedure";

export default function LabProceduresSection({ form, onChange }) {
  const [labProcedures, setLabProcedures] = useState([]);

  async function fetchLabProcedures() {
    try {
      const { data } = await labProcedureSvc.getLabProcedures();
      console.log("LAB PROCEDURES", data);
      setLabProcedures(data);
    } catch (error) {
      console.error(error);
    }
  }

  function isChecked(labProcedure) {
    const labs = form.labProcedures;
    if (labs && labs.length > 0) {
      return labs.some((procedure) => procedure.id === labProcedure.id);
    } else {
      return false;
    }
  }

  useEffect(() => {
    fetchLabProcedures();
  }, []);

  return (
    <>
      <Typography variant="body1" sx={{ my: 1 }}>
        Laboratory procedures
      </Typography>
      <Grid item xs={12}>
        <FormGroup>
          <Grid container direction="row" alignItems="center">
            {labProcedures.map((labProcedure) => (
              <Grid key={labProcedure.id} item xs={12} md={4}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={isChecked(labProcedure)}
                      onChange={(event) =>
                        onChange(event, labProcedure, "labProcedures")
                      }
                    />
                  }
                  label={
                    <Typography variant="body2">{`${labProcedure.code} - ${labProcedure.title}`}</Typography>
                  }
                />
              </Grid>
            ))}
          </Grid>
        </FormGroup>
      </Grid>
    </>
  );
}
