import {
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import { PickersDay } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import React, { useRef, useState } from "react";
import { styled } from "@mui/material/styles";
import Fab from "@mui/material/Fab";
import QueueCalendar from "../../../nurse/ViewAppointment/leftbar/QueueCalendar";
import Queues from "../../../nurse/ViewAppointment/content/QueueList/Queues";
import QueueList from "../../../nurse/ViewAppointment/content/QueueList/Scheduled/QueueList";
import { useReactToPrint } from "react-to-print";

function DoctorLeftBar() {
  const componentRefMedicalCertificate = useRef();
  const handlePrintMedicalCertificate = useReactToPrint({
    pageStyle: "@page {size: 10in 13in}",
    content: () => componentRefMedicalCertificate.current,
    documentTitle: "MedicalCert.pdf",
  });

  const componentRefReferralCertificate = useRef();
  const handlePrintReferralCertificate = useReactToPrint({
    pageStyle: "@page {size: 10in 13in}",
    content: () => componentRefReferralCertificate.current,
    documentTitle: "ReferralCert.pdf",
  });

  return (
    <Box
      flex={2}
      // p={2}
      sx={{ display: { xs: "block", sm: "block", lg: "block" } }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <QueueCalendar
          // date={date}
          // onDateChange={handleDateChange}
          // onCreateWalkIn={() => setIsQueueFormOpen(true)}
          />
        </Grid>
        <Grid item xs={12}>
          <QueueList />
        </Grid>
      </Grid>
    </Box>
  );
}

export default DoctorLeftBar;
