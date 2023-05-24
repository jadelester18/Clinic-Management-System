import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import React, { useEffect } from "react";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import * as profileData from "../../../../../redux/GetApiCalls/profile";

function CalendarSettings({ onSelectedDateChange, date }) {
  // Fetching the Profile info
  const [profile, setProfile] = React.useState("");
  const fetchProfileData = async () => {
    try {
      const response = await profileData.getDoctorProfile();
      setProfile(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  const shouldDisableDate = (date) => {
    const scheduledDays = profile?.schedules?.map((schedule) => schedule.day);

    const today = dayjs(); // Get the current date

    // Disable all days before the current date
    if (date.isBefore(today, "day")) {
      return true;
    }

    // Disable the days that match the scheduled days in the profile
    if (
      scheduledDays &&
      scheduledDays.includes(date.format("dddd").toUpperCase())
    ) {
      return false;
    }

    return true;
  };

  // const [selectedDate, setSelectedDate] = React.useState("");

  const handleDateChange = (date) => {
    const formattedDate = dayjs(date).format("YYYY-MM-DD");
    // setSelectedDate(formattedDate);
    onSelectedDateChange(formattedDate); // Pass the selected date to the callback
  };

  console.log("Selected Date:", date);
  console.log("Selected Dateasd:", dayjs().date(date));

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer
        components={["DateCalendar", "DateCalendar", "DateCalendar"]}
      >
        <DemoItem>
          <DateCalendar
            // defaultValue={dayjs()}
            value={dayjs().date(date)}
            shouldDisableDate={shouldDisableDate}
            onChange={handleDateChange}
          />
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider>
  );
}

export default CalendarSettings;
