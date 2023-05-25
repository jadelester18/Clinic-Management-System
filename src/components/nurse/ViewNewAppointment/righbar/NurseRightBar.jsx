import {
  Autocomplete,
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
  FormControlLabel,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Switch,
  TextField,
  Tooltip,
  Typography,
  styled,
} from "@mui/material";
import DrawIcon from "@mui/icons-material/Draw";
import ViewInArIcon from "@mui/icons-material/ViewInAr";
import React, { useEffect } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDateTimePicker } from "@mui/x-date-pickers";
import axios from "axios";

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

function NurseRightBar() {
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

  //For Creating Appointment Confirmation
  const [openConfirmation, setOpenConfirmation] = React.useState(false);

  const handleClickOpenConfirmation = () => {
    setOpenConfirmation(true);
  };

  const handleClickCloseConfirmation = () => {
    setOpenConfirmation(false);
  };

  //Open view patient profile
  const [openViewPatientProfile, setOpenViewPatientProfile] =
    React.useState(false);

  const handleClickOpenViewPatientProfile = () => {
    setOpenViewPatientProfile(true);
  };

  const handleClickCloseViewPatientProfile = () => {
    setOpenViewPatientProfile(false);
  };
  return (
    <Box flex={2} p={2}>
      <Card sx={{ height: 440, borderRadius: 10 }} elevation={3}>
        <CardContent>
          <List
            sx={{
              width: "100%",
              bgcolor: "background.paper",
              borderRadius: 10,
            }}
          >
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
              </ListItemAvatar>
              <ListItemText
                primary="Ballester, Jade Lester C."
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      Dr. Stone
                    </Typography>
                    {" — 1:00 pm to 1:15 pm"}
                  </React.Fragment>
                }
              />
              <Tooltip title="View Patient Information">
                <IconButton
                  color="secondary"
                  aria-label="upload picture"
                  component="label"
                  onClick={handleClickOpenViewPatientProfile}
                >
                  {/* <input hidden accept="image/*" type="file" /> */}
                  <ViewInArIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Update Appointment">
                <IconButton
                  color="success"
                  aria-label="upload picture"
                  component="label"
                  onClick={handleClickOpenCreateAppointment}
                >
                  <DrawIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Approve Appointment">
                <FormControlLabel
                  control={<Android12Switch defaultChecked />}
                />
              </Tooltip>
            </ListItem>
            <Divider variant="inset" component="li" />
          </List>
        </CardContent>
      </Card>

      {/* Updating appointment */}
      {/* For Creating New Appointment For Walk In */}
      <Dialog
        open={openCreateAppointment}
        onClose={handleCloseCreateAppointment}
      >
        <DialogTitle>Ballester, Jade Lester C.</DialogTitle>
        <DialogTitle variant="subtitle2">
          Dr. Ballester, Jade Lester C.
        </DialogTitle>
        <DialogContent>
          <Grid
            container
            spacing={2}
            mt={2}
            direction={{ xs: "column", sm: "row" }}
          >
            <Grid item xs={12}>
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
            <Grid item xs={12}>
              <Grid
                container
                direction="row"
                justifyContent="space-evenly"
                alignItems="center"
                spacing={2}
              >
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

                <Grid item xs={12}>
                  <TextField
                    name="idNumber"
                    fullWidth
                    label="Reason Of Update"
                    autoComplete="idNumber"
                    onChange={(e) => setIdNumber(e.target.value)}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <DialogContentText
                    variant="caption"
                    sx={{ color: "red" }}
                    mt={2}
                  >
                    Note: Changes to the appointment must be coordinated with
                    the patient.
                  </DialogContentText>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCreateAppointment}>Cancel</Button>
          <Button onClick={handleClickOpenConfirmation}>Save</Button>
        </DialogActions>
      </Dialog>
      {/* Cofirmation in saving update of appointment */}
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
              handleCloseCreateAppointment();
              handleClickCloseConfirmation();
            }}
            autoFocus
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
      {/* Checking profile of the patient with history */}
      <Dialog
        open={openViewPatientProfile}
        onClose={handleClickCloseViewPatientProfile}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth={"lg"}
        fullWidth={true}
      >
        <DialogTitle id="alert-dialog-title">{"Patient Name Here"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Patient Records
          </DialogContentText>
        </DialogContent>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="subtitle2">Old Records :</Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Button variant="contained" fullWidth>
                      Report Title
                    </Button>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Button variant="contained" fullWidth>
                      Report Title
                    </Button>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Button variant="contained" fullWidth>
                      Report Title
                    </Button>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Button variant="contained" fullWidth>
                      Report Title
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={8}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="subtitle2">
                      Patient Information :
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <TextField
                      id="outlined-basic"
                      label="First Name"
                      variant="outlined"
                      fullWidth
                      disabled
                    />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <TextField
                      id="outlined-basic"
                      label="Middle Name"
                      variant="outlined"
                      fullWidth
                      disabled
                    />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <TextField
                      id="outlined-basic"
                      label="Last Name"
                      variant="outlined"
                      fullWidth
                      disabled
                    />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <TextField
                      id="outlined-basic"
                      label="Suffix"
                      variant="outlined"
                      fullWidth
                      disabled
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="outlined-basic"
                      label="Address"
                      variant="outlined"
                      fullWidth
                      disabled
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      id="outlined-basic"
                      label="HMO Covered"
                      variant="outlined"
                      fullWidth
                      disabled
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      id="outlined-basic"
                      label="Contact Number"
                      variant="outlined"
                      fullWidth
                      disabled
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      id="outlined-basic"
                      label="Email"
                      variant="outlined"
                      fullWidth
                      disabled
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClickCloseViewPatientProfile}
            variant="contained"
          >
            Close
          </Button>
          {/* <Button
            onClick={() => {
              handleClickCloseViewPatientProfile();
            }}
            autoFocus
          >
            Agree
          </Button> */}
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default NurseRightBar;
