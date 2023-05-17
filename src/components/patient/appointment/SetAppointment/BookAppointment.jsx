import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import {
  DateCalendar,
  LocalizationProvider,
  StaticTimePicker,
} from "@mui/x-date-pickers";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const BookAppointment = () => {
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
                  Lizard
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  10 April, 1999
                </Typography>
                <Stack
                  direction={{ xs: "row", md: "row" }}
                  justifyContent={{ xs: "center", md: "flex-start" }}
                  alignItems={{ xs: "center", md: "flex-start" }}
                  spacing={2}
                  mt={2}
                >
                  <Typography variant="body2" color="text.secondary">
                    Weight
                    <Typography variant="body1" color="text.primary">
                      60 kg
                    </Typography>
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Height
                    <Typography variant="body1" color="text.primary">
                      1.72 m
                    </Typography>
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Blood
                    <Typography variant="body1" color="text.primary">
                      A+
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
                  color="text.primary"
                >
                  Health Care Professional
                </Typography>
                {/* <Typography variant="body2" color="text.secondary">
              10 April, 1999
            </Typography> */}
                <List sx={{ width: "100%", maxWidth: 360 }} dense>
                  <ListItem disablePadding>
                    {/* <ListItemButton> */}
                    <ListItemAvatar>
                      <Avatar
                        src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWadeZ6aQggj21bHnsjbOyRJ9ZavJGiYnG-oI7fN_tzH4qNXZnOh3GQr4vkpYNqN95C7Y&usqp=CAU`}
                      />
                    </ListItemAvatar>
                    <ListItemText variant="subtitle1" primary="Dr. Strange" />
                    {/* </ListItemButton> */}
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </List>

                <Typography
                  gutterBottom
                  variant="subtitle2"
                  component="div"
                  color="text.primary"
                >
                  Health Plan
                </Typography>
                {/* <Typography variant="body2" color="text.secondary">
              10 April, 1999
            </Typography> */}
                <List sx={{ width: "100%", maxWidth: 360 }} dense>
                  <ListItem disablePadding>
                    {/* <ListItemButton> */}
                    <ListItemAvatar>
                      <Avatar
                        src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWadeZ6aQggj21bHnsjbOyRJ9ZavJGiYnG-oI7fN_tzH4qNXZnOh3GQr4vkpYNqN95C7Y&usqp=CAU`}
                      />
                    </ListItemAvatar>
                    <ListItemText variant="subtitle1" primary="Intellicare" />
                    {/* </ListItemButton> */}
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </List>

                <Typography
                  gutterBottom
                  variant="subtitle2"
                  component="div"
                  color="text.primary"
                >
                  Dependent
                </Typography>
                {/* <Typography variant="body2" color="text.secondary">
              10 April, 1999
            </Typography> */}
                <List sx={{ width: "100%", maxWidth: 360 }} dense>
                  <ListItem disablePadding>
                    {/* <ListItemButton> */}
                    <ListItemAvatar>
                      <Avatar
                        src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWadeZ6aQggj21bHnsjbOyRJ9ZavJGiYnG-oI7fN_tzH4qNXZnOh3GQr4vkpYNqN95C7Y&usqp=CAU`}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      variant="subtitle1"
                      primary="Senku Ishigami"
                    />
                    {/* </ListItemButton> */}
                  </ListItem>
                  <Divider variant="inset" component="li" />
                  <ListItem disablePadding>
                    {/* <ListItemButton> */}
                    <ListItemAvatar>
                      <Avatar
                        src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWadeZ6aQggj21bHnsjbOyRJ9ZavJGiYnG-oI7fN_tzH4qNXZnOh3GQr4vkpYNqN95C7Y&usqp=CAU`}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      variant="subtitle1"
                      primary="Senku Ishigami"
                    />
                    {/* </ListItemButton> */}
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
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer
                      components={[
                        "DateCalendar",
                        "DateCalendar",
                        "DateCalendar",
                      ]}
                    >
                      <DemoItem>
                        <DateCalendar defaultValue={dayjs("2022-04-17")} />
                      </DemoItem>
                    </DemoContainer>
                  </LocalizationProvider>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={12} lg={6}>
              <Card>
                <CardContent>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer
                      components={[
                        "TimePicker",
                        "MobileTimePicker",
                        "DesktopTimePicker",
                        "StaticTimePicker",
                      ]}
                    >
                      <DemoItem>
                        <StaticTimePicker
                          defaultValue={dayjs("2022-04-17T15:30")}
                          // orientation="landscape"
                          slotProps={{
                            actionBar: { actions: [] },
                          }}
                        />
                      </DemoItem>
                    </DemoContainer>
                  </LocalizationProvider>
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
                        <input hidden accept="image/*" multiple type="file" />
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
                      <Button variant="contained" sx={{ mr: 2 }}>
                        Book Now
                      </Button>
                      <Button variant="outlined">Cancel</Button>
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
