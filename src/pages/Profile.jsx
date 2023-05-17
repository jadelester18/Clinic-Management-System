import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Dialog,
  DialogContent,
  Grid,
  Slide,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import EditProfile from "../components/profile/EditProfile";
import LeftBarProfile from "../components/profile/LeftBarProfile";
import VideoProfileContent from "../components/profile/VideoProfileContent";
import styled from "@mui/system/styled";
import LooksOneIcon from "@mui/icons-material/LooksOne";
import LooksTwoIcon from "@mui/icons-material/LooksTwo";
import DateRangeIcon from "@mui/icons-material/DateRange";
import { Link } from "react-router-dom";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const Item = styled("div")(({ theme }) => ({
  // backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  // border: "1px solid",
  borderColor: theme.palette.mode === "dark" ? "#444d58" : "#ced7e0",
  // padding: theme.spacing(1),
  // borderRadius: "4px",
  // textAlign: "center",
}));

function Profile() {
  //For Open/Close Edit Profile Modal
  const [openEditProfile, setOpenEditProfile] = React.useState(false);

  const handleClickOpenEditProfile = () => {
    setOpenEditProfile(true);
  };

  const handleCloseEditProfile = () => {
    setOpenEditProfile(false);
  };

  return (
    <Box>
      <Box sx={{ position: "relative" }}>
        <CardMedia
          sx={{ height: 400 }}
          image="https://images.unsplash.com/photo-1682687220211-c471118c9e92?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
          title="green iguana"
        />

        <Avatar
          alt="Remy Sharp"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWadeZ6aQggj21bHnsjbOyRJ9ZavJGiYnG-oI7fN_tzH4qNXZnOh3GQr4vkpYNqN95C7Y&usqp=CAU"
          sx={{
            width: { xs: 150, sm: 160, md: 180 },
            height: { xs: 150, sm: 160, md: 180 },
            position: "absolute",
            top: 280,
            left: { xs: "50%", sm: "50%", md: "17%" },
            transform: "translateX(-50%)",
            zIndex: 100,
            border: "5px solid white",
            boxShadow: 10,
          }}
        />
        <Card sx={{ width: "100%" }}>
          <Grid
            sx={{
              marginLeft: {
                xs: "0%",
                sm: "0%",
                md: "26%",
                lg: "26%",
                xl: "26%",
              },
              marginTop: { xs: 5, sm: 7, md: 2, lg: 2 },
            }}
          >
            <CardContent>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                justifyContent="center"
                alignItems="center"
                spacing={2}
              >
                <Grid container spacing={2}>
                  <Grid xs={12}>
                    <Stack
                      direction={{ xs: "column", sm: "column", md: "row" }}
                      justifyContent={{ xs: "center", md: "flex-start" }}
                      alignItems={{ xs: "center", md: "flex-start" }}
                      spacing={1}
                    >
                      <Grid md={9}>
                        <Item>
                          <Typography gutterBottom variant="h5" component="div">
                            Jade Lester Ballester
                          </Typography>
                        </Item>
                      </Grid>
                      <Grid md={3}>
                        <Item>
                          <Button
                            variant="outlined"
                            sx={{ borderRadius: 10 }}
                            onClick={handleClickOpenEditProfile}
                          >
                            Edit Profile
                          </Button>
                          <Button
                            variant="contained"
                            sx={{ borderRadius: 10 }}
                            component={Link}
                            to={`/book-appointment`}
                          >
                            Book An Appointment
                          </Button>
                        </Item>
                      </Grid>
                    </Stack>
                  </Grid>
                  <Grid xs={12}>
                    <Stack
                      direction={{ xs: "column", sm: "row" }}
                      justifyContent={{ xs: "center", md: "flex-start" }}
                      alignItems={{ xs: "center", md: "flex-start" }}
                      spacing={2}
                      sx={{ pt: 1 }}
                    >
                      <Typography variant="body2" color="text.secondary">
                        Full Stack Java Developer
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid xs={12}>
                    <Stack
                      direction={{ xs: "column", sm: "row" }}
                      justifyContent={{ xs: "center", md: "flex-start" }}
                      alignItems={{ xs: "center", md: "flex-start" }}
                      spacing={2}
                      sx={{ pt: 3 }}
                    >
                      <Typography variant="caption">
                        <LooksOneIcon />
                        Internal Medicine
                      </Typography>
                      <Typography variant="caption">
                        <LooksTwoIcon />
                        Gastroenterology
                      </Typography>
                      <Typography variant="caption">
                        <DateRangeIcon />
                        Tuesday, Thursday, Saturday 9:00 AM - 5:00 PM
                      </Typography>
                    </Stack>
                  </Grid>
                </Grid>
              </Stack>
            </CardContent>
          </Grid>
        </Card>
        {/* Dialog For Edit Profile */}
        <Dialog
          open={openEditProfile}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleCloseEditProfile}
          aria-describedby="alert-dialog-slide-description-2"
          PaperProps={{
            style: { borderRadius: 20 },
          }}
          fullWidth={true}
          maxWidth={"lg"}
        >
          <DialogContent>
            <EditProfile closeEditProfile={handleCloseEditProfile} />
          </DialogContent>
        </Dialog>
      </Box>
      <Box mt={3}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          sx={{
            marginLeft: { xs: "0%", sm: 0, md: "10%" },
            marginRight: { xs: "0%", sm: 0, md: "10%" },
            spacing: { xs: 0, sm: 0, md: 2 },
          }}
        >
          <LeftBarProfile />
          <VideoProfileContent />
        </Stack>
      </Box>
    </Box>
  );
}

export default Profile;
