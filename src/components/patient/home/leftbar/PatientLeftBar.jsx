import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Modal,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CircleIcon from "@mui/icons-material/Circle";
import * as queueSvc from "../../../../redux/GetApiCalls/queue";
import * as util from "../../../../redux/util";
import { green, orange, red } from "@mui/material/colors";
import { EditPatientProfile } from "./EditPatientProfile";
import { SnackBarContext } from "../../../../context/SnackBarContext";
import { changePassword } from "../../../../redux/GetApiCalls/auth";
import LoadingScreen from "../../../LoadingScreen";

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
  const [queueToday, setQueueToday] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const { onShowSuccess, onShowFail } = useContext(SnackBarContext);

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

  const handleEditSave = async (pwForm) => {
    setIsLoading(true);
    try {
      const { data } = await changePassword({
        email: currentPatient.email,
        oldPassword: pwForm.oldPassword,
        newPassword: pwForm.newPassword,
      });
      onShowSuccess("Password changed!");
    } catch (error) {
      console.error(error);
      onShowFail(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

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
      // width: { xs: 360, sm: 600, md: 400 },
      // minHeight: 5
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
          sx={{ mt: { lg: 0, md: 10 } }}
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
        <Modal open={openProfile} onClose={handleCloseProfile}>
          <>
            <EditPatientProfile
              patient={currentPatient}
              onSave={handleEditSave}
            />
            {isLoading && <LoadingScreen open={isLoading} />}
          </>
        </Modal>
      </Card>
    )
  );
};

export default PatientLeftBar;

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
