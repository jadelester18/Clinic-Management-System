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

const PatientLeftBar = () => {
  const userLoggedinDetails = useSelector((state) => state.user);
  let userObject = userLoggedinDetails?.user;
  let user = userLoggedinDetails?.user?.user;
  let accesstoken = userObject?.token;

  //For Profile Modal
  const [openProfile, setOpenProfile] = React.useState(false);
  const handleOpenProfile = () => setOpenProfile(true);
  const handleCloseProfile = () => setOpenProfile(false);

  //Get the user post
  const [userPatientDetails, setUserPatientDetails] = useState();
  console.log(userPatientDetails);

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/v1/patients/me`,
          {
            headers: {
              Authorization: `Bearer ${accesstoken}`, // Use the 'Authorization' header
            },
          }
        );
        setUserPatientDetails(res.data);
        console.log(res.data); // Log the response data
      } catch (error) {
        console.log("Post details have an issue.");
      }
    };
    getUserDetails();
  }, []);

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

  return (
    <Card
      sx={{
        // maxWidth: { xs: 900, md: 360 },
        width: { xs: 360, sm: 600, md: 400 },
        justifyContent: "center",
        alignItems: "center",
        boxShadow: 10,
        borderRadius: 10,
      }}
    >
      <CardHeader
        action={
          <IconButton aria-label="settings" onClick={handleOpenUserMenu}>
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
            <Tooltip title="Create walk-in">
              <Typography
                variant="contained"
                sx={stylesStatus.button}
                color="orange"
              >
                <CircleIcon />
              </Typography>
            </Tooltip>
          </Box>
        </Button>
        <Typography variant="body1" color="orange" sx={{ fontWeight: 500 }}>
          Status : Pending
        </Typography>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {userPatientDetails?.firstName +
              " " +
              userPatientDetails?.middleName +
              " " +
              userPatientDetails?.lastName}
            {userPatientDetails?.suffixName !== "" || null
              ? userPatientDetails?.suffixName
              : ""}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {dayjs(userPatientDetails?.birthDate).format("DD MMMM, YYYY")}
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
                {dayjs(userPatientDetails?.registeredAt).format(
                  "DD MMMM, YYYY"
                )}
              </Typography>
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Contact
              <Typography variant="subtitle2" color="text.primary">
                {userPatientDetails?.contactNo}
              </Typography>
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Email
              <Typography variant="subtitle2" color="text.primary">
                {userPatientDetails?.email}
              </Typography>
            </Typography>
          </Stack>
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            size="medium"
            startIcon={<QuestionAnswerIcon />}
            sx={{ borderRadius: 10, width: 200 }}
          >
            Chat
          </Button>
          {/* <Button size="small">Learn More</Button> */}
        </CardActions>
      </Stack>
      <Stack direction={{ xs: "column" }}>
        <CardContent>
          <Typography
            gutterBottom
            variant="subtitle2"
            component="div"
            color="text.primary"
          >
            Health Plan
          </Typography>
          {/* <Typography variant="body2" color="text.secondary">
              10 April, 1999
            </Typography> */}
          <List sx={{ width: "100%", maxWidth: 360 }} dense>
            <ListItem disablePadding>
              {/* <ListItemButton> */}
              <ListItemAvatar>
                <Avatar
                  src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWadeZ6aQggj21bHnsjbOyRJ9ZavJGiYnG-oI7fN_tzH4qNXZnOh3GQr4vkpYNqN95C7Y&usqp=CAU`}
                />
              </ListItemAvatar>
              <ListItemText variant="subtitle1" primary="Intellicare" />
              {/* </ListItemButton> */}
            </ListItem>
            <Divider variant="inset" component="li" />
          </List>
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
            <TextField variant="outlined" label="Confirm Password" fullWidth />
          </Stack>
        </Box>
      </Modal>
    </Card>
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