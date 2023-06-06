import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Grid,
  List,
  ListItem,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import dayjs from "dayjs";

const DoctorProfileAppointment = ({ profile, scheduleInfo }) => {
  return (
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
              {profile?.suffixName !== "" || null ? profile?.suffixName : ""}
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
              {/* <Typography variant="body2" color="text.secondary">
                Presence
                <Typography variant="body1" color="text.primary">
                  {profile?.content?.isIn === false
                    ? "Present"
                    : "Absent/Leave"}
                </Typography>
              </Typography> */}
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
  );
};

export default DoctorProfileAppointment;
