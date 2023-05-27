import {
  Avatar,
  Divider,
  Grid,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import React from "react";

const PatientSearchStep = () => {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item>
          <Typography variant="body1" mt={3}>
            Filter By:
          </Typography>
        </Grid>
        <Grid item xs={3} mt={1}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              sx={{ width: "100%" }}
              label="BirthDate"
              renderInput={(props) => (
                <TextField {...props} value={dayjs().format("YYYY-MM-DD")} />
              )}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={3}>
          <TextField
            autoFocus
            margin="dense"
            label="First Name"
            fullWidth
            variant="outlined"
            multiline
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            autoFocus
            margin="dense"
            label="Last Name"
            fullWidth
            variant="outlined"
            multiline
          />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <List
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              overflowY: "scroll",
              height: "15rem",
              "&::-webkit-scrollbar": {
                width: "0.4em",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#888",
              },
            }}
          >
            <ListItemButton alignItems="flex-start" fullWidth>
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
              </ListItemAvatar>
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
            </ListItemButton>
            <Divider component="li" />
          </List>
        </Grid>
      </Grid>
    </>
  );
};

const DoctorSearchStep = () => {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item>
          <Typography variant="body1" mt={3}>
            2 Filter By:
          </Typography>
        </Grid>
        <Grid item xs={3} mt={1}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              sx={{ width: "100%" }}
              label="BirthDate"
              renderInput={(props) => (
                <TextField {...props} value={dayjs().format("YYYY-MM-DD")} />
              )}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={3}>
          <TextField
            autoFocus
            margin="dense"
            label="First Name"
            fullWidth
            variant="outlined"
            multiline
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            autoFocus
            margin="dense"
            label="Last Name"
            fullWidth
            variant="outlined"
            multiline
          />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <List
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              overflowY: "scroll",
              height: "15rem",
              "&::-webkit-scrollbar": {
                width: "0.4em",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#888",
              },
            }}
          >
            <ListItemButton alignItems="flex-start" fullWidth>
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
              </ListItemAvatar>
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
            </ListItemButton>
            <Divider component="li" />
          </List>
        </Grid>
      </Grid>
    </>
  );
};

export default PatientSearchStep;
