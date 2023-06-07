import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import { Link } from "react-router-dom";

const DoctorsCardInfo = ({ doctor }) => {
  // Function to convert time format
  const formatTime = (time) => {
    const [hours, minutes, seconds] = time.split(":");
    let suffix = "am";

    // Convert hours to 12-hour format
    let formattedHours = parseInt(hours);
    if (formattedHours >= 12) {
      formattedHours -= 12;
      suffix = "pm";
    }
    if (formattedHours === 0) {
      formattedHours = 12;
    }

    // Add leading zeros to minutes and seconds
    const formattedMinutes = minutes.padStart(2, "0");
    const formattedSeconds = seconds.padStart(2, "0");

    // Return formatted time string
    return `${formattedHours}:${formattedMinutes} ${suffix}`;
  };

  const scheduleInfo = {};

  doctor?.schedules?.forEach((day) => {
    const morningStartTimes = [];
    const afternoonStartTimes = [];
    let morningEndTime = "";
    let afternoonEndTime = "";

    day?.timeSlots?.forEach((time) => {
      const startTime = formatTime(time.startTime);
      const endTime = formatTime(time.endTime);

      // Check if the start time is in the morning or afternoon
      const startHour = parseInt(time.startTime.split(":")[0]);
      if (startHour >= 9 && startHour < 12) {
        morningStartTimes.push(startTime);
        morningEndTime = endTime;
      } else if (startHour >= 13 && startHour <= 15) {
        afternoonStartTimes.push(startTime);
        afternoonEndTime = endTime;
      }
    });

    const dayOfWeek = day.day;

    scheduleInfo[dayOfWeek] = {
      morningStart: morningStartTimes.length > 0 ? morningStartTimes[0] : "",
      morningEnd: morningEndTime,
      afternoonStart:
        afternoonStartTimes.length > 0 ? afternoonStartTimes[0] : "",
      afternoonEnd: afternoonEndTime,
    };
  });

  return (
    <Card
      sx={{
        height: { xs: "100%" },
        maxWidth: { xs: "100%" },
        boxShadow: 10,
        borderRadius: 10,
        display: "flex", // Add display:flex to enable flexbox layout
        flexDirection: "column", // Set the flex direction to column
      }}
    >
      <Stack
        direction={{ xs: "column" }}
        justifyContent="center"
        alignItems="center"
        textAlign="center"
      >
        <Avatar
          sx={{
            m: 1,
            bgcolor: "primary.main",
            width: { xs: 100, sm: 130, md: 140 },
            height: { xs: 100, sm: 130, md: 140 },
            border: "5px solid white",
            boxShadow: 10,
          }}
          src={doctor.avatarUrl || ""}
        />
        <CardContent>
          <Typography variant="h6">
            {doctor?.honorific +
              " " +
              doctor?.firstName +
              " " +
              doctor?.middleName +
              " " +
              doctor?.lastName}{" "}
            {doctor?.suffixName !== "" || null ? doctor?.suffixName : ""}
          </Typography>
        </CardContent>
        <CardContent>
          <Typography variant="h6">
            {doctor?.specialization?.description}
            <Typography variant="subtitle2" color="text.secondary">
              {doctor?.subspecialization?.description}
            </Typography>
          </Typography>
        </CardContent>
        <CardContent>
          {Object.entries(scheduleInfo).map(([dayOfWeek, schedule]) => (
            <Typography variant="body2" color="text.secondary" key={dayOfWeek}>
              {dayOfWeek}
              <Typography
                variant="subtitle2"
                color="text.primary"
                sx={
                  schedule.morningStart
                    ? { display: "block" }
                    : { display: "none" }
                }
              >
                Morning:{" "}
                {schedule.morningStart
                  ? `${schedule.morningStart} - ${schedule.morningEnd}`
                  : " "}
              </Typography>
              <Typography
                variant="subtitle2"
                color="text.primary"
                sx={
                  schedule.afternoonStart
                    ? { display: "block" }
                    : { display: "none" }
                }
              >
                Afternoon:{" "}
                {schedule.afternoonStart
                  ? `${schedule.afternoonStart} - ${schedule.afternoonEnd}`
                  : " "}
              </Typography>
            </Typography>
          ))}
        </CardContent>{" "}
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            HMO Accreditation
            {doctor?.hmoAccreditation.map((hmo) => (
              <Typography
                variant="subtitle2"
                color="text.primary"
                key={hmo?.title}
              >
                {hmo?.title.length > 25
                  ? hmo?.title.substring(0, 25) + "... "
                  : hmo?.title}
              </Typography>
            ))}
          </Typography>
        </CardContent>
      </Stack>
      <CardActions
        disableSpacing
        sx={{ justifyContent: "center", marginTop: "auto" }}
      >
        <Button
          variant="contained"
          startIcon={<EditCalendarIcon />}
          sx={{ borderRadius: 10 }}
          component={Link}
          to={`/profile/${doctor?.id}`}
        >
          Book An Appointment
        </Button>
      </CardActions>
    </Card>
  );
};

export default DoctorsCardInfo;
