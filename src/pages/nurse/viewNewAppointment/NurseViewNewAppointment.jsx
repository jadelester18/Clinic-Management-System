import {
  Box,
  Card,
  CardActions,
  CardContent,
  Grid,
  Pagination,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import Calendar from "../../../components/nurse/ViewNewAppointment/leftbar/Calendar";
import AppointmentsApprovalList from "../../../components/nurse/ViewNewAppointment/righbar/AppointmentsApprovalList";
import * as appointmentSvc from "../../../redux/GetApiCalls/appointment";
import dayjs from "dayjs";
import { DEFAULT_DATE_FORMAT, UNEXPECTED_ERROR } from "../../../redux/default";
import LoadingScreen from "../../../components/LoadingScreen";
import { SnackBarContext } from "../../../context/SnackBarContext";
import ConfirmDialog from "../../../components/ConfirmDialog";

const DEFAULT_PAGE_SIZE = 5;

function NurseViewNewAppointment() {
  const [date, setDate] = useState(null);
  const [appointments, setAppointments] = useState([]);
  // const [count, setCount] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  // const [pagination, setPagination] = useState(DEFAULT_PAGINATION);
  const [pageNo, setPageNo] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const { onShowSuccess, onShowFail } = useContext(SnackBarContext);

  async function fetchAppointments(dateString) {
    try {
      if (dateString) {
        const { data: page } = await appointmentSvc.searchAppointments({
          patientId: null,
          date: dateString,
          doctorId: null,
          status: null,
          pageNo: pageNo - 1,
          pageSize: DEFAULT_PAGE_SIZE,
        });
        setAppointments(page.content);
        // setCount(page.totalElements);
        setTotalPages(page.totalPages);
      }
    } catch (error) {
      console.error(error);
      onShowFail(UNEXPECTED_ERROR);
    }
  }

  function handleDateChange(event) {
    fetchAppointments(event.format(DEFAULT_DATE_FORMAT));
    setDate(event);
  }

  async function handleUpdate(appointmentId, updateAppointmentDto) {
    setIsLoading(true);
    try {
      const { data } = await appointmentSvc.updateAppointment(
        appointmentId,
        updateAppointmentDto
      );
      fetchAppointments(date.format(DEFAULT_DATE_FORMAT));
      onShowSuccess("Appointment updated!");
    } catch (error) {
      console.error(error);
      onShowFail(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleStatusChange(appointmentId, newStatus) {
    setIsLoading(true);
    try {
      const { data } = await appointmentSvc.changeAppointmentStatus(
        appointmentId,
        { status: newStatus }
      );
      console.log("updated appointment", data);
      fetchAppointments(date.format(DEFAULT_DATE_FORMAT));
      let message;
      switch (newStatus) {
        case "PENDING_APPROVAL":
          message = "Approval withdrawn";
          break;
        case "APPROVED":
          message = "Appointment approved!";
          break;
        case "CANCELLED":
          message = "Appointment cancelled";
          break;
        default:
          throw new Error("Invalid status");
      }
      onShowSuccess(message);
    } catch (error) {
      console.error(error);
      onShowFail(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  }

  function handlePageChange(event, value) {
    setPageNo(value);
  }

  useEffect(() => {
    const today = dayjs();
    setDate(today);
    fetchAppointments(today.format(DEFAULT_DATE_FORMAT));
  }, []);

  // useEffect

  useEffect(() => {
    fetchAppointments(date?.format(DEFAULT_DATE_FORMAT));
  }, [pageNo]);

  return (
    <>
      <Box>
        <Grid container spacing={2}>
          <Grid item xs={12} lg={4}>
            <Calendar
              date={date}
              onDateChange={handleDateChange}
              appointments={appointments}
            />
          </Grid>
          <Grid item xs={12} lg={8}>
            <Box flex={2} p={2}>
              <Card sx={{ height: 440, borderRadius: 10 }} elevation={3}>
                <CardContent sx={{ alignItems: "space-between" }}>
                  <AppointmentsApprovalList
                    appointments={appointments}
                    onUpdate={handleUpdate}
                    onStatusChange={handleStatusChange}
                  />
                </CardContent>
                <CardActions sx={{ justifyContent: "center" }}>
                  <Pagination
                    count={totalPages}
                    page={pageNo}
                    onChange={handlePageChange}
                  />
                </CardActions>
              </Card>
            </Box>
          </Grid>
        </Grid>
      </Box>
      {isLoading && <LoadingScreen open={isLoading} />}
    </>
  );
}

export default NurseViewNewAppointment;
