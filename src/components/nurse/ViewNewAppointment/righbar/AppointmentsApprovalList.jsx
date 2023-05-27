import {
  Autocomplete,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  FormControlLabel,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Stack,
  Switch,
  TextField,
  Tooltip,
  Typography,
  styled,
} from "@mui/material";
import DrawIcon from "@mui/icons-material/Draw";
import PersonIcon from "@mui/icons-material/Person";
import React, { Fragment, useEffect, useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDateTimePicker } from "@mui/x-date-pickers";
import axios from "axios";
import AppointmentRow from "./AppointmentRow";
import * as appointmentSvc from "../../../../redux/PostApiCalls/patientAppointment";

function AppointmentsApprovalList({ appointments, onUpdate }) {
  //For Cofirmation in saving enable or canceling appointment
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState("");

  const handleToggle = () => {
    if (isChecked) {
      setIsChecked(false);
      setConfirmationMessage(
        "Are you sure you want to cancel the appointment?"
      );
    } else {
      setIsChecked(true);
      setConfirmationMessage(
        "Are you sure you want to approve the appointment?"
      );
    }
    setConfirmationOpen(true);
  };

  const handleConfirmationClose = (confirmed) => {
    setConfirmationOpen(false);
    if (confirmed) {
      setIsChecked(!isChecked);
    }
  };

  return (
    <>
      {/* <ListItem>
            <Grid
              container
              spacing={2}
              justifyContent="space-around"
              columns={{ xs: 4, sm: 8, md: 12 }}
              fontWeight="bold"
              sx={{ paddingTop: "8px" }}
              position="sticky"
              top={0}
              bgcolor="background.paper"
              zIndex={1}
            >
              <Typography variant="subtitle1">Name</Typography>
              <Typography variant="subtitle1"></Typography>
              <Typography variant="subtitle1">Type</Typography>
              <Typography variant="subtitle1">Time</Typography>
              <Typography variant="subtitle1">Action</Typography>
            </Grid>
          </ListItem> */}

      <List
        sx={{
          width: "100%",
          bgcolor: "background.paper",
          borderRadius: 10,
          display: "flex",
          flexDirection: "column",
          height: "20rem",
          overflowY: "scroll",
          "&::-webkit-scrollbar": {
            width: "0.4em",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#888",
          },
          padding: 2,
        }}
        dense={true}
      >
        {/* <Divider variant="inset" component="li" /> */}
        {appointments.length > 0 ? (
          appointments?.map((appointment) => (
            <Fragment key={appointment.id}>
              <AppointmentRow
                appointment={appointment}
                onUpdate={onUpdate}
                onApprove={() => {}}
                onCancel={() => {}}
              />
              <Divider variant="inset" component="li" />
            </Fragment>
          ))
        ) : (
          <Typography variant="body1">No appointments to show</Typography>
        )}
      </List>
      {/* Updating appointment */}
      {/* For Creating New Appointment For Walk In */}

      {/* Cofirmation in saving update of appointment */}
      {confirmationOpen && (
        <Dialog
          open={confirmationOpen}
          // onClose={handleClickCloseConfirmation}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Are you sure you want to update this appointment?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              This will reflect to that date.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button>Disagree</Button>
            <Button
              // onClick={() => {
              //   handleCloseCreateAppointment();
              //   handleClickCloseConfirmation();
              // }}
              autoFocus
            >
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      )}
      {/* Checking profile of the patient with history */}

      {/* Cofirmation in saving enable or canceling appointment */}
      {confirmationOpen && (
        <Dialog
          open={confirmationOpen}
          onClose={() => handleConfirmationClose(false)}
        >
          <DialogTitle>Confirmation</DialogTitle>
          <DialogContent>{confirmationMessage}</DialogContent>
          <DialogActions>
            <Button onClick={() => handleConfirmationClose(true)}>No</Button>
            <Button onClick={() => handleConfirmationClose(false)}>Yes</Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
}

export default AppointmentsApprovalList;
