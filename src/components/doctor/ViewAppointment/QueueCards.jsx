import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  Stack,
  Typography,
  Box,
  IconButton,
  Button,
  CardHeader,
  Divider,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import * as util from "../../../redux/util";
import * as appointmentSvc from "../../../redux/GetApiCalls/appointment";
import { green } from "@mui/material/colors";

export default function QueueCards({ queues, onSelect, onFinish }) {
  const styles = {
    container: {
      width: "100%",
      bgcolor: "background.paper",
      boxShadow: 5,
      borderRadius: 10,
      display: "flex",
      flexDirection: "column",
      maxHeight: "40rem",
      overflowY: "scroll",
      "&::-webkit-scrollbar": {
        width: "0.4em",
      },
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: "#888",
      },
      padding: 2,
    },
    box: {
      textAlign: "center",
      m: 2,
    },
  };
  return (
    <Box p={2}>
      <Stack sx={styles.container}>
        {queues.length > 0 ? (
          queues.map((queue) => (
            <QueueCard
              key={queue.id}
              queue={queue}
              onSelect={onSelect}
              onFinish={onFinish}
            />
          ))
        ) : (
          <Box sx={styles.box}>
            <Typography variant="body1">No queues to show</Typography>
          </Box>
        )}
      </Stack>
    </Box>
  );
}

function QueueCard({ queue, onSelect, onFinish }) {
  const { id, startTime, checkInStatus, type, patient, report, date } = queue;

  const isOngoing = checkInStatus === "ONGOING_CONSULTATION";

  const [appointment, setAppointment] = useState(null);

  async function fetchAppointment() {
    try {
      const { data } = await appointmentSvc.searchAppointments({
        patientId: patient.id,
        date: date,
        doctorId: null,
        status: "APPROVED",
        pageNo: 0,
        pageSize: 1,
      });
      setAppointment(data.content[0]);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (type === "APPOINTMENT") {
      fetchAppointment();
    }
  }, [queue]);

  return (
    <Card>
      <CardContent>
        <Stack spacing={1} alignItems={`center`} direction={`row`}>
          <Avatar src={patient.avatarUrl || ""} />
          <div>
            <Typography variant="body1">{util.name(patient)}</Typography>
            {appointment ? (
              <Typography variant="body2" color={green[500]}>
                {util.timeSlot(appointment.timeSlot)}
              </Typography>
            ) : (
              <Typography variant="body2" color={`error`}>
                NO APPOINTMENT
              </Typography>
            )}
          </div>
        </Stack>
      </CardContent>
      <Divider variant="middle" />
      <CardContent>
        <Stack spacing={1} textAlign={`center`}>
          <Typography variant="body1" color={green[500]}>
            {util.checkInStatus(checkInStatus).toUpperCase()}
          </Typography>
        </Stack>
      </CardContent>
      <CardActions sx={{ justifyContent: isOngoing ? "space-between" : "end" }}>
        {isOngoing && (
          <Button variant="outlined" onClick={() => onFinish(id)}>
            FINISH
          </Button>
        )}
        <Button
          variant="contained"
          size="small"
          onClick={() => onSelect(patient)}
        >
          VIEW REPORTS
        </Button>
      </CardActions>
    </Card>
  );
}
