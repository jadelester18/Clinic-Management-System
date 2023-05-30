import { Button, Grid, Typography } from "@mui/material";
import React from "react";

const CHECK_IN_STATUS = [
  { value: null, text: "ALL" },
  { value: "SCHEDULED", text: "SCHEDULED" },
  { value: "FOR_ASSESSMENT", text: "FOR ASSESSMENT" },
  { value: "ONGOING_ASSESSMENT", text: "ONGOING ASSESSMENT" },
  { value: "FOR_CONSULTATION", text: "FOR CONSULTATION" },
  { value: "ONGOING_CONSULTATION", text: "ONGOING CONSULTATION" },
  { value: "FINISHED", text: "FINISHED" },
];

export default function QueueStatusFilter({ selectedStatus, onFilterChange }) {
  const styles = {
    gContainer: {
      spacing: 1,
      mx: 3,
      my: 1,
    },
  };
  return (
    <Grid container {...styles.gContainer}>
      {CHECK_IN_STATUS.map((status) => (
        <Grid item key={status.value}>
          <Button
            variant={selectedStatus === status.value ? "contained" : "outlined"}
            onClick={() => onFilterChange(status.value)}
            sx={{ borderRadius: 10 }}
            size="small"
          >
            {status.text}
          </Button>
        </Grid>
      ))}
    </Grid>
  );
}
