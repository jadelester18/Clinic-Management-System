import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Checkbox,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Menu,
  MenuItem,
  Modal,
  Select,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { useSelector } from "react-redux";
import axios from "axios";
import dayjs from "dayjs";
import OutlinedInput from "@mui/material/OutlinedInput";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Circle } from "@mui/icons-material";
import CircleIcon from "@mui/icons-material/Circle";
import * as queueSvc from "../../../../redux/GetApiCalls/queue";
import * as util from "../../../../redux/util";
import { green, orange, red } from "@mui/material/colors";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];

const PatientLeftBar = ({ currentPatient }) => {
  console.log("HMO CARDS", currentPatient.hmoCards);

  const [queueToday, setQueueToday] = useState(null);

  //For Profile Modal
  const [openProfile, setOpenProfile] = React.useState(false);
  const handleOpenProfile = () => setOpenProfile(true);
  const handleCloseProfile = () => setOpenProfile(false);

  //For Dropdown Profile Option
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  //For Profile Picture
  const [profilePicleUrl, setProfilePic] = React.useState("");

  //For Select Check Box
  const [personName, setPersonName] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  async function fetchQueueForToday() {
    try {
      const { data } = await queueSvc.getPatientQueueForToday();
      console.log("QUEUE FOR TODAY", data);
      setQueueToday(data);
    } catch (error) {
      console.error(error);
    }
  }

  const queueColor = () => {
    if (queueToday) {
      switch (queueToday.checkInStatus) {
        case "SCHEDULED":
        case "ONGOING_ASSESSMENT":
        case "ONGOING_CONSULTATION":
          return red[500];
        case "FINISHED":
          return green[500];
        default:
          return orange[500];
      }
    }
  };

  useEffect(() => {
    fetchQueueForToday();
  }, []);

  const styles = {
    card: {
      width: { xs: 360, sm: 600, md: 400 },
      justifyContent: "center",
      alignItems: "center",
      boxShadow: 10,
      borderRadius: 10,
    },
    avatar: {
      m: 1,
      bgcolor: "primary.main",
      width: { xs: 100, sm: 130, md: 140 },
      height: { xs: 100, sm: 130, md: 140 },
      border: "5px solid white",
      boxShadow: 10,
    },
  };

  return (
    currentPatient && (
      <Card sx={styles.card}>
        <CardHeader
          action={
            <IconButton onClick={handleOpenUserMenu}>
              <MoreVertIcon />
            </IconButton>
          }
        />
        <Menu
          sx={{ mt: "45px" }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          <MenuItem
            onClick={() => {
              handleCloseUserMenu();
            }}
          >
            <Typography textAlign="center" onClick={handleOpenProfile}>
              Edit Profile
            </Typography>
          </MenuItem>
        </Menu>
        <Stack
          direction={{ xs: "column" }}
          justifyContent="center"
          alignItems="center"
          textAlign="center"
          marginTop={{ xs: "-10%" }}
        >
          <Button
            sx={{ backgroundColor: "transparent", borderRadius: "100%" }}
            onClick={handleOpenProfile}
          >
            <Box sx={{ position: "relative" }}>
              <Avatar
                alt={`patient`}
                src={currentPatient.avatar || ""}
                sx={styles.avatar}
              />
              {queueToday && (
                <Tooltip title="Queue status">
                  <Typography
                    variant="contained"
                    sx={stylesStatus.button}
                    color={queueColor()}
                  >
                    <CircleIcon />
                  </Typography>
                </Tooltip>
              )}
            </Box>
          </Button>
          <Typography variant="body2">STATUS</Typography>
          {queueToday ? (
            <Typography
              variant="body1"
              color={queueColor()}
              sx={{ fontWeight: 500 }}
            >
              {util.checkInStatus(queueToday.checkInStatus)}
            </Typography>
          ) : (
            <Typography variant="body1">No queue for today</Typography>
          )}
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {currentPatient?.firstName +
                " " +
                currentPatient?.middleName +
                " " +
                currentPatient?.lastName}
              {currentPatient?.suffixName !== "" || null
                ? currentPatient?.suffixName
                : ""}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {dayjs(currentPatient?.birthDate).format("DD MMMM, YYYY")}
            </Typography>
            <Stack
              direction={{ xs: "column" }}
              justifyContent={{ xs: "center" }}
              alignItems={{ xs: "center" }}
              spacing={2}
              mt={2}
            >
              <Typography variant="body2" color="text.secondary">
                Registered At
                <Typography variant="subtitle2" color="text.primary">
                  {dayjs(currentPatient?.registeredAt).format("DD MMMM, YYYY")}
                </Typography>
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Contact
                <Typography variant="subtitle2" color="text.primary">
                  {currentPatient?.contactNo}
                </Typography>
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Email
                <Typography variant="subtitle2" color="text.primary">
                  {currentPatient?.email}
                </Typography>
              </Typography>
            </Stack>
          </CardContent>
        </Stack>
        <Stack direction={{ xs: "column" }}>
          <CardContent>
            <Stack textAlign={`center`} spacing={1}>
              <Typography variant="subtitle2" color="text.primary">
                HEALTH PLAN
              </Typography>
              {currentPatient.hmoCards.map((card) => (
                <Box>
                  <Divider variant="middle" />
                  <Typography variant="subtitle1">{card.hmo.title}</Typography>
                  <Typography variant="subtitle2">{card.cardNo}</Typography>
                </Box>
              ))}
            </Stack>
          </CardContent>
        </Stack>
        <Modal
          open={openProfile}
          onClose={handleCloseProfile}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Stack
              direction={{ xs: "column" }}
              justifyContent="center"
              alignItems="center"
              textAlign="center"
              spacing={2}
            >
              <Button
                sx={{ backgroundColor: "transparent", borderRadius: "100%" }}
                onClick={() => {
                  const fileInput = document.getElementById("file-input");
                  fileInput.click();
                }}
              >
                <Avatar
                  alt="Doreamon"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWadeZ6aQggj21bHnsjbOyRJ9ZavJGiYnG-oI7fN_tzH4qNXZnOh3GQr4vkpYNqN95C7Y&usqp=CAU"
                  sx={{
                    m: 1,
                    bgcolor: "primary.main",
                    width: { xs: 100, sm: 130, md: 140 },
                    height: { xs: 100, sm: 130, md: 140 },
                    border: "5px solid white",
                    boxShadow: 10,
                  }}
                />
                <input
                  id="file-input"
                  hidden
                  accept="image/*"
                  type="file"
                  onChange={(e) => setProfilePic(e.target.files[0])}
                />
              </Button>
              <Typography variant="subtitle2" color="green">
                Click the Avatar to Change Profile
              </Typography>
              <FormControl sx={{ minWidth: "100%" }}>
                <InputLabel id="demo-multiple-checkbox-label">HMO</InputLabel>
                <Select
                  labelId="demo-multiple-checkbox-label"
                  id="demo-multiple-checkbox"
                  multiple
                  value={personName}
                  onChange={handleChange}
                  input={<OutlinedInput label="Tag" />}
                  renderValue={(selected) => selected.join(", ")}
                  MenuProps={MenuProps}
                  fullWidth
                >
                  {names.map((name) => (
                    <MenuItem key={name} value={name}>
                      <Checkbox checked={personName.indexOf(name) > -1} />
                      <ListItemText primary={name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {/* <TextField variant="outlined" label="Add New HMO" fullWidth /> */}
              <TextField variant="outlined" label="Password" fullWidth />
              <TextField
                variant="outlined"
                label="Confirm Password"
                fullWidth
              />
            </Stack>
          </Box>
        </Modal>
      </Card>
    )
  );
};

export default PatientLeftBar;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  // border: "2px solid #000",
  borderRadius: 10,
  boxShadow: 24,
  p: 4,
};

const stylesStatus = {
  button: {
    position: "absolute",
    top: 0,
    right: 0,
    zIndex: 1,
    margin: "1rem",
    borderRadius: "100%",
    height: 60,
  },
};
