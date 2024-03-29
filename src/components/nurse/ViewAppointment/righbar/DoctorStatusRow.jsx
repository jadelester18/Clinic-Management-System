import {
  Avatar,
  Chip,
  Divider,
  Grid,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import * as util from "../../../../redux/util";
import { DAY_OF_WEEK_FORMAT } from "../../../../redux/default";

export default function DoctorStatusRow({
  selected,
  date,
  doctorStatus,
  onSelect,
}) {
  const { doctor, status, totalForConsultation, totalNotYetAssessed } =
    doctorStatus;

  const schedule = doctor.schedules.find(
    (sched) => sched.day === date.format(DAY_OF_WEEK_FORMAT).toUpperCase()
  );

  function isSelected() {
    return selected ? selected.id === doctor.id : false;
  }

  function handleSelect() {
    onSelect(isSelected() ? null : doctor);
  }

  const styles = {
    liButton: {
      borderRadius: 10,
      border: isSelected() ? 1 : 0,
      borderColor: isSelected() ? "#00D5FA" : "none",
    },
  };

  return (
    <>
      <ListItemButton
        alignItems="center"
        sx={styles.liButton}
        onClick={handleSelect}
        selected={isSelected()}
      >
        <Grid container alignItems="stretch" spacing={1}>
          <Grid item xs={12} md={4}>
            <Stack
              direction={{ xs: "column", md: "row" }}
              alignItems="center"
              height="100%"
            >
              <ListItemAvatar sx={{ m: "auto" }}>
                <Avatar
                  alt={doctor.firstName}
                  src={doctor.avatarUrl || "/static/images/avatar/1.jpg"}
                />
              </ListItemAvatar>
              <ListItemText
                sx={{ textAlign: { xs: "center", md: "left" } }}
                disableTypography
                primary={
                  <Typography variant="body1">{util.name(doctor)}</Typography>
                }
                secondary={
                  <Typography variant="caption">
                    {doctor.specialization.description}
                  </Typography>
                }
              />
            </Stack>
          </Grid>
          <Grid item xs={12} md={4}>
            <Stack justifyContent="center" alignItems="center" height="100%">
              <Typography variant="subtitle2">
                {util.morningSchedule(schedule?.timeSlots)}
              </Typography>
              <Typography variant="subtitle2">
                {util.afternoonSchedule(schedule?.timeSlots)}
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={12} md={4}>
            <Stack
              direction={{ xs: "column", md: "row" }}
              justifyContent="center"
              alignItems="center"
              spacing={2}
              height="100%"
            >
              {status === "AVAILABLE" && (
                <Typography sx={{ color: "green" }} variant="body1">
                  AVAILABLE
                </Typography>
              )}
              {status === "WITH_PATIENT" && (
                <Typography sx={{ color: "red" }} variant="body1">
                  WITH PATIENT
                </Typography>
              )}
              {status === "UNAVAILABLE" && (
                <Typography sx={{ color: "red" }} variant="body1">
                  UNAVAILABLE
                </Typography>
              )}
              <Stack direction="row" spacing={1}>
                <Chip
                  label={totalNotYetAssessed}
                  sx={{ backgroundColor: "orange", color: "black" }}
                />
                <Chip label={totalForConsultation} color="primary" />
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </ListItemButton>
      <Divider variant="middle" component="li" />
    </>
  );
}
