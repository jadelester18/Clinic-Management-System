import { LocalizationProvider, StaticTimePicker } from "@mui/x-date-pickers";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const ClockSettings = () => {
  const disableTime = (time) => {
    const selectedTime = dayjs(time);
    const disabledStartTime = dayjs(selectedTime).hour(8).minute(0);
    const disabledEndTime = dayjs(selectedTime).hour(9).minute(0);

    return selectedTime.isBetween(disabledStartTime, disabledEndTime);
  };

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
            shouldDisableTime={disableTime}
            // orientation="landscape"
            slotProps={{
              actionBar: { actions: [] },
            }}
          />
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider>
  );
};

export default ClockSettings;
