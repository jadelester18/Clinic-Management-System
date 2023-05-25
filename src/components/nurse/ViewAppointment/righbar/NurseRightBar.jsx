import {
  Autocomplete,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import DrawIcon from "@mui/icons-material/Draw";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ViewInArIcon from "@mui/icons-material/ViewInAr";
import React, { useEffect } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDateTimePicker } from "@mui/x-date-pickers";
import axios from "axios";

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
          <Typography variant="body2" p={2}>
            Doctors Available:
          </Typography>
          <List
            sx={{
              width: "100%",
              bgcolor: "background.paper",
              borderRadius: 10,
            }}
          >
            <ListItemButton alignItems="flex-start">
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

              <Stack
                direction={{ xs: "column", md: "row" }}
                // justifyContent="center"
                // alignItems="center"
                spacing={2}
              >
                <Chip label="1" color="primary" />
                <Chip
                  label="5"
                  sx={{ backgroundColor: "orange", color: "black" }}
                />
                <Typography sx={{ color: "green" }} variant="body1">
                  Available
                </Typography>
                <Typography sx={{ color: "red" }} variant="body1">
                  With Patient
                </Typography>
              </Stack>
            </ListItemButton>
            <Divider variant="inset" component="li" />
          </List>
        </CardContent>
      </Card>
    </Box>
  );
}

export default NurseRightBar;
