import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import React, { useState } from "react";
import {
  Avatar,
  Badge,
  BottomNavigation,
  BottomNavigationAction,
  Breadcrumbs,
  Button,
  Chip,
  Collapse,
  Dialog,
  DialogActions,
  DialogTitle,
  Grid,
  ListItemAvatar,
  Menu,
  MenuItem,
  Paper,
  Tooltip,
  emphasize,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import DashboardIcon from "@mui/icons-material/Dashboard";
import NotificationImportantIcon from "@mui/icons-material/NotificationImportant";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ArchiveIcon from "@mui/icons-material/Archive";
import { Link } from "react-router-dom";
import DarkMode from "../../components/theme/DarkMode";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/UserReducer";
import AdminDashboard from "./Dashboard/AdminDashboard";
import NewRegisteredUser from "../../components/admin/ListOfNewRegistered/NewRegisteredUser";
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";
import VerifiedIcon from "@mui/icons-material/Verified";
import MasksIcon from "@mui/icons-material/Masks";
import VaccinesIcon from "@mui/icons-material/Vaccines";
import ListOfApprovedPatient from "../../components/admin/ListOfApprovedPatient/ListOfApprovedPatient";
import ListOfNurses from "../../components/admin/ListOfNurses/ListOfNurses";
import ListOfDoctors from "../../components/admin/ListOfDoctors/ListOfDoctors";
import dayjs from "dayjs";
import SettingsIcon from "@mui/icons-material/Settings";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

//For Notification mock Data
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

function AdminHome({ toggleMode, mode }) {
  const userLoggedinDetails = useSelector((state) => state.user);
  let userObject = userLoggedinDetails?.user;
  let user = userLoggedinDetails?.user?.user;
  let id = userLoggedinDetails?.user?.user?.id;

  //For Theme
  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const main = theme.palette.neutral.main;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;
  const landingPageBg = theme.palette.background.landingPageBg;
  //For Drawer
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  //For Menu Item
  const [menuData, setMenuData] = useState("Dashboard");

  //For Open Tree/Sub Category Dropdown
  const [openAppointmentTree, setOpenAppointmentTree] = React.useState(
    open ? true : false
  );

  const handleClickOpenAppointmentTree = () => {
    setOpenAppointmentTree(!openAppointmentTree);
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

  //Getting the current date
  const currentDate = new Date().toLocaleString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const formattedDate = currentDate.replace(",", " |");
  // console.log(formattedDate); // Output: "Monday | May 15, 2023"

  //Current Time
  const currentTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  // console.log(currentTime); // Output: "4:26 PM"

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="fixed">
          <Toolbar sx={{ backgroundColor: landingPageBg }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              //   onClick={handleDrawerOpen}
              onClick={() => {
                setOpen(!open);
                setOpenAppointmentTree(false);
              }}
              edge="start"
              sx={{
                marginRight: 5,
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              Grand Budapest Clinic
            </Typography>
            {/* For Dark Mode Toggle Button */}
            <Box sx={{ flexGrow: 1 }} />
            <DarkMode toggleMode={toggleMode} mode={mode} />
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
            </Box>

            <Box sx={{ flexGrow: 0 }}>
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
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            <ListItem
              disablePadding
              sx={{ display: "block" }}
              onClick={() => setMenuData("Dashboard")}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Dashboard"
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem
              disablePadding
              sx={{ display: "block" }}
              onClick={() => setMenuData("New Registered User")}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <AccessibilityNewIcon />
                </ListItemIcon>
                <ListItemText
                  primary="New Registered User"
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem
              disablePadding
              sx={{ display: "block" }}
              onClick={() => setMenuData("List Of Approved Patient")}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <VerifiedIcon />
                </ListItemIcon>
                <ListItemText
                  primary="List Of Approved Patient"
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem
              disablePadding
              sx={{ display: "block" }}
              onClick={() => setMenuData("List Of Nurses")}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <MasksIcon />
                </ListItemIcon>
                <ListItemText
                  primary="List Of Nurses"
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem
              disablePadding
              sx={{ display: "block" }}
              onClick={() => setMenuData("List Of Doctors")}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <VaccinesIcon />
                </ListItemIcon>
                <ListItemText
                  primary="List Of Doctors"
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          </List>
          <Divider />
          <List sx={{ marginTop: "auto" }}>
            <Tooltip title="Settings">
              <ListItem disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                  component={Link}
                  // to={`/profile/${id}`}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    <SettingsIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Settings"
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            </Tooltip>
          </List>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Grid container>
            <Grid item xs={9}>
              <Grid item xs={12} ml={3}>
                {menuData === "Dashboard" ? (
                  <Typography variant="h4">Dashboard</Typography>
                ) : (
                  ""
                )}
                {menuData === "New Registered User" ? (
                  <Typography variant="h4">New Registered User</Typography>
                ) : (
                  ""
                )}
                {menuData === "List Of Approved Patient" ? (
                  <Typography variant="h4">List Of Approved Patient</Typography>
                ) : (
                  ""
                )}
                {menuData === "List Of Nurses" ? (
                  <Typography variant="h4">List Of Nurses</Typography>
                ) : (
                  ""
                )}
                {menuData === "List Of Doctors" ? (
                  <Typography variant="h4">List Of Doctors</Typography>
                ) : (
                  ""
                )}
              </Grid>

              <Grid item xs={12} ml={3}>
                <div role="presentation" onClick={handleClick}>
                  <Breadcrumbs aria-label="breadcrumb">
                    <StyledBreadcrumb
                      component="a"
                      onClick={() => {
                        setMenuData("Dashboard");
                      }}
                      label="Dashboard"
                      icon={<HomeIcon fontSize="small" />}
                    />

                    {menuData === "New Registered User" ? (
                      <StyledBreadcrumb
                        component="a"
                        onClick={() => {
                          setMenuData("New Registered User");
                        }}
                        label="New Registered User"
                        icon={<AccessibilityNewIcon fontSize="small" />}
                      />
                    ) : (
                      ""
                    )}
                    {menuData === "List Of Approved Patient" ? (
                      <StyledBreadcrumb
                        component="a"
                        onClick={() => {
                          setMenuData("List Of Approved Patient");
                        }}
                        label="List Of Approved Patient"
                        icon={<VerifiedIcon fontSize="small" />}
                      />
                    ) : (
                      ""
                    )}
                    {menuData === "List Of Nurses" ? (
                      <StyledBreadcrumb
                        component="a"
                        onClick={() => {
                          setMenuData("List Of Nurses");
                        }}
                        label="List Of Nurses"
                        icon={<MasksIcon fontSize="small" />}
                      />
                    ) : (
                      ""
                    )}
                    {menuData === "List Of Doctors" ? (
                      <StyledBreadcrumb
                        component="a"
                        onClick={() => {
                          setMenuData("List Of Doctors");
                        }}
                        label="List Of Doctors"
                        icon={<VaccinesIcon fontSize="small" />}
                      />
                    ) : (
                      ""
                    )}
                  </Breadcrumbs>
                </div>
              </Grid>
            </Grid>
            <Grid item xs={3}>
              <Grid item xs={12} textAlign="right" mr={3}>
                <Typography variant="h6">{formattedDate}</Typography>
                <Typography variant="h3" color="text.secondary">
                  {currentTime}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            {menuData === "Dashboard" && <AdminDashboard />}
            {menuData === "New Registered User" && <NewRegisteredUser />}
            {menuData === "List Of Approved Patient" && (
              <ListOfApprovedPatient />
            )}
            {menuData === "List Of Nurses" && <ListOfNurses />}
            {menuData === "List Of Doctors" && <ListOfDoctors />}
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default AdminHome;

const StyledBreadcrumb = styled(Chip)(({ theme }) => {
  const backgroundColor =
    theme.palette.mode === "light"
      ? theme.palette.grey[100]
      : theme.palette.grey[800];
  return {
    backgroundColor,
    height: theme.spacing(3),
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightRegular,
    "&:hover, &:focus": {
      backgroundColor: emphasize(backgroundColor, 0.06),
    },
    "&:active": {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(backgroundColor, 0.12),
    },
  };
});

function handleClick(event) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}
