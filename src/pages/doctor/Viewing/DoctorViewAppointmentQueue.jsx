import { Box, Grid, Stack } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import DoctorLeftBar from "../../../components/doctor/ViewAppointment/leftbar/DoctorLeftBar";
import DoctorRightBar from "../../../components/doctor/ViewAppointment/righbar/DoctorRightBar";
import DoctorContentBottom from "../../../components/doctor/ViewAppointment/content/DoctorContentBottom";
import PatientReports from "../../PatientReports";
import dayjs from "dayjs";
import * as queueSvc from "../../../redux/GetApiCalls/queue";
import { useSelector } from "react-redux";
import { DEFAULT_DATE_FORMAT } from "../../../redux/default";
import QueueCalendar from "../../../components/nurse/ViewAppointment/leftbar/QueueCalendar";
import QueueList from "../../../components/nurse/ViewAppointment/content/QueueList/Scheduled/QueueList";
import QueueCards from "../../../components/doctor/ViewAppointment/QueueCards";
import * as reportSvc from "../../../redux/GetApiCalls/report";
import LoadingScreen from "../../../components/LoadingScreen";
import { SnackBarContext } from "../../../context/SnackBarContext";
import * as util from "../../../redux/util";
import MedicalCertificateDialog from "../../../components/report/MedicalCertificateDialog";

const DEFAULT_PAGE_SIZE = 5;

function DoctorViewAppointmentQueue() {
  const loginDetails = useSelector((state) => state.user?.user);
  const currentDoctor = loginDetails.person;
  const [date, setDate] = useState(dayjs());
  const [queues, setQueues] = useState([]);

  const [selectedPatient, setSelectedPatient] = useState(null);
  const [reports, setReports] = useState([]);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const [isLoading, setIsLoading] = useState(false);
  const { onShowSuccess, onShowFail } = useContext(SnackBarContext);

  const [reportForMc, setReportForMc] = useState(false);
  const isMedCertOpen = !!reportForMc;

  async function fetchQueues() {
    try {
      const { data: queuesPage } = await queueSvc.searchQueues({
        date: date.format(DEFAULT_DATE_FORMAT),
        checkInStatus: null,
        doctorId: currentDoctor.id,
        pageNo: page - 1,
        pageSize: DEFAULT_PAGE_SIZE,
      });
      setQueues(queuesPage.content);
      setTotalPages(queuesPage.totalPages);
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchReports() {
    try {
      const { data } = await reportSvc.searchReports({
        patientId: selectedPatient.id,
      });
      setReports(data);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleSaveReport(reportId, form) {
    setIsLoading(true);
    try {
      const updateReportDto = convertFormToReportDto(form);
      const { data: updatedReport } = await reportSvc.updateReport(
        reportId,
        updateReportDto
      );
      console.log("updated report", updatedReport);

      if (form.prescriptionsHasEdits) {
        const prescriptionDtos = convertFormToPrescriptionDtos(form);
        const { data: updatedReportDetails } =
          await reportSvc.updatePrescriptionList(
            updatedReport.details.id,
            prescriptionDtos
          );
      }
      fetchReports();
      onShowSuccess("Report updated!");
    } catch (error) {
      console.error(error);
      onShowFail(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  }

  function convertFormToReportDto(form) {
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

  function convertFormToPrescriptionDtos(form) {
    return form.prescriptions.map((presc) => {
      return {
        formulation: presc.formulation,
        signatura: util.signatura(presc.signatura),
        subscription: +presc.subscription,
      };
    });
  }

  async function handleFinish(queueId) {
    setIsLoading(true);
    try {
      const { data } = await queueSvc.updateQueueStatus(queueId, {
        checkInStatus: "FINISHED",
      });
      fetchQueues();
      onShowSuccess("Queue updated!");
    } catch (error) {
      console.error(error);
      onShowFail(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (date) {
      fetchQueues();
    }
  }, [date]);

  useEffect(() => {
    if (selectedPatient) {
      fetchReports();
    } else {
      setReports([]);
    }
  }, [selectedPatient]);

  return (
    <>
      <Box>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="center"
          alignItems="center"
          // spacing={2}
        >
          <Grid container spacing={0}>
            <Grid item xs={12}>
              <Stack
                direction={{ xs: "column", sm: "column", md: "row" }}
                justifyContent={{ xs: "center", md: "flex-start" }}
                alignItems={{ xs: "center", md: "flex-start" }}
                spacing={4}
              >
                <Grid item lg={3}>
                  <Box
                    flex={2}
                    sx={{ display: { xs: "block", sm: "block", lg: "block" } }}
                  >
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <QueueCalendar date={date} onDateChange={setDate} />
                      </Grid>
                      <Grid item xs={12}>
                        <QueueCards
                          queues={queues}
                          onSelect={setSelectedPatient}
                          onFinish={handleFinish}
                        />
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
                <Grid item lg={9}>
                  <PatientReports
                    reports={reports}
                    onSave={handleSaveReport}
                    onViewMc={setReportForMc}
                    onViewReferral={() => {}}
                  />
                  {isLoading && <LoadingScreen open={isLoading} />}
                </Grid>
              </Stack>
            </Grid>
          </Grid>
        </Stack>
      </Box>
      {isMedCertOpen && (
        <MedicalCertificateDialog
          open={isMedCertOpen}
          onClose={() => setReportForMc(null)}
          report={reportForMc}
        />
      )}
    </>
  );
}

export default DoctorViewAppointmentQueue;
