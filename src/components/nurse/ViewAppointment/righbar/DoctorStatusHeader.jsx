import { Chip, Grid, Stack, Typography } from "@mui/material";
import React from "react";

export default function DoctorStatusHeader({ statusList }) {
  const totalNotYetAssessed = statusList
    ?.map((status) => status.totalNotYetAssessed)
    .reduce((totalAcc, totalVal) => totalAcc + totalVal, 0);
  const totalForConsultation = statusList
    ?.map((status) => status.totalForConsultation)
    .reduce((totalAcc, totalVal) => totalAcc + totalVal, 0);
  return (
    <Grid
      container
      spacing={0}
      justifyContent="space-between"
      alignItems="center"
    >
      <Grid item>
        <Typography variant="body1" p={2}>
          SCHEDULED DOCTORS
        </Typography>
      </Grid>
      <Grid item>
        <Stack direction="row">
          <Stack direction="row" spacing={1} alignItems="center">
            <Chip
              label={totalNotYetAssessed}
              sx={{ backgroundColor: "orange", color: "black" }}
              mr={2}
            />
            <Typography variant="body2" p={2}>
              Not yet assessed
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center">
            <Chip label={totalForConsultation} color="primary" mr={2} />
            <Typography variant="body2" p={2}>
              For consultation
            </Typography>
          </Stack>
        </Stack>
      </Grid>
    </Grid>
  );
}
