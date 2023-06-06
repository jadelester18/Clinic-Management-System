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
import LoadingScreen from "../../../components/LoadingScreen";
import ReportDialog from "../../../components/nurse/ViewAppointment/content/QueueList/ReportDialog";
import * as reportSvc from "../../../redux/GetApiCalls/report";

const DEFAULT_PAGE_SIZE = 5;

function NurseViewAppointmentQueue() {
  const [date, setDate] = useState(dayjs());
  const [doctorStatusList, setDoctorStatusList] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const [activeTab, setActiveTab] = useState("APPOINTMENT");
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [queues, setQueues] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const { onShowSuccess, onShowFail } = useContext(SnackBarContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isSavingReport, setIsSavingReport] = useState(false);

  const [isQueueFormOpen, setIsQueueFormOpen] = useState(false);

  const [selectedReportId, setSelectedReportId] = useState(null);
  const isReportOpen = Boolean(selectedReportId);

  async function fetchDoctorStatusList() {
    try {
      if (date) {
        console.log("date in status list", date.format(DEFAULT_DATE_FORMAT));
        const { data } = await doctorSvc.getDoctorStatusList(
          date.format(DEFAULT_DATE_FORMAT)
        );
        console.log("STATUS LIST", data);
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
      fetchDoctorStatusList();
    } catch (error) {
      console.error(error);
      onShowFail(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  }

  function handleDateChange(event) {
    setDate(event);
  }

  async function handleCreateWalkIn(patientId, doctorId) {
    setIsLoading(true);
    try {
      const { data } = await queueSvc.createWalkInQueue({
        date: date.format(DEFAULT_DATE_FORMAT),
        patientId,
        doctorId,
      });
      console.log("NEW QUEUE ", data);
      if (
        activeTab === "QUEUE" &&
        selectedStatus === "FOR_ASSESSMENT" &&
        selectedDoctor?.id === data.report.doctor.id
      ) {
        fetchQueues();
      } else {
        setActiveTab("QUEUE");
        setSelectedStatus("FOR_ASSESSMENT");
        setSelectedDoctor(data.report.doctor);
      }
      fetchDoctorStatusList();
      onShowSuccess("Patient added to queue");
    } catch (error) {
      console.error(error);
      onShowFail(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSaveReport(reportId, form) {
    setIsSavingReport(true);
    try {
      const updateReportDto = getDtoFromReportForm(form);
      const { data } = await reportSvc.updateReport(reportId, updateReportDto);

      setSelectedReportId(null);
    } catch (error) {
      console.error(error);
      onShowFail(error.response.data.message);
    } finally {
      setIsSavingReport(false);
    }
  }

  function getDtoFromReportForm(form) {
    return {
      consultationType: form.consultationType,
      nurseId: form.nurse.id,
      chiefComplaint: form.chiefComplaint,
      medicalHistory: form.medicalHistory,
      diagnosis: form.diagnosis,
      prognosis: form.prognosis,
      management: form.management,
      labProcedureIds: form.labProcedures.map((procedure) => procedure.id),
      bloodPressure: form.bloodPressure,
      temperatureC: +form.temperatureC,
      respiratoryRateBPM: +form.respiratoryRateBPM,
      heartRateBPM: +form.heartRateBPM,
      oxygenSaturation: +form.oxygenSaturation,
    };
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
                  selected={selectedDoctor}
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
                    doctor={selectedDoctor}
                    activeTab={activeTab}
                    onTabChange={(tab) => setActiveTab(tab)}
                  />
                  {activeTab === "QUEUE" && (
                    <Queues
                      queues={queues}
                      selectedStatus={selectedStatus}
                      onFilterChange={setSelectedStatus}
                      onStatusChange={handleStatusChange}
                      onViewReport={(reportId) => setSelectedReportId(reportId)}
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
          onSubmit={handleCreateWalkIn}
        />
      )}
      {isReportOpen && (
        <ReportDialog
          isSaving={isSavingReport}
          open={isReportOpen}
          reportId={selectedReportId}
          onClose={() => setSelectedReportId(null)}
          onSave={handleSaveReport}
        />
      )}
      {isLoading && <LoadingScreen open={isLoading} />}
    </>
  );
}

export default NurseViewAppointmentQueue;
