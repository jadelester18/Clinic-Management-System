import {
  Avatar,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  ListItem,
  ListItemAvatar,
  ListItemText,
  MenuItem,
  Select,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import ArticleIcon from "@mui/icons-material/Article";
import * as util from "../../../../../redux/util";
import * as appointmentSvc from "../../../../../redux/GetApiCalls/appointment";
import SelectCheckInStatus from "../../../../general/SelectCheckInStatus";
import PatientInfoDialog from "../../../ViewNewAppointment/righbar/PatientInfoDialog";
import { green } from "@mui/material/colors";
import ReportDialog from "./ReportDialog";

export default function QueueRow({ queue, onStatusChange, onViewReport }) {
  const { id, startTime, endTime, checkInStatus, type, patient, report, date } =
    queue;
  const [isPatientInfoOpen, setIsPatientInfoOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [appointment, setAppointment] = useState(null);

  async function fetchAppointment() {
    try {
      const { data } = await appointmentSvc.searchAppointments({
        patientId: patient.id,
        date: date,
        doctorId: null,
        status: "APPROVED",
        pageNo: 0,
        pageSize: 1,
      });
      setAppointment(data.content[0]);
    } catch (error) {
      console.error(error);
    }
  }

  function handleStatusChange(event) {
    onStatusChange(id, event.target.value);
  }

  useEffect(() => {
    if (type === "APPOINTMENT") {
      fetchAppointment();
    }
  }, [queue]);

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
        <Grid container spacing={2} {...styles.gContainer}>
          <Grid item xs={12} md={3}>
            <Stack direction={{ xs: "column", md: "row" }} {...styles.stack}>
              <ListItemAvatar sx={{ p: 0 }}>
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
                  <Typography variant="body2">
                    {util.queueType(type)}
                  </Typography>
                }
              />
            </Stack>
          </Grid>
          <Grid item xs={12} md={3}>
            <Stack {...styles.stack}>
              <Typography variant="body1">
                {appointment
                  ? util.name(appointment.doctor)
                  : util.name(report?.doctor)}
              </Typography>
              <Typography variant="caption">
                {appointment
                  ? util.timeSlot(appointment.timeSlot)
                  : "No scheduled time"}
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={12} md={2.5}>
            <Stack {...styles.stack}>
              {startTime ? (
                <Typography variant="subtitle2" color={green[500]}>
                  {util.formatTime(startTime)}
                </Typography>
              ) : (
                <Typography variant="subtitle2" color="error">
                  {`Not yet arrived`}
                </Typography>
              )}
              {endTime ? (
                <Typography variant="caption">{`-`}</Typography>
              ) : (
                <Typography variant="caption">
                  {util.elapsedTimeFromNow(startTime)}
                </Typography>
              )}
            </Stack>
          </Grid>
          <Grid item xs={12} md={3.5}>
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              height="100%"
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
              <Tooltip title="View Report">
                <IconButton
                  color="primary"
                  onClick={() => onViewReport(report.id)}
                >
                  <ArticleIcon />
                </IconButton>
              </Tooltip>
              <SelectCheckInStatus
                value={checkInStatus}
                onSelect={handleStatusChange}
              />
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
