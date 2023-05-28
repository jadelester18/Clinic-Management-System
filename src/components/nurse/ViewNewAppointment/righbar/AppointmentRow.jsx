import {
  Avatar,
  FormControlLabel,
  Grid,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  Switch,
  Tooltip,
  Typography,
  styled,
} from "@mui/material";
import DrawIcon from "@mui/icons-material/Draw";
import PersonIcon from "@mui/icons-material/Person";
import React, { useState } from "react";
import * as util from "../../../../redux/util";
import PatientInfoDialog from "./PatientInfoDialog";
import UpdateAppointmentDialog from "./UpdateAppointmentDialog";

export default function AppointmentRow({
  appointment,
  onUpdate,
  onApprove,
  onRevert,
}) {
  const { id, patient, doctor, timeSlot, date, remark, status } = appointment;

  const [isPatientInfoOpen, setIsPatientInfoOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);

  function handleToggle(event) {
    if (event.target.checked) {
      onApprove(id);
    } else {
      onRevert(id);
    }
  }

  return (
    <>
      <ListItem alignItems="flex-start">
        <Grid
          container
          spacing={2}
          justifyContent={"space-between"}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          <Grid item>
            <Stack direction={{ xs: "column", md: "row" }}>
              <ListItemAvatar>
                <Avatar
                  alt={patient.firstName}
                  src={patient.avatarUrl || "/static/images/avatar/1.jpg"}
                />
              </ListItemAvatar>
              <ListItemText
                disableTypography
                primary={
                  <Typography variant="h6">{util.name(patient)}</Typography>
                }
                secondary={
                  <Typography variant="body2">{`"${remark}"`}</Typography>
                }
              />
            </Stack>
          </Grid>
          <Grid item>
            <Stack alignItems="center">
              <Typography variant="body1">{util.name(doctor)}</Typography>
              <Typography variant="body1">{util.timeSlot(timeSlot)}</Typography>
            </Stack>
          </Grid>
          <Grid item>
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={1}
            >
              <Tooltip title="View Patient Information">
                <IconButton
                  color="secondary"
                  onClick={() => setIsPatientInfoOpen(true)}
                >
                  <PersonIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Update Appointment">
                <IconButton
                  color="success"
                  aria-label="upload picture"
                  component="label"
                  onClick={() => setIsUpdateOpen(true)}
                >
                  <DrawIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Approve Appointment">
                <FormControlLabel
                  control={
                    <Android12Switch
                      checked={status === "APPROVED"}
                      onChange={handleToggle}
                    />
                  }
                />
              </Tooltip>
            </Stack>
          </Grid>
        </Grid>
      </ListItem>
      {isPatientInfoOpen && (
        <PatientInfoDialog
          patient={patient}
          open={isPatientInfoOpen}
          onClose={() => setIsPatientInfoOpen(false)}
        />
      )}
      {isUpdateOpen && (
        <UpdateAppointmentDialog
          appointment={appointment}
          open={isUpdateOpen}
          onClose={() => setIsUpdateOpen(false)}
          onSave={onUpdate}
        />
      )}
    </>
  );
}

const Android12Switch = styled(Switch)(({ theme }) => ({
  padding: 8,
  "& .MuiSwitch-track": {
    borderRadius: 22 / 2,
    "&:before, &:after": {
      content: '""',
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      width: 16,
      height: 16,
    },
    "&:before": {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main)
      )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
      left: 12,
    },
    "&:after": {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main)
      )}" d="M19,13H5V11H19V13Z" /></svg>')`,
      right: 12,
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "none",
    width: 16,
    height: 16,
    margin: 2,
  },
}));
