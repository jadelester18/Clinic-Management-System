import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  List,
  ListItemButton,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import * as util from "../../../../redux/util";
import PatientRecords from "./PatientRecords";
import { PatientData } from "./PatientData";

export default function PatientInfoDialog({ patient, open, onClose }) {
  const [reports, setReports] = useState([]);
  return (
    <Dialog open={open} onClose={onClose} maxWidth={"lg"} fullWidth={true}>
      <DialogTitle>{util.name(patient)}</DialogTitle>
      {/* <DialogContent>
        <DialogContentText>Patient Records</DialogContentText>
      </DialogContent> */}
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <PatientRecords reports={reports} />
          </Grid>
          <Grid item xs={8}>
            <PatientData patient={patient} />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
