import { Grid, Stack, TextField, Typography } from "@mui/material";
import React from "react";
import * as util from "../../redux/util";
import SelectPackaging from "../general/SelectPackaging";

export default function StandardSignatura({ form, onSigChange }) {
  return (
    <Grid item container spacing={2}>
      <Grid item xs={12}>
        <Stack>
          <Typography variant="caption">Signatura</Typography>
          <Typography variant="body1">
            {util.signatura(form.signatura)}
          </Typography>
        </Stack>
      </Grid>
      <Grid item>
        <TextField
          value={form.signatura.action}
          onChange={(event) => onSigChange(event, event.target.value, "action")}
          fullWidth
          name="action"
          label="Action"
          variant="outlined"
          placeholder={`E.g. "Take", "Drink"`}
        />
      </Grid>
      <Grid item>
        <TextField
          value={form.signatura.totalPerIntake}
          onChange={(event) =>
            onSigChange(event, event.target.value, "totalPerIntake")
          }
          fullWidth
          name="totalPerIntake"
          label="Piece/s"
          variant="outlined"
        />
      </Grid>
      <Grid item>
        <SelectPackaging
          value={form.signatura.packaging}
          onSelect={(event) =>
            onSigChange(event, event.target.value, "packaging")
          }
        />
      </Grid>
      <Grid item>
        <TextField
          value={form.signatura.totalPerDay}
          onChange={(event) =>
            onSigChange(event, event.target.value, "totalPerDay")
          }
          name="totalPerDay"
          label="Intake per day"
          fullWidth
          variant="outlined"
        />
      </Grid>
      <Grid item>
        <TextField
          value={form.signatura.totalDays}
          onChange={(event) =>
            onSigChange(event, event.target.value, "totalDays")
          }
          name="totalDays"
          label="Days"
          fullWidth
          variant="outlined"
        />
      </Grid>
    </Grid>
  );
}
