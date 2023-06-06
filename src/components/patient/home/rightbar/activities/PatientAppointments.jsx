import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Stack,
  Typography,
  ListItemAvatar,
  ListItemText,
  CardActions,
  Pagination,
} from "@mui/material";
import React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { green, grey, orange, red } from "@mui/material/colors";
import BackupTableIcon from "@mui/icons-material/BackupTable";
import * as util from "../../../../../redux/util";

const PatientAppointments = ({ appointments, onView }) => {
  const [expanded, setExpanded] = React.useState(null);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : null);
  };

  const styles = {
    content: {
      display: "flex",
      flexDirection: "column",
      height: "27rem",
      overflowY: "scroll",
      "&::-webkit-scrollbar": {
        width: "0.4em",
      },
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: "#888",
      },
    },
  };

  return (
    <>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            <BackupTableIcon />
          </Avatar>
        }
        subheader={<Typography variant="h6">Appointment History</Typography>}
      />
      <CardContent>
        <Box sx={styles.content}>
          {appointments.length > 0 ? (
            appointments.map((appointment) => (
              <AppointmentRow
                key={appointment.id}
                appointment={appointment}
                onView={onView}
                expanded={expanded}
                handleChange={handleChange}
              />
            ))
          ) : (
            <Box textAlign={`center`} my={1}>
              <Typography variant="body1">No appointments to show</Typography>
            </Box>
          )}
        </Box>
      </CardContent>
    </>
  );
};
export default PatientAppointments;

const AppointmentRow = ({ appointment, onView, expanded, handleChange }) => {
  const { doctor, remark, date, timeSlot, status } = appointment;

  const statusColor = () => {
    switch (status) {
      case "PENDING_APPROVAL":
        return orange[500];
      case "APPROVED":
        return green[500];
      case "CANCELLED":
        return grey[500];
      default:
        return null;
    }
  };

  return (
    <Accordion
      expanded={expanded === appointment.id}
      onChange={handleChange(appointment.id)}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Stack
              direction={`row`}
              justifyContent={`space-between`}
              alignItems={`center`}
            >
              <Typography variant="h6">{util.date(date)}</Typography>
              <Typography variant="h6">{util.timeSlot(timeSlot)}</Typography>
            </Stack>
          </Grid>
          <Grid
            item
            container
            direction={`row`}
            justifyContent={`space-between`}
            alignItems={`center`}
          >
            <Grid item>
              <Stack
                direction={{ xs: "column", md: "row" }}
                height="100%"
                alignItems="center"
                justifyContent="center"
              >
                <ListItemAvatar>
                  <Avatar alt={doctor.firstName} src={doctor.avatarUrl || ""} />
                </ListItemAvatar>
                <ListItemText
                  sx={{ textAlign: { xs: "center", md: "left" } }}
                  disableTypography
                  primary={
                    <Typography variant="body1">{util.name(doctor)}</Typography>
                  }
                  secondary={
                    <Typography variant="body2">
                      {doctor.specialization.description}
                    </Typography>
                  }
                />
              </Stack>
            </Grid>
            <Grid item>
              <Stack>
                <Typography variant="button" color={statusColor()}>
                  {util.appointmentStatus(status)}
                </Typography>
              </Stack>
            </Grid>
          </Grid>
        </Grid>
      </AccordionSummary>
      <AccordionDetails>
        <Stack
          direction={`row`}
          alignItems={`center`}
          justifyContent={`space-between`}
        >
          <Typography variant="body1">{`CC: "${remark}"`}</Typography>
          <Button variant="contained" onClick={() => onView(appointment)}>
            VIEW
          </Button>
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
};
