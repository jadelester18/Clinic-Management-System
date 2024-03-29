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
import ListOfToBeApprovedPatient from "../../components/admin/ListOfToBeApprovedPatient/ListOfToBeApprovedPatient";
import FlakyIcon from "@mui/icons-material/Flaky";

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

  //For logout functionality
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("accessToken");
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
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ fontFamily: "Archer ", fontWeight: 1000 }}
            >
              Grand Budapest Clinic
            </Typography>
            {/* For Dark Mode Toggle Button */}
            <Box sx={{ flexGrow: 1 }} />
            <DarkMode toggleMode={toggleMode} mode={mode} />
            <Box sx={{ flexGrow: 0 }} ml={2}>
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
              onClick={() => setMenuData("List Of To Be Approved Patient")}
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
                  <FlakyIcon />
                </ListItemIcon>
                <ListItemText
                  primary="List Of To Be Approved Patient"
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
                {menuData === "List Of To Be Approved Patient" ? (
                  <Typography variant="h4">
                    List Of To Be Approved Patient
                  </Typography>
                ) : (
                  ""
                )}{" "}
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
                    {menuData === "List Of To Be Approved Patient" ? (
                      <StyledBreadcrumb
                        component="a"
                        onClick={() => {
                          setMenuData("List Of To Be Approved Patient");
                        }}
                        label="List Of To Be Approved Patient"
                        icon={<FlakyIcon fontSize="small" />}
                      />
                    ) : (
                      ""
                    )}{" "}
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
            {menuData === "List Of To Be Approved Patient" && (
              <ListOfToBeApprovedPatient />
            )}{" "}
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
