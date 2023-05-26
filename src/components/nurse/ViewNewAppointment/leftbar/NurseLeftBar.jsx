import {
  Autocomplete,
  Avatar,
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
  Divider,
  FormControl,
  Grid,
  InputLabel,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import {
  DateCalendar,
  PickersDay,
  StaticDateTimePicker,
  LocalizationProvider,
  DatePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Fab from "@mui/material/Fab";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { Add, Inbox } from "@mui/icons-material";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import axios from "axios";
import {
  countries,
  provinces,
  cities,
} from "../../../../pages/addressDb/adress";

function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

/**
 * Mimic fetch with abort controller https://developer.mozilla.org/en-US/docs/Web/API/AbortController/abort
 * ⚠️ No IE11 support
 */
function fakeFetch(date, { signal }) {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      const daysInMonth = date.daysInMonth();
      const daysToHighlight = [1, 2, 3].map(() =>
        getRandomNumber(1, daysInMonth)
      );

      resolve({ daysToHighlight });
    }, 500);

    signal.onabort = () => {
      clearTimeout(timeout);
      reject(new DOMException("aborted", "AbortError"));
    };
  });
}

const initialValue = dayjs("2022-04-17");

function ServerDay(props) {
  const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;

  const isSelected =
    !props.outsideCurrentMonth && highlightedDays.indexOf(props.day.date()) > 0;

  return (
    <Badge
      key={props.day.toString()}
      overlap="circular"
      badgeContent={isSelected ? "🌚" : undefined}
    >
      <PickersDay
        {...other}
        outsideCurrentMonth={outsideCurrentMonth}
        day={day}
      />
    </Badge>
  );
}

function NurseLeftBar() {
  const requestAbortController = React.useRef(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [highlightedDays, setHighlightedDays] = React.useState([1, 2, 15]);

  const fetchHighlightedDays = (date) => {
    const controller = new AbortController();
    fakeFetch(date, {
      signal: controller.signal,
    })
      .then(({ daysToHighlight }) => {
        setHighlightedDays(daysToHighlight);
        setIsLoading(false);
      })
      .catch((error) => {
        // ignore the error if it's caused by `controller.abort`
        if (error.name !== "AbortError") {
          throw error;
        }
      });

    requestAbortController.current = controller;
  };

  React.useEffect(() => {
    fetchHighlightedDays(initialValue);
    // abort request on unmount
    return () => requestAbortController.current?.abort();
  }, []);

  //For Creating Appointment Modal
  const [openCreateAppointment, setOpenCreateAppointment] =
    React.useState(false);

  const handleClickOpenCreateAppointment = () => {
    setOpenCreateAppointment(true);
  };

  const handleCloseCreateAppointment = () => {
    setOpenCreateAppointment(false);
  };

  const [country, setCountry] = React.useState([]);
  const [province, setProvince] = React.useState([]);
  const [city, setCity] = React.useState([]);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [filteredCities, setFilteredCities] = useState([]);

  const handleProvinceChange = (event) => {
    setSelectedProvince(event);

    const filteredCities = cities.filter(
      (city) => city.province_code === event
    );
    setFilteredCities(filteredCities);
  };

  return (
    <Box flex={1} p={2} sx={{ display: { xs: "block" } }}>
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
      {/* For Creating New Appointment For Walk In */}
    </Box>
  );
}

export default NurseLeftBar;
