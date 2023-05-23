import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import React from "react";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const CalendarSettings = () => {
  const shouldDisableDate = (date) => {
    const today = dayjs(); // Get the current date
    const dayOfWeek = date.day();

    // Disable all days before the current date
    if (date.isBefore(today, "day")) {
      return true;
    }

    // Enable only Mondays and Wednesdays
    return dayOfWeek !== 1 && dayOfWeek !== 3;
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer
        components={["DateCalendar", "DateCalendar", "DateCalendar"]}
      >
        <DemoItem>
          <DateCalendar
            defaultValue={dayjs()}
            shouldDisableDate={shouldDisableDate}
          />
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider>
  );
};

export default CalendarSettings;
