import {
  Divider,
  Grid,
  Typography,
  ListItemButton,
  Stack,
  ListItemAvatar,
  Avatar,
  ListItemText,
} from "@mui/material";
import React from "react";
import * as util from "../../../../../../redux/util";
import { DAY_OF_WEEK_FORMAT } from "../../../../../../redux/default";

export default function DoctorRow({ selected, doctor, date, onSelect }) {
  const schedule = doctor.schedules.find(
    (sched) => sched.day === date.format(DAY_OF_WEEK_FORMAT).toUpperCase()
  );
  function isSelected() {
    return selected ? selected.id === doctor.id : false;
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
        onClick={() => onSelect(doctor)}
        selected={isSelected()}
        sx={styles.liButton}
      >
        <Grid container {...styles.gContainer}>
          <Grid item {...styles.gItem}>
            <Stack direction={{ xs: "column", md: "row" }} {...styles.stack}>
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
                  <Typography variant="body2">
                    {doctor.specialization.description}
                  </Typography>
                }
              />
            </Stack>
          </Grid>
          <Grid item {...styles.gItem}>
            <Stack direction="column" {...styles.stack}>
              <Typography variant="body2">{doctor.email}</Typography>
              <Typography variant="body2">{doctor.contactNo}</Typography>
            </Stack>
          </Grid>
          <Grid item {...styles.gItem}>
            <Stack {...styles.stack}>
              {schedule ? (
                <>
                  <Typography variant="subtitle2">
                    {util.morningSchedule(schedule?.timeSlots)}
                  </Typography>
                  <Typography variant="subtitle2">
                    {util.afternoonSchedule(schedule?.timeSlots)}
                  </Typography>
                </>
              ) : (
                <Typography variant="button" color="error">{`No ${date.format(
                  DAY_OF_WEEK_FORMAT
                )} schedule`}</Typography>
              )}
            </Stack>
          </Grid>
          <Grid item xs={12} md={3.5}></Grid>
        </Grid>
      </ListItemButton>
      <Divider variant="middle" component="li" />
    </>
  );
}
