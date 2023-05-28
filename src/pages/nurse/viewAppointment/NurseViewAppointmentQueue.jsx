import { Box, Grid, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import QueueCalendar from "../../../components/nurse/ViewAppointment/leftbar/QueueCalendar";
import DoctorStatusSection from "../../../components/nurse/ViewAppointment/righbar/DoctorStatusSection";
import NurseContentBottom from "../../../components/nurse/ViewAppointment/content/QueueList/NurseContentBottom";
import * as doctorSvc from "../../../redux/PostApiCalls/doctor";
import { DEFAULT_DATE_FORMAT } from "../../../redux/default";
import dayjs from "dayjs";

function NurseViewAppointmentQueue() {
  const [date, setDate] = useState(null);
  console.log("date", date?.format(DEFAULT_DATE_FORMAT));
  const [doctorStatusList, setDoctorStatusList] = useState([]);
  console.log("doctorStatusList", doctorStatusList);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  console.log("selectedDoctor", selectedDoctor);
  const [queues, setQueues] = useState([]);
  const [appointments, setAppointments] = useState([]);

  async function fetchDoctorStatusList(dateString) {
    if (dateString) {
      const { data } = await doctorSvc.getDoctorStatusList(dateString);
      setDoctorStatusList(data);
    }
  }

  function handleDateChange(event) {
    setDate(event);
    fetchDoctorStatusList(event.format(DEFAULT_DATE_FORMAT));
  }

  function handleCreateWalkIn(event) {
    // TODO
  }

  function handleDoctorSelect(doctor) {
    setSelectedDoctor(doctor);
  }

  useEffect(() => {
    const today = dayjs();
    setDate(today);
    fetchDoctorStatusList(today.format(DEFAULT_DATE_FORMAT));
  }, []);

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12} lg={4}>
              <QueueCalendar
                date={date}
                onDateChange={handleDateChange}
                onCreateWalkIn={handleCreateWalkIn}
              />
            </Grid>
            <Grid item xs={12} lg={8}>
              <DoctorStatusSection
                statusList={doctorStatusList}
                date={date}
                onSelect={handleDoctorSelect}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <NurseContentBottom />
        </Grid>
      </Grid>
    </Box>
  );
}

export default NurseViewAppointmentQueue;
