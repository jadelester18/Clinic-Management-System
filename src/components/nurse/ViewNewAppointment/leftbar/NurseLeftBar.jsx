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
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
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
import { Add, Inbox } from "@mui/icons-material";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import axios from "axios";

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
      <Dialog
        open={openCreateAppointment}
        onClose={handleCloseCreateAppointment}
        maxWidth={"lg"}
      >
        <DialogTitle>New Appointment For Walk In</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <DialogContentText>
                Walk-in registration must be correct, and all information
                supplied by the patient must be true.
              </DialogContentText>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <TextField
                autoFocus
                margin="dense"
                label="Birth Date"
                fullWidth
                variant="standard"
                multiline
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                autoFocus
                margin="dense"
                label="First Name"
                fullWidth
                variant="standard"
                multiline
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                autoFocus
                margin="dense"
                label="Last Name"
                fullWidth
                variant="standard"
                multiline
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} mt={2}>
            <List component="nav" aria-label="main mailbox folders">
              <ListItemButton
                // selected={selectedIndex === 0}
                // onClick={(event) => handleListItemClick(event, 0)}
                fullWidth
              >
                <ListItemIcon>
                  <Inbox />
                </ListItemIcon>
                <ListItemText primary="Inbox" />
              </ListItemButton>
              <ListItemButton
                // selected={selectedIndex === 0}
                // onClick={(event) => handleListItemClick(event, 0)}
                fullWidth
              >
                <ListItemIcon>
                  <Inbox />
                </ListItemIcon>
                <ListItemText primary="Inbox" />
              </ListItemButton>
              <ListItemButton
                // selected={selectedIndex === 0}
                // onClick={(event) => handleListItemClick(event, 0)}
                fullWidth
              >
                <ListItemIcon>
                  <Inbox />
                </ListItemIcon>
                <ListItemText primary="Inbox" />
              </ListItemButton>
              {/* <ListItemButton
                selected={selectedIndex === 1}
                onClick={(event) => handleListItemClick(event, 1)}
              >
                <ListItemIcon>
                  <DraftsIcon />
                </ListItemIcon>
                <ListItemText primary="Drafts" />
              </ListItemButton> */}
            </List>
          </Grid>
          <Grid
            container
            spacing={2}
            mt={2}
            direction={{ xs: "column", sm: "row" }}
          >
            <Grid item xs={12} lg={6}>
              <Grid
                container
                direction="row"
                justifyContent="space-evenly"
                alignItems="center"
                spacing={2}
              >
                <Grid item xs={12}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <StaticDateTimePicker
                      orientation="landscape"
                      slotProps={{
                        actionBar: { actions: [] },
                      }}
                    />
                  </LocalizationProvider>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} lg={6}>
              <Grid
                container
                direction="row"
                justifyContent="space-evenly"
                alignItems="center"
                spacing={2}
              >
                <Grid item xs={3}>
                  <TextField
                    autoFocus
                    margin="dense"
                    label="First Name"
                    fullWidth
                    variant="standard"
                    multiline
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    autoFocus
                    margin="dense"
                    label="Middle Name"
                    fullWidth
                    variant="standard"
                    multiline
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    autoFocus
                    margin="dense"
                    label="Last Name"
                    fullWidth
                    variant="standard"
                    multiline
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    autoFocus
                    margin="dense"
                    label="Suffix"
                    fullWidth
                    variant="standard"
                    multiline
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    autoFocus
                    margin="dense"
                    label="Chief Complaint"
                    fullWidth
                    variant="standard"
                    multiline
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCreateAppointment}>Cancel</Button>
          <Button onClick={handleCloseCreateAppointment}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default NurseLeftBar;
