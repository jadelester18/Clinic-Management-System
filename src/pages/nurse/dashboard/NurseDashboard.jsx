import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { blue } from "@mui/material/colors";
import { orange } from "@mui/material/colors";
import { green } from "@mui/material/colors";
import { yellow } from "@mui/material/colors";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TroubleshootIcon from "@mui/icons-material/Troubleshoot";
import MedicalInformationIcon from "@mui/icons-material/MedicalInformation";
import AssessmentIcon from "@mui/icons-material/Assessment";
import * as appointmentSvc from "../../../redux/GetApiCalls/appointment";
import * as queueSvc from "../../../redux/GetApiCalls/queue";
import dayjs from "dayjs";
import { DEFAULT_DATE_FORMAT } from "../../../redux/default";

const DEFAULT_PAGE_SIZE = 100;

const NurseDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [queues, setQueues] = useState([]);

  async function fetchAppointments() {
    try {
      const { data } = await appointmentSvc.searchAppointments({
        patientId: null,
        date: null,
        doctorId: null,
        status: null,
        pageNo: 0,
        pageSize: DEFAULT_PAGE_SIZE,
      });
      setAppointments(data.content);
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchQueues() {
    try {
      const { data: queuesPage } = await queueSvc.searchQueues({
        date: dayjs().format(DEFAULT_DATE_FORMAT),
        checkInStatus: null,
        doctorId: null,
        pageNo: 0,
        pageSize: DEFAULT_PAGE_SIZE,
      });
      setQueues(queuesPage.content);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchAppointments();
    fetchQueues();
  }, []);

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Card>
            <CardActionArea>
              <Box
                sx={{
                  position: "relative",
                  backgroundColor: orange[500],
                  height: 140,
                }}
              >
                <Typography
                  sx={{
                    position: "absolute",
                    top: 10,
                    left: 20,
                    m: 1,
                    color: "black",
                    zIndex: 1,
                    fontSize: "1rem",
                  }}
                  variant="body2"
                >
                  New Appointments
                </Typography>
                <Typography
                  sx={{
                    position: "absolute",
                    top: 25,
                    left: 20,
                    m: 1,
                    color: "black",
                    zIndex: 1,
                    fontWeight: "bold",
                  }}
                  variant="h2"
                >
                  {
                    appointments.filter(
                      (appointment) => appointment.status === "PENDING_APPROVAL"
                    ).length
                  }
                </Typography>
                <CardMedia height="140" alt="green iguana">
                  <PersonAddIcon
                    sx={{
                      fontSize: 180,
                      color: "#fff",
                      zIndex: 0,
                      marginLeft: "11rem",
                      opacity: "40%",
                    }}
                  >
                    insert_photo
                  </PersonAddIcon>
                </CardMedia>
              </Box>
              {/* <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Lizard
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Lizards are a widespread group of squamate reptiles, with over
                  6,000 species, ranging across all continents except Antarctica
                </Typography>
              </CardContent> */}
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card>
            <CardActionArea>
              <Box
                sx={{
                  position: "relative",
                  backgroundColor: green[500],
                  height: 140,
                }}
              >
                <Typography
                  sx={{
                    position: "absolute",
                    top: 10,
                    left: 20,
                    m: 1,
                    color: "black",
                    zIndex: 1,
                    fontSize: "1rem",
                  }}
                  variant="body2"
                >
                  Approved Appointments
                </Typography>
                <Typography
                  sx={{
                    position: "absolute",
                    top: 25,
                    left: 20,
                    m: 1,
                    color: "black",
                    zIndex: 1,
                    fontWeight: "bold",
                  }}
                  variant="h2"
                >
                  {
                    appointments.filter(
                      (appointment) => appointment.status === "APPROVED"
                    ).length
                  }
                </Typography>
                <CardMedia height="140" alt="green iguana">
                  <TroubleshootIcon
                    sx={{
                      fontSize: 180,
                      color: "#fff",
                      zIndex: 0,
                      marginLeft: "11rem",
                      opacity: "40%",
                    }}
                  >
                    insert_photo
                  </TroubleshootIcon>
                </CardMedia>
              </Box>
              {/* <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Lizard
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Lizards are a widespread group of squamate reptiles, with over
                  6,000 species, ranging across all continents except Antarctica
                </Typography>
              </CardContent> */}
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card>
            <CardActionArea>
              <Box
                sx={{
                  position: "relative",
                  backgroundColor: yellow[500],
                  height: 140,
                }}
              >
                <Typography
                  sx={{
                    position: "absolute",
                    top: 10,
                    left: 20,
                    m: 1,
                    color: "black",
                    zIndex: 1,
                    fontSize: "1rem",
                  }}
                  variant="body2"
                >
                  For Assessment Today
                </Typography>
                <Typography
                  sx={{
                    position: "absolute",
                    top: 25,
                    left: 20,
                    m: 1,
                    color: "black",
                    zIndex: 1,
                    fontWeight: "bold",
                  }}
                  variant="h2"
                >
                  {
                    queues.filter(
                      (queue) => queue.checkInStatus === "FOR_ASSESSMENT"
                    ).length
                  }
                </Typography>
                <CardMedia height="140" alt="green iguana">
                  <MedicalInformationIcon
                    sx={{
                      fontSize: 180,
                      color: "#fff",
                      zIndex: 0,
                      marginLeft: "11rem",
                      opacity: "40%",
                    }}
                  >
                    insert_photo
                  </MedicalInformationIcon>
                </CardMedia>
              </Box>
              {/* <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Lizard
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Lizards are a widespread group of squamate reptiles, with over
                  6,000 species, ranging across all continents except Antarctica
                </Typography>
              </CardContent> */}
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card>
            <CardActionArea>
              <Box
                sx={{
                  position: "relative",
                  backgroundColor: blue[500],
                  height: 140,
                }}
              >
                <Typography
                  sx={{
                    position: "absolute",
                    top: 10,
                    left: 20,
                    m: 1,
                    color: "black",
                    zIndex: 1,
                    fontSize: "1rem",
                  }}
                  variant="body2"
                >
                  Total Patient Finished Today
                </Typography>
                <Typography
                  sx={{
                    position: "absolute",
                    top: 25,
                    left: 20,
                    m: 1,
                    color: "black",
                    zIndex: 1,
                    fontWeight: "bold",
                  }}
                  variant="h2"
                >
                  {
                    queues.filter((queue) => queue.checkInStatus === "FINISHED")
                      .length
                  }
                </Typography>
                <CardMedia height="140" alt="green iguana">
                  <AssessmentIcon
                    sx={{
                      fontSize: 180,
                      color: "#fff",
                      zIndex: 0,
                      marginLeft: "11rem",
                      opacity: "40%",
                    }}
                  >
                    insert_photo
                  </AssessmentIcon>
                </CardMedia>
              </Box>
              {/* <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Lizard
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Lizards are a widespread group of squamate reptiles, with over
                  6,000 species, ranging across all continents except Antarctica
                </Typography>
              </CardContent> */}
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default NurseDashboard;
