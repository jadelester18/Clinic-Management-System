import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDateTimePicker } from "@mui/x-date-pickers";
import * as util from "../../../../redux/util";
import dayjs from "dayjs";
import * as doctorSvc from "../../../../redux/PostApiCalls/doctor";
import {
  DEFAULT_DATE_FORMAT,
  DEFAULT_TIME_FORMAT,
} from "../../../../redux/default";
import { useSelector } from "react-redux";

export default function UpdateAppointmentDialog({
  appointment,
  open,
  onClose,
  onSave,
  onCancel,
}) {
  const loginDetails = useSelector((state) => state.user?.user);
  const userIsNurse = loginDetails.user.role === "ROLE_NURSE";
  const userIsPatient = loginDetails.user.role === "ROLE_PATIENT";

  const [form, setForm] = useState({
    id: 0,
    patient: null,
    doctor: null,
    dateTime: null,
    remark: "",
    updateReason: "",
    isEdited: false,
  });
  console.log(form);

  const [availableSlots, setAvailableSlots] = useState([]);

  function handleDateTimeChange(event) {
    setForm({ ...form, dateTime: event, isEdited: true });
    fetchAvailableSlots(form.doctor, event.format(DEFAULT_DATE_FORMAT));
  }

  function handleTextInput(event) {
    const { name, value } = event.target;
    setForm({ ...form, isEdited: true, [name]: value });
  }

  function getTimeSlot(dateTime) {
    if (dateTime) {
      return availableSlots.find(
        (slot) => slot.startTime === dateTime.format(DEFAULT_TIME_FORMAT)
      );
    }
  }

  function handleSave() {
    onSave(form.id, {
      date: form.dateTime.format(DEFAULT_DATE_FORMAT),
      timeSlotId: getTimeSlot(form.dateTime).id,
      remark: form.remark,
      doctorId: form.doctor.id,
      attachmentUrls: appointment.attachments.map(
        (attachment) => attachment.url
      ),
      updateReason: form.updateReason,
    });
    onClose();
  }

  function handleCancel() {
    onCancel(form.id);
    onClose();
  }

  function isFormDisabled() {
    return (
      !form.isEdited ||
      !form.doctor ||
      !form.dateTime ||
      !form.remark ||
      !form.updateReason
    );
  }

  async function fetchAvailableSlots(doctor, date) {
    try {
      const { data } = await doctorSvc.getAvailableSlots(doctor.id, date);
      setAvailableSlots(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (appointment) {
      setForm({
        id: appointment.id,
        patient: appointment.patient,
        doctor: appointment.doctor,
        dateTime: util.getDayjsFromDateAndTimeString(
          appointment.date,
          appointment.timeSlot.startTime
        ),
        remark: appointment.remark,
        updateReason: "",
        isEdited: false,
      });
      fetchAvailableSlots(appointment.doctor, appointment.date);
    }
  }, [appointment]);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle variant="h4">{util.name(form.patient)}</DialogTitle>

      <Box mx={3}>
        <Typography variant="caption">Doctor</Typography>
        {form.doctor && (
          <Typography variant="body1">
            {`${util.name(form.doctor)} (${
              form.doctor.specialization.description
            })`}
          </Typography>
        )}
      </Box>

      <DialogContent>
        <Grid
          container
          spacing={2}
          mt={2}
          direction={{ xs: "column", sm: "row" }}
        >
          <Grid item xs={12}>
            <Grid
              container
              direction="row"
              justifyContent="space-evenly"
              alignItems="center"
              spacing={2}
            >
              <Grid item xs={12}>
                <AppointmentDateTimePicker
                  value={form.dateTime}
                  onChange={handleDateTimeChange}
                  doctor={form.doctor}
                  availableSlots={availableSlots}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid
              container
              direction="row"
              justifyContent="space-evenly"
              alignItems="center"
              spacing={2}
            >
              <Grid item xs={12}>
                <TextField
                  autoFocus
                  name="remark"
                  value={form.remark}
                  label="Chief complaint"
                  fullWidth
                  multiline
                  onChange={handleTextInput}
                />
              </Grid>

              {form.isEdited && (
                <Grid item xs={12}>
                  <TextField
                    name="updateReason"
                    value={form.updateReason}
                    fullWidth
                    label="Reason for update"
                    onChange={handleTextInput}
                  />
                </Grid>
              )}
            </Grid>
            {form.isEdited && (
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <DialogContentText
                    variant="caption"
                    sx={{ color: "red" }}
                    mt={2}
                  >
                    {userIsNurse &&
                      `Note: Changes to the appointment must be coordinated with
                    the patient.`}
                    {userIsPatient &&
                      `Note: Changes to the appointment must be coordinated at nurse@thegbc.com / (02) 6666-6666.`}
                  </DialogContentText>
                </Grid>
              </Grid>
            )}
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Stack
          direction={`row`}
          justifyContent={`space-between`}
          width={"100%"}
        >
          <Button
            onClick={handleCancel}
            variant="outlined"
            color="error"
            disabled={!form?.dateTime?.isAfter(dayjs(), "day")}
          >
            Cancel
          </Button>
          <Stack direction={`row`} spacing={1}>
            <Button onClick={onClose}>Close</Button>
            <Button
              variant="contained"
              onClick={handleSave}
              disabled={isFormDisabled()}
            >
              Save
            </Button>
          </Stack>
        </Stack>
      </DialogActions>
    </Dialog>
  );
}

function AppointmentDateTimePicker({
  value,
  onChange,
  doctor,
  availableSlots,
}) {
  function isDateDisabled(date) {
    const scheduledDays = doctor?.schedules?.map((schedule) => schedule.day);
    const today = dayjs(); // Get the current date

    // Disable all days before the current date
    if (date.isBefore(today, "day")) {
      return true;
    }

    // Disable the days that match the scheduled days in the profile
    return !(
      scheduledDays && scheduledDays.includes(date.format("dddd").toUpperCase())
    );
  }

  function isTimeDisabled(time) {
    const formattedTime = dayjs(time).format(DEFAULT_TIME_FORMAT);

    return (
      formattedTime !== value.format(DEFAULT_TIME_FORMAT) &&
      !availableSlots.some((slot) => {
        const startTime = slot.startTime;
        const endTime = slot.endTime;
        return formattedTime >= startTime && formattedTime < endTime;
      })
    );
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <StaticDateTimePicker
        value={value}
        orientation="landscape"
        minutesStep={15}
        slotProps={{
          actionBar: { actions: [] },
        }}
        shouldDisableDate={isDateDisabled}
        shouldDisableTime={isTimeDisabled}
        onChange={onChange}
      />
    </LocalizationProvider>
  );
}
