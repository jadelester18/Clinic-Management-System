import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Checkbox,
  Divider,
  Grid,
  List,
  ListItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import dayjs from "dayjs";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CalendarSettings from "./calendarConfig/CalendarSettings";
import ClockSettings from "./clockConfig/ClockSettings";
import * as profileData from "../../../../redux/GetApiCalls/profile";
import * as bookAppointment from "../../../../redux/PostApiCalls/patientAppointment";
import axios from "axios";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import app from "../../../../firebase";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

const BookAppointment = () => {
  const userLoggedinDetails = useSelector((state) => state.user);
  let userObject = userLoggedinDetails?.user;
  let token = userObject.token;
  let user = userLoggedinDetails?.user?.user;

  let location = useLocation();
  let id = location.pathname.split("/")[2];

  //Fetching the Profile info
  const [profile, setProfile] = React.useState("");

  const fetchProfileData = async () => {
    try {
      const response = await profileData.getDoctorProfile();
      setProfile(response.data);
    } catch (error) {
      console.error(error);
    }
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

  //For Uploading docs and saving the other data
  const [date, setDate] = useState("");
  const [timeSlotId, setTimeSlotId] = useState("");
  const [remark, setRemark] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileSelect = (event) => {
    const files = event.target.files;
    setSelectedFiles(files);
  };

  const navigate = useNavigate();

  const handlePost = (e) => {
    e.preventDefault();
    if (selectedFiles.length > 0) {
      const uploadPromises = [];
      const fileUrls = [];

      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];
        const fileName = new Date().getTime() + file.name;
        const storage = getStorage(app);
        const storageRef = ref(storage, fileName);

        const uploadTask = uploadBytesResumable(storageRef, file);
        const uploadPromise = new Promise((resolve, reject) => {
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              // Handle upload progress if needed
            },
            (error) => {
              // Handle upload error if needed
              reject(error);
            },
            () => {
              // Upload completed successfully
              getDownloadURL(uploadTask.snapshot.ref)
                .then((downloadURL) => {
                  fileUrls.push(downloadURL);
                  resolve();
                })
                .catch((error) => {
                  reject(error);
                });
            }
          );
        });

        uploadPromises.push(uploadPromise);
      }

      Promise.all(uploadPromises)
        .then(() => {
          // All files have been uploaded, make the API request
          fetch(`http://localhost:8080/api/v1/appointments`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              date: date,
              timeSlotId: timeSlotId,
              remark: remark,
              doctorId: id,
              attachmentUrls: fileUrls,
            }),
          })
            .then((response) => response.json())
            .then((data) => {
              // Handle API response
              setSelectedFiles([]); // Clear the selected files
              // alert("Your Post was uploaded successfully");
              navigate("/patient");
            })
            .catch((error) => {
              // Handle API error
              console.error(error);
            });
        })
        .catch((error) => {
          // Handle file upload error
          console.error(error);
        });
    } else {
      // No files selected, handle this case accordingly
    }
  };

  //Geting the date from calendar pass it to time/clock
  const handleSelectedDateChange = (date) => {
    setDate(date);
  };

  //Geting the time from Clock
  const handleSelectedTimeChange = (time) => {
    setTimeSlotId(time);
  };

  console.log(date);
  console.log(timeSlotId);

  return (
    <Box p={2}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={4} lg={3}>
          <Card
            sx={{
              // maxWidth: { xs: 900, md: 360 },
              // width: { xs: 360, sm: 600, md: 400 },
              justifyContent: "center",
              alignItems: "center",
              boxShadow: 10,
              borderRadius: 10,
            }}
          >
            <Stack
              direction={{ xs: "column" }}
              justifyContent="center"
              alignItems="center"
              textAlign="center"
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
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
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
                <Typography variant="body2" color="text.secondary">
                  {dayjs(profile?.birthDate).format("MMM DD, YYYY")}
                </Typography>
                <Stack
                  direction={{ xs: "row", md: "row" }}
                  justifyContent={{ xs: "center" }}
                  alignItems={{ xs: "center" }}
                  spacing={2}
                  mt={2}
                >
                  <Typography variant="body2" color="text.secondary">
                    Title
                    <Typography variant="body1" color="text.primary">
                      {profile?.suffixTitle}
                    </Typography>
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    license No.
                    <Typography variant="body1" color="text.primary">
                      {profile?.licenseNo}
                    </Typography>
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Presence
                    <Typography variant="body1" color="text.primary">
                      {profile?.content?.isIn === false
                        ? "Present"
                        : "Absent/Leave"}
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
                  color="text.secondary"
                >
                  HMO Accreditation
                </Typography>
                {/* <Typography variant="body2" color="text.secondary">
              10 April, 1999
            </Typography> */}
                <List sx={{ width: "100%", maxWidth: 360 }} dense>
                  <ListItem>
                    <ListItem disablePadding>
                      {profile?.hmoAccreditation?.map((hmo) => (
                        <Typography
                          variant="subtitle2"
                          color="text.primary"
                          key={hmo?.id}
                        >
                          {hmo?.title.length > 25
                            ? hmo?.title.substring(0, 25) + "... "
                            : hmo?.title}
                        </Typography>
                      ))}
                    </ListItem>
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </List>

                <Typography
                  gutterBottom
                  variant="subtitle2"
                  component="div"
                  color="text.secondary"
                >
                  Clinic Schedule
                </Typography>
                {/* <Typography variant="body2" color="text.secondary">
              10 April, 1999
            </Typography> */}
                <List sx={{ width: "100%", maxWidth: 360 }} dense>
                  {Object.entries(scheduleInfo).map(([dayOfWeek, schedule]) => (
                    <ListItem>
                      <ListItem disablePadding>
                        <Typography
                          variant="subtitle2"
                          color="text.primary"
                          key={dayOfWeek}
                        >
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
                      </ListItem>
                    </ListItem>
                  ))}
                  <Divider variant="inset" component="li" />
                </List>

                <Typography
                  gutterBottom
                  variant="subtitle2"
                  component="div"
                  color="text.secondary"
                >
                  Contact Details
                </Typography>
                {/* <Typography variant="body2" color="text.secondary">
              10 April, 1999
            </Typography> */}
                <List sx={{ width: "100%", maxWidth: 360 }} dense>
                  <ListItem>
                    <ListItem disablePadding>
                      <Typography variant="subtitle2" color="text.primary">
                        {profile?.contactNo}
                      </Typography>
                    </ListItem>
                  </ListItem>
                  <ListItem>
                    <ListItem disablePadding>
                      <Typography variant="subtitle2" color="text.primary">
                        {profile?.email}
                      </Typography>
                    </ListItem>
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </List>
              </CardContent>
            </Stack>
          </Card>
        </Grid>
        <Grid item xs={12} sm={12} md={8} lg={9}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={12} lg={6}>
              <Card sx={{ height: "100%" }}>
                <CardContent>
                  <CalendarSettings
                    onSelectedDateChange={handleSelectedDateChange}
                    date={date}
                  />
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={12} lg={6}>
              <Card>
                <CardContent>
                  <ClockSettings
                    selectedDateInCalendar={date}
                    onSelectedTimeChange={handleSelectedTimeChange}
                  />
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        margin="normal"
                        name="cheifComplaint"
                        label="Chief Complaint"
                        autoComplete="cheifComplaint"
                        fullWidth
                        multiline
                        onChange={(e) => setRemark(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="body2" color="text.secondary">
                        ATTACH FILES (LOA, LAB OR IMAGING, ETC.)
                      </Typography>
                      <Button
                        variant="outlined"
                        component="label"
                        size="large"
                        fullWidth
                        startIcon={<CloudUploadIcon />}
                      >
                        Upload File
                        <input
                          hidden
                          accept="image/*"
                          multiple
                          type="file"
                          onChange={handleFileSelect}
                        />
                      </Button>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="subtitle2">
                        <Checkbox defaultChecked />I am booking for an Online
                        Consultation
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="subtitle2">
                        <Checkbox defaultChecked />
                        By booking, I have read and accepted the Patient Consent
                        Form
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="caption" sx={{ color: "red" }}>
                        Note: Cancellation and changes of schedule must be made
                        atleast a day before the appointment.
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        variant="contained"
                        sx={{ mr: 2 }}
                        onClick={handlePost}
                      >
                        Book Now
                      </Button>
                      <Button
                        variant="outlined"
                        component={Link}
                        to={"/patient"}
                      >
                        Cancel
                      </Button>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default BookAppointment;
