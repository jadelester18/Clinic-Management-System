import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Grid,
  LinearProgress,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";

import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CalendarSettings from "./calendarConfig/CalendarSettings";
import ClockSettings from "./clockConfig/ClockSettings";
import * as profileData from "../../../../redux/GetApiCalls/profile";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import app from "../../../../firebase";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import DoctorProfileAppointment from "./doctorProfile/DoctorProfileAppointment";

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

  //For Progress Bar Upload Post
  const [progress, setProgress] = React.useState(0);
  const [buffer, setBuffer] = React.useState(10);
  const [uploadPercent, setUploadPercent] = useState(0);

  const progressRef = React.useRef(() => {});
  React.useEffect(() => {
    progressRef.current = () => {
      if (progress > 100) {
        setProgress(0);
        setBuffer(10);
      } else {
        const diff = uploadPercent;
        const diff2 = uploadPercent;
        setProgress(progress + diff);
        setBuffer(progress + diff + diff2);
      }
    };
  });

  React.useEffect(() => {
    const timer = setInterval(() => {
      progressRef.current();
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  //For Uploading docs and saving the other data
  const [date, setDate] = useState("");
  const [timeSlotId, setTimeSlotId] = useState("");
  const [remark, setRemark] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewFile, setPreviewFile] = useState(null);

  const handleFileSelect = (event) => {
    const files = event.target.files;
    setSelectedFiles(files);
  };

  const handleFilePreview = (file) => {
    setPreviewFile(file);
    setPreviewOpen(true);
  };

  const handleClosePreview = () => {
    setPreviewOpen(false);
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
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              setUploadPercent(progress);
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
              setUploadPercent(0);
              // Handle API response
              setSelectedFiles([]); // Clear the selected files
              alert("Your Post was uploaded successfully");
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

  //For Confirmation Of Check Box
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);

  console.log(date);
  console.log(timeSlotId);

  return (
    <Box p={2}>
      <Grid container spacing={2}>
        <DoctorProfileAppointment
          profile={profile}
          scheduleInfo={scheduleInfo}
        />
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
                      <LinearProgress
                        variant="buffer"
                        value={progress}
                        valueBuffer={buffer}
                      />
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
                          accept=".pdf, image/*"
                          multiple
                          type="file"
                          onChange={handleFileSelect}
                        />
                      </Button>
                      <Typography variant="subtitle2" sx={{ mt: 1 }}>
                        Selected Files:
                      </Typography>
                      {selectedFiles.length > 0 && (
                        <ul>
                          {Array.from(selectedFiles).map((file, index) => (
                            <li key={index}>
                              {file.name}
                              <Button
                                variant="text"
                                size="small"
                                onClick={() => handleFilePreview(file)}
                              >
                                View
                              </Button>
                            </li>
                          ))}
                        </ul>
                      )}
                    </Grid>

                    <Grid item xs={12}>
                      <Typography variant="subtitle2">
                        <Checkbox
                          defaultChecked={isCheckboxChecked}
                          onChange={(e) =>
                            setIsCheckboxChecked(e.target.checked)
                          }
                        />
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
                        disabled={
                          date === "" ||
                          timeSlotId === "" ||
                          remark === "" ||
                          // selectedFiles === [null]
                          !isCheckboxChecked
                        }
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
      {previewOpen && (
        <Modal open={previewOpen} onClose={handleClosePreview}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
            }}
          >
            <Typography variant="h6">{previewFile.name}</Typography>
            {previewFile.type === "application/pdf" ? (
              <Box>
                <embed
                  src={URL.createObjectURL(previewFile)}
                  type="application/pdf"
                  width="100%"
                  height="800px"
                />
                <Button
                  href={URL.createObjectURL(previewFile)}
                  target="_blank"
                  variant="contained"
                  fullWidth
                >
                  Open Full View
                </Button>
              </Box>
            ) : (
              <Box>
                <img
                  src={URL.createObjectURL(previewFile)}
                  alt={previewFile.name}
                  style={{ maxWidth: "100%", maxHeight: "500px" }}
                />
                <Button
                  href={URL.createObjectURL(previewFile)}
                  target="_blank"
                  variant="contained"
                  fullWidth
                >
                  Open Full View
                </Button>
              </Box>
            )}
          </Box>
        </Modal>
      )}
    </Box>
  );
};

export default BookAppointment;
