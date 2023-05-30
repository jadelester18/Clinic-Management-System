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
import PatientInfoDialog from "../../../ViewNewAppointment/righbar/PatientInfoDialog";
import * as util from "../../../../../redux/util";

export default function ApprovedAppointmentRow({
  appointment,
  onArrived,
  onRevert,
}) {
  const { id, patient, doctor, timeSlot, remark, status, hasArrived } =
    appointment;

  const [isPatientInfoOpen, setIsPatientInfoOpen] = useState(false);

  function handleToggle(event) {
    if (event.target.checked) {
      onArrived(id);
    } else {
      onRevert(id);
    }
  }

  const styles = {
    gContainer: {
      spacing: 1,
      justifyContent: "center",
      alignItems: "stretch",
    },
    gItem: {
      xs: 12,
      md: 4,
    },
    stack: {
      height: "100%",
      justifyContent: "center",
      alignItems: "center",
    },
    liText: {
      textAlign: { xs: "center", md: "left" },
    },
  };

  return (
    <>
      <ListItem alignItems="center">
        <Grid container {...styles.gContainer}>
          <Grid item {...styles.gItem}>
            <Stack direction={{ xs: "column", md: "row" }} {...styles.stack}>
              <ListItemAvatar>
                <Avatar
                  alt={patient.firstName}
                  src={patient.avatarUrl || "/static/images/avatar/1.jpg"}
                />
              </ListItemAvatar>
              <ListItemText
                sx={styles.liText}
                disableTypography
                primary={
                  <Typography variant="body1">{util.name(patient)}</Typography>
                }
                secondary={
                  <Typography variant="body2">{`CC: "${remark}"`}</Typography>
                }
              />
            </Stack>
          </Grid>
          <Grid item {...styles.gItem}>
            <Stack {...styles.stack}>
              <Typography variant="body1">{util.name(doctor)}</Typography>
              <Typography variant="body2">{util.timeSlot(timeSlot)}</Typography>
            </Stack>
          </Grid>
          <Grid item {...styles.gItem}>
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              justifyContent={{ xs: "center", md: "end" }}
            >
              <Tooltip title="View Patient Information">
                <IconButton
                  color="secondary"
                  onClick={() => setIsPatientInfoOpen(true)}
                >
                  <PersonIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Arrived?">
                <FormControlLabel
                  control={
                    <Android12Switch
                      checked={hasArrived}
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
