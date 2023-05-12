import {
  Avatar,
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
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import DrawIcon from "@mui/icons-material/Draw";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDateTimePicker } from "@mui/x-date-pickers";

function NurseRightBar() {
  const [open, setOpen] = React.useState(false);
  const [openConfirmation, setOpenConfirmation] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickClose = () => {
    setOpen(false);
  };

  const handleClickOpenConfirmation = () => {
    setOpenConfirmation(true);
  };

  const handleClickCloseConfirmation = () => {
    setOpenConfirmation(false);
  };

  return (
    <Box
      flex={2}
      p={2}
      sx={{ display: { xs: "block", sm: "block", lg: "block" } }}
    >
      <Card sx={{ maxWidth: 1000, height: 480 }} elevation={3}>
        <CardContent>
          <List
            sx={{ width: "100%", maxWidth: 1000, bgcolor: "background.paper" }}
          >
            <ListItem alignItems="flex-start">
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
              <IconButton
                color="success"
                aria-label="upload picture"
                component="label"
                onClick={handleClickOpen}
              >
                {/* <input hidden accept="image/*" type="file" /> */}
                <DrawIcon />
              </IconButton>
              <IconButton
                color="secondary"
                aria-label="upload picture"
                component="label"
              >
                {/* <input hidden accept="image/*" type="file" /> */}
                <DeleteForeverIcon />
              </IconButton>
            </ListItem>
            <Divider variant="inset" component="li" />
          </List>
        </CardContent>
      </Card>

      {/* Updating appointment */}
      <Dialog
        open={open}
        onClose={handleClickClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle>Patient 101</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please be sure that you're updating the correct patient.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            value="jadelesterballester@gmail.com"
            disabled
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <StaticDateTimePicker
              orientation="landscape"
              //   componentsProps={{
              //     actionBar: { actions: ["today", "accept", "cancel", "clear"] },
              //   }}
              slotProps={{ actionBar: { actions: [] } }}
            />
          </LocalizationProvider>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickClose}>Cancel</Button>
          <Button onClick={handleClickOpenConfirmation}>Save</Button>
        </DialogActions>
      </Dialog>
      {/* Cofirmation Dialog */}
      <Dialog
        open={openConfirmation}
        onClose={handleClickCloseConfirmation}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to update this appointment?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This will reflect to that date.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickCloseConfirmation}>Disagree</Button>
          <Button
            onClick={() => {
              handleClickCloseConfirmation();
              handleClickClose();
            }}
            autoFocus
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default NurseRightBar;
