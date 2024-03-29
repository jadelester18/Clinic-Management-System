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
import React, { useContext, useEffect, useState } from "react";
import EditProfile from "../components/profile/EditProfile";
import LeftBarProfile from "../components/profile/LeftBarProfile";
import VideoProfileContent from "../components/profile/VideoProfileContent";
import styled from "@mui/system/styled";
import DateRangeIcon from "@mui/icons-material/DateRange";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import * as profileData from "../redux/GetApiCalls/profile";
import { SnackBarContext } from "../context/SnackBarContext";
import * as doctorSvc from "../redux/PostApiCalls/doctor";
import { DEFAULT_DATE_FORMAT } from "../redux/default";
import LoadingScreen from "../components/LoadingScreen";

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
  const userLoggedinDetails = useSelector((state) => state.user);
  let userObject = userLoggedinDetails?.user;
  let user = userLoggedinDetails?.user?.user;
  const currentDoctor = userLoggedinDetails?.user?.person;
  console.log("userloggedindetails", userLoggedinDetails);

  const [form, setForm] = useState({});
  console.log("form", form);

  const [isLoading, setIsLoading] = useState(false);
  const { onShowSuccess, onShowFail } = useContext(SnackBarContext);

  //For Open/Close Edit Profile Modal
  const [openEditProfile, setOpenEditProfile] = React.useState(false);

  const navigate = useNavigate();

  const handleClickOpenEditProfile = () => {
    setOpenEditProfile(true);
  };

  const handleCloseEditProfile = () => {
    setOpenEditProfile(false);
  };

  //Fetching the Profile info
  const [profile, setProfile] = React.useState("");

  const fetchProfileData = async () => {
    try {
      const response = await profileData.getDoctorProfile();
      setProfile(response.data);
      console.log("Specialization LIST ", response.data);
    } catch (error) {
      console.error(error);
      navigate("/page-not-found");
    }
  };

  const handleSave = async (form) => {
    setIsLoading(true);
    const updateDoctorDto = convertFormToDto(form);
    try {
      const { data } = await doctorSvc.updateDoctor(
        currentDoctor.id,
        updateDoctorDto
      );
      fetchProfileData();
      handleCloseEditProfile();
      onShowSuccess("Doctor updated!");
    } catch (error) {
      console.error(error);
      onShowFail(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  const convertFormToDto = (form) => {
    return {
      honorific: form.honorific,
      firstName: form.firstName,
      middleName: form.middleName,
      lastName: form.lastName,
      suffixName: form.suffixName,
      gender: form.gender,
      birthDate: form.birthDate.format(DEFAULT_DATE_FORMAT),
      contactNo: form.contactNo,
      street: form.street,
      barangay: form.barangay,
      city: form.city,
      province: form.province,
      country: form.country.label,
      postalCode: form.postalCode,
      email: form.email,
    };
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  //For Showing the schedule
  // Function to convert time format
  const formatTime = (time) => {
    const [hours, minutes, seconds] = time.split(":");
    let suffix = "am";

    // Convert hours to 12-hour format
    let formattedHours = parseInt(hours);
    if (formattedHours >= 12) {
      formattedHours -= 12;
      suffix = "pm";
    }
    if (formattedHours === 0) {
      formattedHours = 12;
    }

    // Add leading zeros to minutes and seconds
    const formattedMinutes = minutes.padStart(2, "0");
    const formattedSeconds = seconds.padStart(2, "0");

    // Return formatted time string
    return `${formattedHours}:${formattedMinutes} ${suffix}`;
  };
  const scheduleInfo = {};

  profile?.schedules?.forEach((day) => {
    const morningStartTimes = [];
    const afternoonStartTimes = [];
    let morningEndTime = "";
    let afternoonEndTime = "";

    day?.timeSlots?.forEach((time) => {
      const startTime = formatTime(time.startTime);
      const endTime = formatTime(time.endTime);

      // Check if the start time is in the morning or afternoon
      const startHour = parseInt(time.startTime.split(":")[0]);
      if (startHour >= 9 && startHour < 12) {
        morningStartTimes.push(startTime);
        morningEndTime = endTime;
      } else if (startHour >= 13 && startHour <= 15) {
        afternoonStartTimes.push(startTime);
        afternoonEndTime = endTime;
      }
    });

    const dayOfWeek = day.day;

    scheduleInfo[dayOfWeek] = {
      morningStart: morningStartTimes.length > 0 ? morningStartTimes[0] : "",
      morningEnd: morningEndTime,
      afternoonStart:
        afternoonStartTimes.length > 0 ? afternoonStartTimes[0] : "",
      afternoonEnd: afternoonEndTime,
    };
  });

  return (
    profile && (
      <Box>
        <Box sx={{ position: "relative" }}>
          <CardMedia
            sx={{ height: 400 }}
            image="https://images.unsplash.com/photo-1682687220211-c471118c9e92?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
            title="green iguana"
          />

          <Avatar
            alt="Remy Sharp"
            src={profile?.avatarUrl}
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
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="div"
                            >
                              {profile?.honorific +
                                " " +
                                profile?.firstName +
                                " " +
                                profile?.middleName +
                                " " +
                                profile?.lastName}{" "}
                              {profile?.suffixName !== "" || null
                                ? profile?.suffixName
                                : ""}
                            </Typography>
                          </Item>
                        </Grid>
                        <Grid md={3}>
                          <Item>
                            {user?.id === profile?.id ? (
                              <Button
                                variant="outlined"
                                sx={{ borderRadius: 10 }}
                                onClick={handleClickOpenEditProfile}
                              >
                                Edit Profile
                              </Button>
                            ) : (
                              <Button
                                variant="contained"
                                sx={{ borderRadius: 10 }}
                                component={Link}
                                to={`/book-appointment/${profile?.id}`}
                              >
                                Book An Appointment
                              </Button>
                            )}
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
                        <Typography variant="subtitle2">
                          {/* <LooksOneIcon /> */}
                          <Typography variant="caption">Primary : </Typography>
                          {profile?.specialization?.description}
                        </Typography>
                        <Typography
                          variant="subtitle2"
                          sx={
                            profile?.subspecialization?.description
                              ? { display: "block" }
                              : { display: "none" }
                          }
                        >
                          {/* <LooksTwoIcon /> */}
                          <Typography variant="caption">
                            Secondary :{" "}
                          </Typography>
                          {profile?.subspecialization?.description}
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
                        {Object.entries(scheduleInfo).map(
                          ([dayOfWeek, schedule]) => (
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              key={dayOfWeek}
                            >
                              <DateRangeIcon />
                              {dayOfWeek}
                              <Typography
                                variant="subtitle2"
                                color="text.primary"
                                sx={
                                  schedule.morningStart
                                    ? { display: "block" }
                                    : { display: "none" }
                                }
                              >
                                Morning:{" "}
                                {schedule.morningStart
                                  ? `${schedule.morningStart} - ${schedule.morningEnd}`
                                  : " "}
                              </Typography>
                              <Typography
                                variant="subtitle2"
                                color="text.primary"
                                sx={
                                  schedule.afternoonStart
                                    ? { display: "block" }
                                    : { display: "none" }
                                }
                              >
                                Afternoon:{" "}
                                {schedule.afternoonStart
                                  ? `${schedule.afternoonStart} - ${schedule.afternoonEnd}`
                                  : " "}
                              </Typography>
                            </Typography>
                          )
                        )}
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
              <EditProfile
                closeEditProfile={handleCloseEditProfile}
                onSave={handleSave}
                doctor={profile}
              />
              {isLoading && <LoadingScreen open={isLoading} />}
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
            {/* <LeftBarProfile /> */}
            {/* <VideoProfileContent /> */}
          </Stack>
        </Box>
      </Box>
    )
  );
}

export default Profile;
