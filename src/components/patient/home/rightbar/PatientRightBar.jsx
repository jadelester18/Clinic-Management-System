import {
  Box,
  Card,
  CardActions,
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
import ConfirmDialog from "../../../ConfirmDialog";

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

  const [cancelDialog, setCancelDialog] = useState(DEFAULT_DIALOG);

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

  function handleCancel(appointmentId) {
    handleStatusChange(appointmentId, "CANCELLED");
    setCancelDialog(DEFAULT_DIALOG);
  }

  async function handleStatusChange(appointmentId, newStatus) {
    setIsUpdating(true);
    try {
      const { data } = await appointmentSvc.changeAppointmentStatus(
        appointmentId,
        { status: newStatus }
      );
      fetchAppointments();
      onShowSuccess("Appointment cancelled");
    } catch (error) {
      console.error(error);
      onShowFail(error.response.data.message);
    } finally {
      setIsUpdating(false);
    }
  }

  const styles = {
    card: { borderRadius: 10, boxShadow: 10 },
  };

  useEffect(() => {
    fetchAppointments();
  }, [page]);

  useEffect(() => {
    fetchReports();
  }, []);

  return (
    <>
      <Box>
        <Grid container spacing={0}>
          <Grid xs={12}>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              justifyContent={{ xs: "center", md: "flex-start" }}
              alignItems={{ xs: "center", md: "flex-start" }}
              spacing={2}
            >
              <Grid item lg={8}>
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  justifyContent={{ xs: "center", md: "flex-start" }}
                  alignItems={{ xs: "center", md: "flex-start" }}
                  spacing={2}
                >
                  <Grid item lg={6}>
                    <Typography variant="h3">
                      Hello, {currentPatient?.firstName}!
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                      How are you feeling today?
                    </Typography>
                  </Grid>
                  <Grid item lg={6} textAlign={"right"}>
                    <Typography variant="h6">{formattedDate}</Typography>
                    <Typography variant="h3" color="text.secondary">
                      {currentTime}
                    </Typography>
                  </Grid>
                </Stack>
                <Stack
                  direction={{ xs: "column", lg: "row" }}
                  justifyContent={{ xs: "center", md: "flex-start" }}
                  alignItems={{ xs: "center", md: "flex-start" }}
                  spacing={2}
                  mt={4}
                >
                  <Grid item lg={5}>
                    <PatientMedication report={reports[0]} />
                  </Grid>
                  <Grid item lg={7}>
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
                </Stack>
              </Grid>
              <Grid item lg={4}>
                <PatientReports reports={reports} onView={setSelectedReport} />
              </Grid>
            </Stack>
          </Grid>
        </Grid>
      </Box>
      {appointmentIsOpen && (
        <UpdateAppointmentDialog
          appointment={selectedAppointment}
          open={appointmentIsOpen}
          onClose={() => setSelectedAppointment(null)}
          onSave={handleUpdateAppointment}
          onCancel={(appointmentId) =>
            setCancelDialog({ appointmentId, open: true })
          }
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
      {cancelDialog.open && (
        <ConfirmDialog
          title="Cancel appointment?"
          subtitle={
            "Ensure that the cancellation is properly coordinated and the clinic is properly informed."
          }
          open={cancelDialog.open}
          onConfirm={() => handleCancel(cancelDialog.appointmentId)}
          onClose={() => setCancelDialog(DEFAULT_DIALOG)}
        />
      )}
    </>
  );
};

const DEFAULT_DIALOG = {
  appointmentId: 0,
  open: false,
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
