import {
  Autocomplete,
  Badge,
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import {
  DateCalendar,
  PickersDay,
  StaticDateTimePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import React, { useEffect } from "react";
import { styled } from "@mui/material/styles";
import Fab from "@mui/material/Fab";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { Add } from "@mui/icons-material";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import axios from "axios";
import CreatingNewWalkIn from "./SettingUpWalkIn/SetFormForWalkIn/CreatingNewWalkIn";
import SetUpWalkInPatient from "./SettingUpWalkIn/SetUpWalkInPatient";

function QueueCalendar({ date, onDateChange, onCreateWalkIn }) {
  //For Creating Appointment Modal
  // const [openCreateAppointment, setOpenCreateAppointment] =
  //   React.useState(false);

  // const handleClickOpenCreateAppointment = () => {
  //   setOpenCreateAppointment(true);
  // };

  // const handleCloseCreateAppointment = () => {
  //   setOpenCreateAppointment(false);
  // };

  return (
    <Box flex={1} p={2}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box sx={{ position: "relative" }}>
          <StaticDatePicker
            value={date}
            onChange={onDateChange}
            orientation="portrait"
            showDaysOutsideCurrentMonth
            slotProps={{
              actionBar: { actions: [] },
            }}
            sx={{ boxShadow: 10, borderRadius: 10 }}
          />
          <Button
            variant="contained"
            sx={{
              position: "absolute",
              top: 0,
              right: 0,
              zIndex: 1,
              margin: "1rem",
              borderRadius: "100%",
              height: 60,
            }}
            onClick={onCreateWalkIn}
          >
            <EditCalendarIcon />
          </Button>
        </Box>
      </LocalizationProvider>
      {/* For Creating New Appointment For Walk In */}
      {/* <SetUpWalkInPatient
        openCreateAppointment={openCreateAppointment}
        handleCloseCreateAppointment={handleCloseCreateAppointment}
      /> */}
    </Box>
  );
}

export default QueueCalendar;
