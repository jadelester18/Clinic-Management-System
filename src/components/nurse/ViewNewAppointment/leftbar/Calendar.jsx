import { Badge, Box } from "@mui/material";
import { PickersDay, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import React, { useEffect, useState } from "react";
import * as appointmentSvc from "../../../../redux/GetApiCalls/appointment";
import { DEFAULT_DATE_FORMAT } from "../../../../redux/default";
import dayjs from "dayjs";

function ServerDay(props) {
  const { highlightedDays, day, outsideCurrentMonth, ...other } = props;

  const hasNewAppointment = highlightedDays.some((dateString) =>
    day.isSame(dateString, "day")
  );

  const isSelected = !outsideCurrentMonth && hasNewAppointment;
  // const isSelected = ;

  return (
    <Badge
      key={props.day.toString()}
      overlap="circular"
      variant="dot"
      invisible={!isSelected}
      color="error"
    >
      <PickersDay
        {...other}
        outsideCurrentMonth={outsideCurrentMonth}
        day={day}
      />
    </Badge>
  );
}

function Calendar({ date, onDateChange, appointments }) {
  const [highlightedDays, setHighlightedDays] = useState([]);

  const fetchHighlightedDays = async (date) => {
    try {
      const { data } = await appointmentSvc.getMonthDaysWithNewAppointments(
        date.format(DEFAULT_DATE_FORMAT)
      );
      setHighlightedDays(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (appointments) {
      fetchHighlightedDays(dayjs());
    }
  }, [appointments]);

  return (
    <Box flex={1} p={2} sx={{ display: { xs: "block" } }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box sx={{ position: "relative" }}>
          <StaticDatePicker
            value={date}
            orientation="portrait"
            showDaysOutsideCurrentMonth
            onMonthChange={fetchHighlightedDays}
            onChange={onDateChange}
            slots={{
              day: ServerDay,
            }}
            slotProps={{
              day: {
                highlightedDays,
              },
              actionBar: { actions: [] },
            }}
            sx={{ boxShadow: 10, borderRadius: 10 }}
          />
        </Box>
      </LocalizationProvider>
    </Box>
  );
}

export default Calendar;
