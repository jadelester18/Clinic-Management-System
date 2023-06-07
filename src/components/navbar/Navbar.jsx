import {
  AppBar,
  Avatar,
  Badge,
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Button,
  CardMedia,
  Container,
  CssBaseline,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
  Paper,
  Popover,
  Slide,
  Toolbar,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Login from "../../pages/Login";
import Register from "../../pages/Register";
import ForgotPassword from "../../pages/ForgotPassword";
import DarkMode from "../theme/DarkMode";
import NotificationImportantIcon from "@mui/icons-material/NotificationImportant";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ArchiveIcon from "@mui/icons-material/Archive";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/UserReducer";
import * as notificationService from "../../redux/GetApiCalls/notification";
import LoadingScreen from "../LoadingScreen";
import { SnackBarContext } from "../../context/SnackBarContext";
import MarkEmailUnreadIcon from "@mui/icons-material/MarkEmailUnread";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

function Navbar({ toggleMode, mode }) {
  const userLoggedinDetails = useSelector((state) => state.user);
  let userObject = userLoggedinDetails?.user;
  let user = userLoggedinDetails?.user?.user;

  //For Theme
  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const main = theme.palette.neutral.main;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;
  const landingPageBg = theme.palette.background.landingPageBg;

  //For Open/Close Login Moda;
  const [openLogin, setOpenLogin] = React.useState(false);

  const handleClickOpenLogin = () => {
    setOpenLogin(true);
  };

  const handleCloseLogin = () => {
    setOpenLogin(false);
  };

  //For Open/Close Register Modal
  const [openRegister, setOpenRegister] = React.useState(false);

  const handleClickOpenRegister = () => {
    setOpenRegister(true);
  };

  const handleCloseRegister = () => {
    setOpenRegister(false);
  };

  //For Open/Close Forgot Password Modal
  const [openForgotPassword, setOpenForgotPassword] = React.useState(false);

  const handleClickOpenForgotPassword = () => {
    setOpenForgotPassword(true);
  };

  const handleCloseForgotPassword = () => {
    setOpenForgotPassword(false);
  };

  // For Profile/Logout Dropdown
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  //For Logout Confirmation
  const [openConfirmation, setOpenConfirmation] = React.useState(false);

  const handleClickOpenConfirmation = () => {
    setOpenConfirmation(true);
  };

  const handleClickCloseConfirmation = () => {
    setOpenConfirmation(false);
  };

  //For logout functionality
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };

  //For Notification Button/Badge
  function notificationsLabel(count) {
    if (count === 0) {
      return "no notifications";
    }
    if (count > 99) {
      return "more than 99 notifications";
    }
    return `${count} notifications`;
  }

  //For Notification Popup
  const [anchorElNotification, setAnchorElNotification] = React.useState(null);
  const handleOpenNotificationMenu = (event) => {
    setAnchorElNotification(event.currentTarget);
  };
  const handleCloseNotificationMenu = () => {
    setAnchorElNotification(null);
  };

  //For Notification Content
  const [value, setValue] = React.useState(0);

  const [isRead, setIsRead] = useState(null);
  const [messages, setMessages] = React.useState([]);

  const showNotification = async () => {
    try {
      const { data: notificationPage } = await notificationService.notification(
        {
          isRead: isRead,
        }
      );
      setMessages(notificationPage);
      console.log("object notification", notificationPage);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    showNotification();
  }, [isRead]);

  const [isLoading, setIsLoading] = useState(false);
  const { onShowSuccess, onShowFail } = useContext(SnackBarContext);

  const handleUpdateNotification = async (id) => {
    try {
      const { data } = await notificationService.updateNotification(id, {
        isRead: isRead ? isRead : true,
      });
      // setIsRead(true);
      onShowSuccess("Notification Mark Read!");
      showNotification();
    } catch (error) {
      console.error(error);
      onShowFail(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  const currentUrl = window.location.href;

  return (
    <AppBar position="sticky">
      {/* <Toolbar sx={{ backgroundColor: "rgb(230,240,255)" }}> */}
      <Toolbar sx={{ backgroundColor: landingPageBg }}>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          component={Link}
          to={`/`}
        >
          {/* <LocalHospitalIcon /> */}
          {/* <img src={require("../../assets/Logo.jpg")}  /> */}
          <Avatar
            // height="100"
            src={require("../../assets/Logo.jpg")}
            // sx={{ height: 10 }}
          />
        </IconButton>
        <Typography
          variant="h6"
          component="div"
          sx={{
            flexGrow: 1,
            fontFamily: "Archer ",
            fontWeight: 1000,
            // textTransform: "uppercase",
          }}
        >
          Grand Budapest Clinic
        </Typography>
        {/* For Dark Mode Toggle Button */}
        <DarkMode toggleMode={toggleMode} mode={mode} />

        {userObject === null ? (
          currentUrl === `http://localhost:3000/login` ||
          currentUrl === `http://localhost:3000/register` ||
          currentUrl === `http://localhost:3000/forgot-password` ||
          currentUrl === `http://localhost:3000/change-password` ? (
            ""
          ) : (
            <Button
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleClickOpenLogin}
            >
              Log In
            </Button>
          )
        ) : (
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton
                aria-label={notificationsLabel(100)}
                size="large"
                sx={{ mr: 2 }}
                variant="contained"
                onClick={handleOpenNotificationMenu}
              >
                <Badge
                  badgeContent={
                    messages.filter((message) => !message.isRead).length
                  }
                  color="secondary"
                >
                  <NotificationImportantIcon />
                </Badge>
              </IconButton>
            </Tooltip>

            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElNotification}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElNotification)}
              onClose={handleCloseNotificationMenu}
            >
              <Box
                sx={{
                  position: "relative",
                  paddingBottom: "64px",
                  pb: 7,
                  minWidth: 500,
                }}
              >
                <CssBaseline />
                <List dense>
                  {messages.length === 0 ? (
                    <Typography variant="body2" textAlign="center" p={6}>
                      No Notification Available
                    </Typography>
                  ) : (
                    messages.map((primary) => (
                      <ListItemButton
                        key={primary.id}
                        onClick={() => handleUpdateNotification(primary.id)}
                        selected={!primary.isRead}
                      >
                        <ListItemText
                          primary={
                            primary.message.slice(0, 35) +
                            " (" +
                            primary.details.remark.slice(0, 20) +
                            ")"
                          }
                          secondary={
                            "- for" +
                            " " +
                            primary.details.doctor.firstName +
                            " " +
                            primary.details.doctor.middleName +
                            " " +
                            primary.details.doctor.lastName +
                            " " +
                            primary.details.doctor.suffixTitle +
                            " on " +
                            primary.details.date +
                            " from " +
                            primary.details.timeSlot.startTime.slice(0, 5) +
                            " to " +
                            primary.details.timeSlot.endTime.slice(0, 5)
                          }
                        />
                      </ListItemButton>
                    ))
                  )}
                </List>
                {isLoading && <LoadingScreen open={isLoading} />}
              </Box>
              <Paper
                sx={{
                  position: "sticky",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  width: "100%",
                }}
                elevation={3}
              >
                <BottomNavigation
                  showLabels
                  value={value}
                  onChange={(event, newValue) => {
                    setValue(newValue);
                    if (newValue === 0) {
                      setIsRead(null); // All notifications
                    } else if (newValue === 1) {
                      setIsRead(false); // Unread notifications
                    } else if (newValue === 2) {
                      setIsRead(true); // Already read notifications
                    }
                  }}
                >
                  <BottomNavigationAction label="All" icon={<RestoreIcon />} />
                  <BottomNavigationAction
                    label="Unread"
                    icon={<MarkEmailUnreadIcon />}
                  />
                  <BottomNavigationAction
                    label="Already Read"
                    icon={<ArchiveIcon />}
                  />
                </BottomNavigation>
              </Paper>
            </Menu>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src={user?.avatarUrl || ""} />
              </IconButton>
            </Tooltip>
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
                  handleLogout();
                }}
                autoFocus
                component={Link}
                to={`/`}
              >
                <Typography textAlign="center">Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>
        )}
      </Toolbar>
      {/* For Login */}
      <Dialog
        open={openLogin}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseLogin}
        aria-describedby="alert-dialog-slide-description-1"
        PaperProps={{
          style: { borderRadius: 20 },
        }}
        fullWidth={true}
      >
        <DialogContent>
          <Login handleCloseLogin={handleCloseLogin} />
          <Container component="main">
            <Grid container justifyContent="space-between">
              <Grid item underline="none">
                <Button
                  sx={{ fontSize: ".8rem" }}
                  onClick={() => {
                    handleClickOpenForgotPassword();
                    handleCloseLogin();
                  }}
                >
                  Forgot password?
                </Button>
              </Grid>
              <Grid item underline="none">
                <Button
                  sx={{ fontSize: ".8rem" }}
                  onClick={() => {
                    handleClickOpenRegister();
                    handleCloseLogin();
                  }}
                >
                  Don't have an account? Sign Up
                </Button>
              </Grid>
            </Grid>
          </Container>
        </DialogContent>
      </Dialog>
      {/* For register modal */}
      <Dialog
        open={openRegister}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseRegister}
        aria-describedby="alert-dialog-slide-description-2"
        PaperProps={{
          style: { borderRadius: 20 },
        }}
        fullWidth={true}
        maxWidth={"lg"}
      >
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            overflowY: "scroll",
            "&::-webkit-scrollbar": {
              width: "0em",
            },
          }}
        >
          <Register handleCloseRegister={handleCloseRegister} />
          <Grid container justifyContent="space-between">
            <Grid item underline="none">
              <Button
                sx={{ fontSize: ".8rem" }}
                onClick={() => {
                  handleClickOpenForgotPassword();
                  handleCloseRegister();
                }}
              >
                Forgot password?
              </Button>
            </Grid>
            <Grid item underline="none">
              <Button
                sx={{ fontSize: ".8rem" }}
                onClick={() => {
                  handleClickOpenLogin();
                  handleCloseRegister();
                }}
              >
                Already have an account? Sign In
              </Button>
            </Grid>
          </Grid>{" "}
        </DialogContent>
      </Dialog>
      {/* For Forgot Password */}
      <Dialog
        open={openForgotPassword}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseForgotPassword}
        aria-describedby="alert-dialog-slide-description-2"
        PaperProps={{
          style: { borderRadius: 20 },
        }}
        fullWidth={true}
      >
        <DialogContent>
          <ForgotPassword
            handleCloseForgotPassword={handleCloseForgotPassword}
          />
          <Grid container justifyContent="space-between">
            <Grid item underline="none">
              <Button
                sx={{ fontSize: ".8rem" }}
                onClick={() => {
                  handleClickOpenRegister();
                  handleCloseForgotPassword();
                }}
              >
                Don't have an account? Sign Up
              </Button>
            </Grid>
            <Grid item underline="none">
              <Button
                sx={{ fontSize: ".8rem" }}
                onClick={() => {
                  handleClickOpenLogin();
                  handleCloseForgotPassword();
                }}
              >
                Already have an account? Sign In
              </Button>
            </Grid>
          </Grid>{" "}
        </DialogContent>
      </Dialog>
    </AppBar>
  );
}

export default Navbar;
