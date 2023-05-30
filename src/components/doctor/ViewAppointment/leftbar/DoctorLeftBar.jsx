import {
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import { PickersDay } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import React from "react";
import { styled } from "@mui/material/styles";
import Fab from "@mui/material/Fab";

function DoctorLeftBar() {
  return (
    <Box
      flex={2}
      // p={2}
      sx={{ display: { xs: "block", sm: "block", lg: "block" } }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
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
            </Box>
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12}>
          <List
            sx={{
              width: "100%",
              //   maxWidth: 360,
              bgcolor: "background.paper",
              boxShadow: 5,
              borderRadius: 10,
              display: "flex",
              flexDirection: "column",
              height: "25rem",
              overflowY: "scroll",
            }}
          >
            <ListItem alignItems="flex-start" disablePadding dense>
              <Button>
                <ListItemAvatar>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                </ListItemAvatar>
              </Button>
              <ListItemText
                primary="Brunch this weekend?"
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      Ali Connors
                    </Typography>
                    {" — I'll be in your neighborhood doing errands this…"}
                  </React.Fragment>
                }
              />
              <Button variant="contained" size="small">
                MC
              </Button>
            </ListItem>
            <Divider variant="inset" component="li" />
          </List>
        </Grid>
      </Grid>
    </Box>
  );
}

export default DoctorLeftBar;
