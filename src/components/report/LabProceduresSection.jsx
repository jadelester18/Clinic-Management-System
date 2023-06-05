import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import * as labProcedureSvc from "../../redux/GetApiCalls/labProcedure";
import PrintIcon from "@mui/icons-material/Print";

export default function LabProceduresSection({
  form,
  onChange,
  disabled,
  onPrint,
  disablePrint,
}) {
  const [labProcedures, setLabProcedures] = useState([]);

  async function fetchLabProcedures() {
    try {
      const { data } = await labProcedureSvc.getLabProcedures();
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
      <Stack direction={`row`} alignItems={`center`} spacing={2}>
        <Typography variant="body1" sx={{ my: 1 }}>
          Laboratory procedures
        </Typography>
        <Tooltip title="Print referral">
          <IconButton color="primary" onClick={onPrint} disabled={disablePrint}>
            <PrintIcon />
          </IconButton>
        </Tooltip>
      </Stack>
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
                  disabled={disabled}
                />
              </Grid>
            ))}
          </Grid>
        </FormGroup>
      </Grid>
    </>
  );
}
