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
  useMediaQuery,
} from "@mui/material";
import { ExpandLess, ExpandMore, StarBorder } from "@mui/icons-material";
import NotificationImportantIcon from "@mui/icons-material/NotificationImportant";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ArchiveIcon from "@mui/icons-material/Archive";
import { Link } from "react-router-dom";
import DarkMode from "../../components/theme/DarkMode";
import NurseViewAppointmentQueue from "./viewAppointment/NurseViewAppointmentQueue";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/UserReducer";
import NurseViewNewAppointment from "./viewNewAppointment/NurseViewNewAppointment";
import NurseDashboard from "./dashboard/NurseDashboard";
import DashboardIcon from "@mui/icons-material/Dashboard";
import StreetviewIcon from "@mui/icons-material/Streetview";
import ViewInArIcon from "@mui/icons-material/ViewInAr";
import HomeIcon from "@mui/icons-material/Home";
import NewReleasesIcon from "@mui/icons-material/NewReleases";
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

function NurseHome({ toggleMode, mode }) {
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
  // const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  //For Menu Item
  const [menuData, setMenuData] = useState("Dashboard");

  console.log("Selected menu" + menuData);

  //Highlight the current selected list item

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
  };

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
              <Tooltip title="Profile">
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
                {/* <MenuItem
                  onClick={handleCloseUserMenu}
                  component={Link}
                  to={`/profile`}
                >
                  <Typography textAlign="center">Profile</Typography>
                </MenuItem> */}
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
            <Tooltip title="Dashboard">
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
            </Tooltip>
          </List>
          <Divider />

          <List>
            <Tooltip title="New Appointment">
              <ListItem
                disablePadding
                sx={{ display: "block" }}
                onClick={() => setMenuData("New Appointment")}
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
                    <StreetviewIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="New Appointment"
                    secondary="for approval"
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            </Tooltip>
          </List>
          <Divider />

          <List>
            <Tooltip title="Reception">
              <ListItem
                disablePadding
                sx={{ display: "block" }}
                onClick={() => setMenuData("Appointments")}
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
                    <ViewInArIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Appointments"
                    secondary="approved schedules"
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            </Tooltip>
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
          <Divider />
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

                {menuData === "New Appointment" ? (
                  <Typography variant="h4">New Appoinments</Typography>
                ) : (
                  ""
                )}
                {menuData === "Appointments" ? (
                  <Typography variant="h4">Reception</Typography>
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

                    {menuData === "New Appointment" ? (
                      <StyledBreadcrumb
                        component="a"
                        onClick={() => {
                          setMenuData("New Appointment");
                        }}
                        label="New Appoinments"
                        icon={<StreetviewIcon fontSize="small" />}
                      />
                    ) : (
                      ""
                    )}
                    {menuData === "Appointments" ? (
                      <StyledBreadcrumb
                        component="a"
                        onClick={() => {
                          setMenuData("Appointments");
                        }}
                        label="Reception"
                        icon={<ViewInArIcon fontSize="small" />}
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
          <Box component="main" sx={{ flexGrow: { xs: 0, md: 1 }, p: 3 }}>
            {menuData === "Dashboard" && <NurseDashboard />}

            {menuData === "New Appointment" && <NurseViewNewAppointment />}
            {menuData === "Appointments" && <NurseViewAppointmentQueue />}
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default NurseHome;
