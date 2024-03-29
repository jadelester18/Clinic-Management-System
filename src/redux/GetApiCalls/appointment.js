import { http } from "../http";

export function searchAppointments(searchAppointmentDto) {
  return http.post(`/appointments/search`, searchAppointmentDto);
}

export function updateAppointment(appointmentId, updateAppointmentDto) {
  return http.put(`/appointments/${appointmentId}`, updateAppointmentDto);
}

export function changeAppointmentStatus(appointmentId, dto) {
  return http.put(`/appointments/${appointmentId}/status`, dto);
}

export function changeArrivalStatus(appointmentId, arrivalStatusDto) {
  return http.put(
    `/appointments/${appointmentId}/has-arrived`,
    arrivalStatusDto
  );
}

export function getMonthDaysWithNewAppointments(dayInMonth) {
  return http.get(`/appointments/by-month/${dayInMonth}/days`);
}
