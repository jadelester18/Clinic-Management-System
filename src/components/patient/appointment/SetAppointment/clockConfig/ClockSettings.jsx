import { LocalizationProvider, StaticTimePicker } from "@mui/x-date-pickers";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import React, { useEffect } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import axios from "axios";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { TextField } from "@mui/material";

const ClockSettings = ({ selectedDateInCalendar, onSelectedTimeChange }) => {
  const userLoggedinDetails = useSelector((state) => state.user);
  let userObject = userLoggedinDetails?.user;
  let token = userObject.token;

  let location = useLocation();
  let id = location.pathname.split("/")[2];

  // Fetching the Doctor Available Time
  const [profile, setProfile] = React.useState([]);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/v1/doctors/${id}/schedules/available-slots/${selectedDateInCalendar}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Use the 'Authorization' header
            },
          }
        );
        setProfile(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProfileData();
  }, [token, selectedDateInCalendar, id]);

  const isTimeDisabled = (time) => {
    const formattedTime = dayjs(time).format("HH:mm:ss");

    return !profile.some((slot) => {
      const startTime = slot.startTime;
      const endTime = slot.endTime;
      return formattedTime >= startTime && formattedTime < endTime;
    });
  };

  const [selectedTime, setSelectedTime] = React.useState("");

  const handleTimeChange = (time) => {
    const formattedDate = dayjs(time).format("HH:mm:ss");
    setSelectedTime(formattedDate);

    const matchedTime = getMatchTime();
    console.log("Matched Time:", matchedTime?.id);
    onSelectedTimeChange(matchedTime?.id); // Pass the selected date to the callback
  };

  console.log("Selected Time:", selectedTime);

  function getMatchTime() {
    return profile.find((timeMatch) => timeMatch.startTime === selectedTime);
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer
        components={[
          "TimePicker",
          "MobileTimePicker",
          "DesktopTimePicker",
          "StaticTimePicker",
        ]}
      >
        <DemoItem>
          <StaticTimePicker
            defaultValue={dayjs("2022-04-17T15:30")}
            minutesStep={15}
            slotProps={{
              actionBar: { actions: [] },
            }}
            renderInput={(params) => <TextField {...params} />}
            shouldDisableTime={isTimeDisabled}
            onChange={handleTimeChange}
          />
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider>
  );
};

export default ClockSettings;
