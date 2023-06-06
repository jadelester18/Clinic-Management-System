import {
  Box,
  Card,
  CardActions,
  CardContent,
  Grid,
  Pagination,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import PatientMedication from "./medication/PatientMedication";
import PatientReports from "./reports/PatientReports";
import PatientAppointments from "./activities/PatientAppointments";
import { useSelector } from "react-redux";
import axios from "axios";
import * as appointmentSvc from "../../../../redux/GetApiCalls/appointment";
import UpdateAppointmentDialog from "../../../nurse/ViewNewAppointment/righbar/UpdateAppointmentDialog";
import { DEFAULT_DATE_FORMAT } from "../../../../redux/default";
import { SnackBarContext } from "../../../../context/SnackBarContext";
import LoadingScreen from "../../../LoadingScreen";
import * as reportSvc from "../../../../redux/GetApiCalls/report";
import ReportDialog from "../../../nurse/ViewAppointment/content/QueueList/ReportDialog";

const DEFAULT_PAGE_SIZE = 5;

const PatientRightBar = ({ currentPatient }) => {
  const [reports, setReports] = useState([]);
  const [appointments, setAppointments] = useState([]);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const appointmentIsOpen = !!selectedAppointment;

  const [selectedReport, setSelectedReport] = useState(null);
  const reportIsOpen = !!selectedReport;
  const [isSavingReport, setIsSavingReport] = useState(false);

  const [isUpdating, setIsUpdating] = useState(false);
  const { onShowSuccess, onShowFail } = useContext(SnackBarContext);

  const fetchAppointments = async () => {
    try {
      if (currentPatient) {
        const { data } = await appointmentSvc.searchAppointments({
          patientId: currentPatient.id,
          doctorId: null,
          date: null,
          status: null,
          pageNo: page - 1,
          pageSize: DEFAULT_PAGE_SIZE,
        });
        setAppointments(data.content);
        setTotalPages(data.totalPages);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchReports = async () => {
    try {
      if (currentPatient) {
        const { data } = await reportSvc.searchReports({
          patientId: currentPatient.id,
        });
        console.log("reports", data);
        setReports(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateAppointment = async (
    appointmentId,
    updateAppointmentDto
  ) => {
    setIsUpdating(true);
    try {
      const { data } = await appointmentSvc.updateAppointment(
        appointmentId,
        updateAppointmentDto
      );
      fetchAppointments();
      onShowSuccess("Appointment updated!");
    } catch (error) {
      console.error(error);
      onShowFail(error.response.data.message);
    } finally {
      setIsUpdating(false);
    }
  };

  const styles = {
    card: { borderRadius: 10, boxShadow: 10, minHeight: 600 },
  };

  useEffect(() => {
    fetchAppointments();
  }, [page]);

  useEffect(() => {
    fetchReports();
  }, []);

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} lg={8}>
          <Grid
            container
            justifyContent={"space-between"}
            sx={{ textAlign: { xs: "center" } }}
          >
            <Grid
              item
              xs={12}
              md={6}
              sx={{ textAlign: { xs: "center", md: "left" } }}
            >
              <Typography variant="h3">
                Hello, {currentPatient?.firstName}!
              </Typography>
              <Typography variant="h6" color="text.secondary">
                How are you feeling today?
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              sx={{ textAlign: { xs: "center", md: "right" } }}
            >
              <Typography variant="h6">{formattedDate}</Typography>
              <Typography variant="h3" color="text.secondary">
                {currentTime}
              </Typography>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} lg={5}>
              <Card sx={styles.card}>
                <PatientMedication report={reports[0]} />
              </Card>
            </Grid>
            <Grid item xs={12} lg={7}>
              <Card sx={styles.card}>
                <PatientAppointments
                  appointments={appointments}
                  onView={setSelectedAppointment}
                />
                <CardActions sx={{ justifyContent: "center" }}>
                  <Pagination
                    page={page}
                    count={totalPages}
                    onChange={(event, page) => setPage(page)}
                  />
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} lg={4}>
          <Card sx={styles.card}>
            <PatientReports reports={reports} onView={setSelectedReport} />
          </Card>
        </Grid>
      </Grid>
      {appointmentIsOpen && (
        <UpdateAppointmentDialog
          appointment={selectedAppointment}
          open={appointmentIsOpen}
          onClose={() => setSelectedAppointment(null)}
          onSave={handleUpdateAppointment}
        />
      )}
      {reportIsOpen && (
        <ReportDialog
          open={reportIsOpen}
          reportId={selectedReport.id}
          onClose={() => setSelectedReport(null)}
        />
      )}
      {isUpdating && <LoadingScreen open={isUpdating} />}
    </>
  );
};

export default PatientRightBar;

//Getting the current date
const currentDate = new Date().toLocaleString("en-US", {
  weekday: "long",
  month: "short",
  day: "numeric",
  year: "numeric",
});

const formattedDate = currentDate.replace(",", " |");
// console.log(formattedDate); // Output: "Monday | May 15, 2023"

//Current Time
const currentTime = new Date().toLocaleTimeString("en-US", {
  hour: "numeric",
  minute: "numeric",
  hour12: true,
});
// console.log(currentTime); // Output: "4:26 PM"
