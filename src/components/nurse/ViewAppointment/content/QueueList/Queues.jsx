import { Button, Grid, Typography } from "@mui/material";
import React from "react";
import QueueStatusFilter from "./QueueStatusFilter";
import QueueList from "./Scheduled/QueueList";

export default function Queues({
  queues,
  selectedStatus,
  onFilterChange,
  onStatusChange,
  onViewReport,
}) {
  return (
    <Grid container>
      <QueueStatusFilter
        selectedStatus={selectedStatus}
        onFilterChange={onFilterChange}
      />
      <QueueList
        queues={queues}
        onStatusChange={onStatusChange}
        onViewReport={onViewReport}
      />
    </Grid>
  );
}
