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
import CreatingNewWalkIn from "./CreatingNewWalkIn";

function NurseLeftBar() {
  const requestAbortController = React.useRef(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [highlightedDays, setHighlightedDays] = React.useState([1, 2, 15]);

  //Fetching the list of IDs
  const [idTypeIdList, setIdTypeIdList] = React.useState([]);

  useEffect(() => {
    const fetchIdTypeIdListData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/id-type`
        );
        setIdTypeIdList(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchIdTypeIdListData();
  }, []);

  //Storing the ID Number, Type, Path
  const [idTypeId, setIdTypeId] = React.useState("");
  const [idNumber, setIdNumber] = React.useState("");
  const [idFileUrl, setIdFileUrl] = React.useState("");

  //For Creating Appointment Modal
  const [openCreateAppointment, setOpenCreateAppointment] =
    React.useState(false);

  const handleClickOpenCreateAppointment = () => {
    setOpenCreateAppointment(true);
  };

  const handleCloseCreateAppointment = () => {
    setOpenCreateAppointment(false);
  };

  return (
    <Box flex={1} p={2}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box sx={{ position: "relative" }}>
          <StaticDatePicker
            orientation="portrait"
            showDaysOutsideCurrentMonth
            //   fixedWeekNumber={6}
            //   defaultValue={initialValue}
            //   loading={isLoading}
            //   onMonthChange={handleMonthChange}
            //   renderLoading={() => <DayCalendarSkeleton />}\

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
            onClick={handleClickOpenCreateAppointment}
          >
            <EditCalendarIcon />
          </Button>
        </Box>
      </LocalizationProvider>
      {/* For Creating New Appointment For Walk In */}
      <CreatingNewWalkIn
        openCreateAppointment={openCreateAppointment}
        handleCloseCreateAppointment={handleCloseCreateAppointment}
      />
    </Box>
  );
}

export default NurseLeftBar;
