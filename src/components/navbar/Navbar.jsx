import {
  AppBar,
  Avatar,
  Badge,
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Button,
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
} from "@mui/material";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import React from "react";
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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

function refreshMessages() {
  const getRandomInt = (max) => Math.floor(Math.random() * Math.floor(max));

  return Array.from(new Array(50)).map(
    () => messageExamples[getRandomInt(messageExamples.length)]
  );
}

const messageExamples = [
  {
    primary: "Brunch this week?",
    secondary:
      "I'll be in the neighbourhood this week. Let's grab a bite to eat",
    person: "/static/images/avatar/5.jpg",
  },
  {
    primary: "Birthday Gift",
    secondary: `Do you have a suggestion for a good present for John on his work
      anniversary. I am really confused & would love your thoughts on it.`,
    person: "/static/images/avatar/1.jpg",
  },
  {
    primary: "Recipe to try",
    secondary:
      "I am try out this new BBQ recipe, I think this might be amazing",
    person: "/static/images/avatar/2.jpg",
  },
  {
    primary: "Yes!",
    secondary: "I have the tickets to the ReactConf for this year.",
    person: "/static/images/avatar/3.jpg",
  },
  {
    primary: "Doctor's Appointment",
    secondary:
      "My appointment for the doctor was rescheduled for next Saturday.",
    person: "/static/images/avatar/4.jpg",
  },
  {
    primary: "Discussion",
    secondary: `Menus that are generated by the bottom app bar (such as a bottom
      navigation drawer or overflow menu) open as bottom sheets at a higher elevation
      than the bar.`,
    person: "/static/images/avatar/5.jpg",
  },
  {
    primary: "Summer BBQ",
    secondary: `Who wants to have a cookout this weekend? I just got some furniture
      for my backyard and would love to fire up the grill.`,
    person: "/static/images/avatar/1.jpg",
  },
];

function Navbar({ toggleMode, mode }) {
  const userLoggedinDetails = useSelector((state) => state.user);
  let userObject = userLoggedinDetails?.user;
  let user = userLoggedinDetails?.user?.user;

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
  const ref = React.useRef(null);
  const [messages, setMessages] = React.useState(() => refreshMessages());

  React.useEffect(() => {
    if (ref.current) {
      const body = ref.current.ownerDocument.body;
      if (body) {
        body.scrollTop = 0;
      }
    }
    setMessages(refreshMessages());
  }, [setMessages]);

    const currentUrl = window.location.href;

    return (
      <AppBar position="sticky">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            component={Link}
            to={`/landingpage`}
          >
            <LocalHospitalIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Intellicare
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
                  <Badge badgeContent={100} color="secondary">
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
                <MenuItem sx={{ position: "relative", paddingBottom: "64px" }}>
                  <CssBaseline />
                  <List
                    dense
                    sx={{
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
                    }}
                  >
                    {messages.map(({ primary, secondary, person }, index) => (
                      <ListItemButton
                        key={index + person}
                        onClick={handleCloseNotificationMenu}
                      >
                        <ListItemAvatar>
                          <Avatar alt="Profile Picture" src={person} />
                        </ListItemAvatar>
                        <ListItemText
                          primary={primary.slice(0, 35)}
                          secondary={secondary.slice(0, 35)}
                        />
                      </ListItemButton>
                    ))}
                  </List>
                  <Paper
                    sx={{
                      position: "absolute",
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
                      }}
                    >
                      <BottomNavigationAction
                        label="Recents"
                        icon={<RestoreIcon />}
                      />
                      <BottomNavigationAction
                        label="Favorites"
                        icon={<FavoriteIcon />}
                      />
                      <BottomNavigationAction
                        label="Archive"
                        icon={<ArchiveIcon />}
                      />
                    </BottomNavigation>
                  </Paper>
                </MenuItem>
              </Menu>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt="Remy Sharp"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWadeZ6aQggj21bHnsjbOyRJ9ZavJGiYnG-oI7fN_tzH4qNXZnOh3GQr4vkpYNqN95C7Y&usqp=CAU"
                  />
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
                    handleClickOpenConfirmation();
                  }}
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
              <Grid container>
                <Grid item xs underline="none">
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
          // fullWidth={true}
          maxWidth={{ xs: "100%" }}
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
            <Grid container>
              <Grid item xs underline="none">
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
          maxWidth={"sm"}
        >
          <DialogContent>
            <ForgotPassword
              handleCloseForgotPassword={handleCloseForgotPassword}
            />
            <Grid container>
              <Grid item xs underline="none">
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
        {/* For Confirmation Logout */}
        <Dialog
          open={openConfirmation}
          onClose={handleClickCloseConfirmation}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Are you sure you want to logout?"}
          </DialogTitle>
          {/* <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This will reflect to that date.
          </DialogContentText>
        </DialogContent> */}
          <DialogActions>
            <Button onClick={handleClickCloseConfirmation}>Disagree</Button>
            <Button
              onClick={() => {
                handleClickCloseConfirmation();
                handleLogout();
              }}
              autoFocus
              component={Link}
              to={`/`}
            >
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </AppBar>
    );
}

export default Navbar;

