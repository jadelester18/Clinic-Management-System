import {
  Avatar,
  CardContent,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import PersonIcon from "@mui/icons-material/Person";

const QueueScheduled = ({
  handleClickOpenViewPatientProfile,
  handleClickOpenCreateAppointment,
}) => {
  return (
    <CardContent>
      <Typography variant="body2" p={2}>
        Patients in Queue:
      </Typography>
      {/* Add the header */}
      <ListItem>
        <Grid
          container
          spacing={2}
          justifyContent="space-around"
          columns={{ xs: 4, sm: 8, md: 12 }}
          fontWeight="bold"
          sx={{ paddingTop: "8px" }}
          position="sticky"
          top={0}
          bgcolor="background.paper"
          zIndex={1}
        >
          <Typography variant="subtitle1">Name</Typography>
          <Typography variant="subtitle1"></Typography>
          <Typography variant="subtitle1">Type</Typography>
          <Typography variant="subtitle1">Time</Typography>
          <Typography variant="subtitle1">Action</Typography>
        </Grid>
      </ListItem>
      <List
        sx={{
          width: "100%",
          bgcolor: "background.paper",
          borderRadius: 10,
          display: "flex",
          flexDirection: "column",
          height: "20rem",
          overflowY: "scroll",
          "&::-webkit-scrollbar": {
            width: "0.4em",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#888",
          },
          padding: 2,
        }}
        dense={true}
      >
        <Divider component="li" />
        <ListItem alignItems="flex-start">
          <Grid
            container
            spacing={2}
            justifyContent={"space-between"}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            <Grid item>
              <Stack direction={{ xs: "column", md: "row" }}>
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
              </Stack>
            </Grid>
            <Grid item>
              <Stack direction={{ xs: "row" }}>
                <Typography variant="h6">Walk In</Typography>
                <Typography variant="h6">Appointment</Typography>
              </Stack>
            </Grid>
            <Grid item>
              <Stack direction={{ xs: "row" }}>
                <Typography variant="h6">1: 45 pm</Typography>
                <Typography variant="h6">-</Typography>
                <Typography variant="h6">32 min</Typography>
              </Stack>
            </Grid>
            <Grid item>
              <IconButton
                color="secondary"
                aria-label="profile information"
                component="label"
                onClick={handleClickOpenViewPatientProfile}
              >
                {/* <input hidden accept="image/*" type="file" /> */}
                <PersonIcon />
              </IconButton>
              <FormControl sx={{ minWidth: 120 }} size="small">
                <InputLabel id="demo-simple-select-label">Status</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Age"
                >
                  <MenuItem value={10}>Schedule</MenuItem>
                  <MenuItem value={20}>For Assessment</MenuItem>
                  <MenuItem value={30}>On Going Assessment</MenuItem>
                  <MenuItem value={20}>For Consultation</MenuItem>
                  <MenuItem value={30}>On Going Consultation</MenuItem>
                  <MenuItem value={30}>Finish</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </ListItem>
        <Divider component="li" />
        <ListItem alignItems="flex-start">
          <Grid
            container
            spacing={2}
            justifyContent={"space-between"}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            <Grid item>
              <Stack direction={{ xs: "column", md: "row" }}>
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
              </Stack>
            </Grid>
            <Grid item>
              <Stack direction={{ xs: "row" }}>
                <Typography variant="h6">Walk In</Typography>
                <Typography variant="h6">Appointment</Typography>
              </Stack>
            </Grid>
            <Grid item>
              <Stack direction={{ xs: "row" }}>
                <Typography variant="h6">1: 45 pm</Typography>
                <Typography variant="h6">-</Typography>
                <Typography variant="h6">32 min</Typography>
              </Stack>
            </Grid>
            <Grid item>
              <IconButton
                color="secondary"
                aria-label="profile information"
                component="label"
                onClick={handleClickOpenViewPatientProfile}
              >
                {/* <input hidden accept="image/*" type="file" /> */}
                <PersonIcon />
              </IconButton>
              <FormControl sx={{ minWidth: 120 }} size="small">
                <InputLabel id="demo-simple-select-label">Status</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Age"
                >
                  <MenuItem value={10}>Schedule</MenuItem>
                  <MenuItem value={20}>For Assessment</MenuItem>
                  <MenuItem value={30}>On Going Assessment</MenuItem>
                  <MenuItem value={20}>For Consultation</MenuItem>
                  <MenuItem value={30}>On Going Consultation</MenuItem>
                  <MenuItem value={30}>Finish</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </ListItem>
        <Divider component="li" />
      </List>
    </CardContent>
  );
};

export default QueueScheduled;
