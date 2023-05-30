import {
  Box,
  Card,
  CardActions,
  CardContent,
  Grid,
  Pagination,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import QueueCalendar from "../../../components/nurse/ViewAppointment/leftbar/QueueCalendar";
import DoctorStatusSection from "../../../components/nurse/ViewAppointment/righbar/DoctorStatusSection";
import * as doctorSvc from "../../../redux/PostApiCalls/doctor";
import { DEFAULT_DATE_FORMAT } from "../../../redux/default";
import dayjs from "dayjs";
import Queues from "../../../components/nurse/ViewAppointment/content/QueueList/Queues";
import ApprovedAppointments from "../../../components/nurse/ViewAppointment/content/AppointmentList/ApprovedAppointments";
import AppointmentQueueTabs from "../../../components/nurse/ViewAppointment/content/QueueList/AppointmentQueueTabs";
import * as appointmentSvc from "../../../redux/GetApiCalls/appointment";
import { SnackBarContext } from "../../../context/SnackBarContext";
import * as queueSvc from "../../../redux/GetApiCalls/queue";
import SetUpWalkInPatient from "../../../components/nurse/ViewAppointment/leftbar/SettingUpWalkIn/SetUpWalkInPatient";

const DEFAULT_PAGE_SIZE = 5;

function NurseViewAppointmentQueue() {
  const [date, setDate] = useState(dayjs());
  const [doctorStatusList, setDoctorStatusList] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  console.log("selectedDoctor", selectedDoctor);

  const [activeTab, setActiveTab] = useState("APPOINTMENT");
  const [selectedStatus, setSelectedStatus] = useState("SCHEDULED");
  const [queues, setQueues] = useState([]);
  console.log(queues);
  const [appointments, setAppointments] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const { onShowSuccess, onShowFail } = useContext(SnackBarContext);
  const [isLoading, setIsLoading] = useState(false);

  const [isQueueFormOpen, setIsQueueFormOpen] = useState(false);

  async function fetchDoctorStatusList() {
    try {
      if (date) {
        const { data } = await doctorSvc.getDoctorStatusList(
          date.format(DEFAULT_DATE_FORMAT)
        );
        setDoctorStatusList(data);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchAppointments() {
    try {
      const { data } = await appointmentSvc.searchAppointments({
        patientId: null,
        date: date.format(DEFAULT_DATE_FORMAT),
        doctorId: selectedDoctor ? selectedDoctor.id : null,
        status: "APPROVED",
        pageNo: page - 1,
        pageSize: DEFAULT_PAGE_SIZE,
      });
      setAppointments(data.content);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchQueues() {
    try {
      const { data: queuesPage } = await queueSvc.searchQueues({
        date: date.format(DEFAULT_DATE_FORMAT),
        checkInStatus: selectedStatus,
        doctorId: selectedDoctor ? selectedDoctor.id : null,
        pageNo: page - 1,
        pageSize: DEFAULT_PAGE_SIZE,
      });
      setQueues(queuesPage.content);
      setTotalPages(queuesPage.totalPages);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleArrivalChange(appointmentId, hasArrived) {
    setIsLoading(true);
    try {
      const { data } = await appointmentSvc.changeArrivalStatus(appointmentId, {
        hasArrived,
      });
      console.log(data);
      fetchAppointments();
    } catch (error) {
      console.error(error);
      onShowFail(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleStatusChange(queueId, checkInStatus) {
    setIsLoading(true);
    try {
      const { data } = await queueSvc.updateQueueStatus(queueId, {
        checkInStatus,
      });
      console.log(data);
      fetchQueues();
    } catch (error) {
      console.error(error);
      onShowFail(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  }

  function handleDateChange(event) {
    setDate(event);
    fetchDoctorStatusList(event.format(DEFAULT_DATE_FORMAT));
  }

  function handleCreateWalkIn(event) {
    // TODO
  }

  useEffect(() => {
    fetchDoctorStatusList();
  }, [date]);

  useEffect(() => {
    if (date) {
      switch (activeTab) {
        case "APPOINTMENT":
          fetchAppointments();
          break;
        case "QUEUE":
          fetchQueues();
          break;
        default:
          throw new Error("Invalid tab");
      }
    }
  }, [date, selectedDoctor, page, activeTab, selectedStatus]);

  return (
    <>
      <Box>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12} lg={4}>
                <QueueCalendar
                  date={date}
                  onDateChange={handleDateChange}
                  onCreateWalkIn={() => setIsQueueFormOpen(true)}
                />
              </Grid>
              <Grid item xs={12} lg={8}>
                <DoctorStatusSection
                  statusList={doctorStatusList}
                  date={date}
                  onSelect={(doctor) => setSelectedDoctor(doctor)}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Box flex={2} p={2}>
              <Card sx={{ borderRadius: 10 }} elevation={3}>
                <CardContent mt={6}>
                  {/* HEADER TABS */}
                  <AppointmentQueueTabs
                    activeTab={activeTab}
                    onTabChange={(tab) => setActiveTab(tab)}
                  />
                  {activeTab === "QUEUE" && (
                    <Queues
                      queues={queues}
                      selectedStatus={selectedStatus}
                      onFilterChange={(status) => setSelectedStatus(status)}
                      onStatusChange={handleStatusChange}
                    />
                  )}

                  {activeTab === "APPOINTMENT" && (
                    <ApprovedAppointments
                      appointments={appointments}
                      onArrivalChange={handleArrivalChange}
                    />
                  )}
                </CardContent>
                <CardActions sx={{ justifyContent: "center" }}>
                  <Pagination
                    count={totalPages}
                    page={page}
                    onChange={(event, newValue) => setPage(newValue)}
                  />
                </CardActions>
              </Card>
            </Box>
          </Grid>
        </Grid>
      </Box>
      {isQueueFormOpen && (
        <SetUpWalkInPatient
          date={date}
          open={isQueueFormOpen}
          onClose={() => setIsQueueFormOpen(false)}
        />
      )}
    </>
  );
}

export default NurseViewAppointmentQueue;
