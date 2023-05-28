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
import ConfirmDialog from "../../../ConfirmDialog";

const DEFAULT_DIALOG = {
  appointmentId: 0,
  open: false,
};

function AppointmentsApprovalList({ appointments, onUpdate, onStatusChange }) {
  const [approvalDialog, setApprovalDialog] = useState(DEFAULT_DIALOG);
  const [revertDialog, setRevertDialog] = useState(DEFAULT_DIALOG);

  function handleApprove(appointmentId) {
    onStatusChange(appointmentId, "APPROVED");
    setApprovalDialog(DEFAULT_DIALOG);
  }

  function handleRevert(appointmentId) {
    onStatusChange(appointmentId, "PENDING_APPROVAL");
    setRevertDialog(DEFAULT_DIALOG);
  }

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
        {appointments.length > 0 ? (
          appointments?.map((appointment) => (
            <Fragment key={appointment.id}>
              <AppointmentRow
                appointment={appointment}
                onUpdate={onUpdate}
                onApprove={(appointmentId) =>
                  setApprovalDialog({ appointmentId, open: true })
                }
                onRevert={(appointmentId) =>
                  setRevertDialog({ appointmentId, open: true })
                }
                onCancel={() => {}}
              />
              <Divider variant="inset" component="li" />
            </Fragment>
          ))
        ) : (
          <Typography variant="body1">No appointments to show</Typography>
        )}
      </List>
      {approvalDialog.open && (
        <ConfirmDialog
          title="Approve appointment?"
          subtitle="The patient will be notified. A queue will be created on the appointment date."
          open={approvalDialog.open}
          onConfirm={() => handleApprove(approvalDialog.appointmentId)}
          onClose={() => setApprovalDialog(DEFAULT_DIALOG)}
        />
      )}
      {revertDialog.open && (
        <ConfirmDialog
          title="Withdraw appointment approval?"
          subtitle="The patient will be notified. The queue will be removed from the appointment date."
          open={revertDialog.open}
          onConfirm={() => handleRevert(revertDialog.appointmentId)}
          onClose={() => setRevertDialog(DEFAULT_DIALOG)}
        />
      )}
    </>
  );
}

export default AppointmentsApprovalList;
