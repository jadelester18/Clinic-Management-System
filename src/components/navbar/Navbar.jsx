import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Menu,
  MenuItem,
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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

function Navbar() {
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

  return (
    <AppBar position="sticky">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <LocalHospitalIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Intellicare
        </Typography>
        <Button
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={handleClickOpenLogin}
        >
          Login
        </Button>
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
            <MenuItem onClick={handleCloseUserMenu}>
              <Typography textAlign="center">Profile</Typography>
            </MenuItem>
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
          <Login />
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
        <DialogContent>
          <Register />
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
          <ForgotPassword />
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
            }}
            autoFocus
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </AppBar>
  );
}

export default Navbar;
