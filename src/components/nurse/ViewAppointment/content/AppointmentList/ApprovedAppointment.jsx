import {
  Avatar,
  Box,
  Button,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControlLabel,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  Switch,
  Typography,
  styled,
} from "@mui/material";
import React, { useState } from "react";
import DrawIcon from "@mui/icons-material/Draw";
import PersonIcon from "@mui/icons-material/Person";

const Android12Switch = styled(Switch)(({ theme }) => ({
  padding: 8,
  "& .MuiSwitch-track": {
    borderRadius: 22 / 2,
    "&:before, &:after": {
      content: '""',
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      width: 16,
      height: 16,
    },
    "&:before": {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main)
      )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
      left: 12,
    },
    "&:after": {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main)
      )}" d="M19,13H5V11H19V13Z" /></svg>')`,
      right: 12,
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "none",
    width: 16,
    height: 16,
    margin: 2,
  },
}));

const ApprovedAppointment = ({
  handleClickOpenViewPatientProfile,
  handleClickOpenCreateAppointment,
}) => {
  //For Cofirmation in saving enable or canceling appointment
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState("");

  const handleToggle = () => {
    if (isChecked) {
      setIsChecked(false);
      setConfirmationMessage(
        "Are you sure you want to cancel the appointment?"
      );
    } else {
      setIsChecked(true);
      setConfirmationMessage(
        "Are you sure you want to approve the appointment?"
      );
    }
    setConfirmationOpen(true);
  };

  const handleConfirmationClose = (confirmed) => {
    setConfirmationOpen(false);
    if (confirmed) {
      setIsChecked(!isChecked);
    }
  };

  return (
    <Box>
      <CardContent>
        <Typography variant="body2" p={2}>
          Approved Appointment Patients:
        </Typography>
        <ListItem>
          <Grid
            container
            spacing={2}
            justifyContent="space-around"
            columns={{ xs: 4, sm: 8, md: 12 }}
            fontWeight="bold"
            sx={{ paddingTop: "8px", borderRadius: 10 }}
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
            height: "25rem",
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
          {/* Add the header */}
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
                    <Avatar
                      alt="Remy Sharp"
                      src="/static/images/avatar/1.jpg"
                    />
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
                  aria-label="upload picture"
                  component="label"
                  onClick={handleClickOpenViewPatientProfile}
                >
                  {/* <input hidden accept="image/*" type="file" /> */}
                  <PersonIcon />
                </IconButton>
                <FormControlLabel
                  control={
                    <Android12Switch
                      checked={isChecked}
                      onChange={handleToggle}
                    />
                  }
                />
              </Grid>
            </Grid>
          </ListItem>
          <Divider variant="inset" component="li" />
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
                    <Avatar
                      alt="Remy Sharp"
                      src="/static/images/avatar/1.jpg"
                    />
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
                  aria-label="upload picture"
                  component="label"
                  onClick={handleClickOpenViewPatientProfile}
                >
                  {/* <input hidden accept="image/*" type="file" /> */}
                  <PersonIcon />
                </IconButton>
                <FormControlLabel
                  control={
                    <Android12Switch
                      checked={isChecked}
                      onChange={handleToggle}
                    />
                  }
                />
              </Grid>
            </Grid>
          </ListItem>
          <Divider variant="inset" component="li" />
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
                    <Avatar
                      alt="Remy Sharp"
                      src="/static/images/avatar/1.jpg"
                    />
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
                  aria-label="upload picture"
                  component="label"
                  onClick={handleClickOpenViewPatientProfile}
                >
                  {/* <input hidden accept="image/*" type="file" /> */}
                  <PersonIcon />
                </IconButton>
                <FormControlLabel
                  control={
                    <Android12Switch
                      checked={isChecked}
                      onChange={handleToggle}
                    />
                  }
                />
              </Grid>
            </Grid>
          </ListItem>
          <Divider variant="inset" component="li" />
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
                    <Avatar
                      alt="Remy Sharp"
                      src="/static/images/avatar/1.jpg"
                    />
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
                  aria-label="upload picture"
                  component="label"
                  onClick={handleClickOpenViewPatientProfile}
                >
                  {/* <input hidden accept="image/*" type="file" /> */}
                  <PersonIcon />
                </IconButton>
                <FormControlLabel
                  control={
                    <Android12Switch
                      checked={isChecked}
                      onChange={handleToggle}
                    />
                  }
                />
              </Grid>
            </Grid>
          </ListItem>
          <Divider variant="inset" component="li" />
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
                    <Avatar
                      alt="Remy Sharp"
                      src="/static/images/avatar/1.jpg"
                    />
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
                  aria-label="upload picture"
                  component="label"
                  onClick={handleClickOpenViewPatientProfile}
                >
                  {/* <input hidden accept="image/*" type="file" /> */}
                  <PersonIcon />
                </IconButton>
                <FormControlLabel
                  control={
                    <Android12Switch
                      checked={isChecked}
                      onChange={handleToggle}
                    />
                  }
                />
              </Grid>
            </Grid>
          </ListItem>
          <Divider variant="inset" component="li" />{" "}
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
                    <Avatar
                      alt="Remy Sharp"
                      src="/static/images/avatar/1.jpg"
                    />
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
                  aria-label="upload picture"
                  component="label"
                  onClick={handleClickOpenViewPatientProfile}
                >
                  {/* <input hidden accept="image/*" type="file" /> */}
                  <PersonIcon />
                </IconButton>
                <FormControlLabel
                  control={
                    <Android12Switch
                      checked={isChecked}
                      onChange={handleToggle}
                    />
                  }
                />
              </Grid>
            </Grid>
          </ListItem>
          <Divider variant="inset" component="li" />
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
                    <Avatar
                      alt="Remy Sharp"
                      src="/static/images/avatar/1.jpg"
                    />
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
                  aria-label="upload picture"
                  component="label"
                  onClick={handleClickOpenViewPatientProfile}
                >
                  {/* <input hidden accept="image/*" type="file" /> */}
                  <PersonIcon />
                </IconButton>
                <FormControlLabel
                  control={
                    <Android12Switch
                      checked={isChecked}
                      onChange={handleToggle}
                    />
                  }
                />
              </Grid>
            </Grid>
          </ListItem>
          <Divider variant="inset" component="li" />
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
                    <Avatar
                      alt="Remy Sharp"
                      src="/static/images/avatar/1.jpg"
                    />
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
                  aria-label="upload picture"
                  component="label"
                  onClick={handleClickOpenViewPatientProfile}
                >
                  {/* <input hidden accept="image/*" type="file" /> */}
                  <PersonIcon />
                </IconButton>
                <FormControlLabel
                  control={
                    <Android12Switch
                      checked={isChecked}
                      onChange={handleToggle}
                    />
                  }
                />
              </Grid>
            </Grid>
          </ListItem>
          <Divider variant="inset" component="li" />
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
                    <Avatar
                      alt="Remy Sharp"
                      src="/static/images/avatar/1.jpg"
                    />
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
                  aria-label="upload picture"
                  component="label"
                  onClick={handleClickOpenViewPatientProfile}
                >
                  {/* <input hidden accept="image/*" type="file" /> */}
                  <PersonIcon />
                </IconButton>
                <FormControlLabel
                  control={
                    <Android12Switch
                      checked={isChecked}
                      onChange={handleToggle}
                    />
                  }
                />
              </Grid>
            </Grid>
          </ListItem>
          <Divider variant="inset" component="li" />
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
                    <Avatar
                      alt="Remy Sharp"
                      src="/static/images/avatar/1.jpg"
                    />
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
                  aria-label="upload picture"
                  component="label"
                  onClick={handleClickOpenViewPatientProfile}
                >
                  {/* <input hidden accept="image/*" type="file" /> */}
                  <PersonIcon />
                </IconButton>
                <FormControlLabel
                  control={
                    <Android12Switch
                      checked={isChecked}
                      onChange={handleToggle}
                    />
                  }
                />
              </Grid>
            </Grid>
          </ListItem>
          <Divider variant="inset" component="li" />
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
                    <Avatar
                      alt="Remy Sharp"
                      src="/static/images/avatar/1.jpg"
                    />
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
                  aria-label="upload picture"
                  component="label"
                  onClick={handleClickOpenViewPatientProfile}
                >
                  {/* <input hidden accept="image/*" type="file" /> */}
                  <PersonIcon />
                </IconButton>
                <FormControlLabel
                  control={
                    <Android12Switch
                      checked={isChecked}
                      onChange={handleToggle}
                    />
                  }
                />
              </Grid>
            </Grid>
          </ListItem>
          <Divider variant="inset" component="li" />
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
                    <Avatar
                      alt="Remy Sharp"
                      src="/static/images/avatar/1.jpg"
                    />
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
                  aria-label="upload picture"
                  component="label"
                  onClick={handleClickOpenViewPatientProfile}
                >
                  {/* <input hidden accept="image/*" type="file" /> */}
                  <PersonIcon />
                </IconButton>
                <FormControlLabel
                  control={
                    <Android12Switch
                      checked={isChecked}
                      onChange={handleToggle}
                    />
                  }
                />
              </Grid>
            </Grid>
          </ListItem>
          <Divider variant="inset" component="li" />
        </List>
      </CardContent>
      {/* Cofirmation in saving enable or canceling appointment */}
      <Dialog
        open={confirmationOpen}
        onClose={() => handleConfirmationClose(false)}
      >
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>{confirmationMessage}</DialogContent>
        <DialogActions>
          <Button onClick={() => handleConfirmationClose(true)}>No</Button>
          <Button onClick={() => handleConfirmationClose(false)}>Yes</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ApprovedAppointment;
