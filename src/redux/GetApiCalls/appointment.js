import { http } from "../http";

export function searchAppointments(searchAppointmentDto) {
  return http.post(`/appointments/search`, searchAppointmentDto);
}

export function updateAppointment(appointmentId, updateAppointmentDto) {
  return http.put(`/appointments/${appointmentId}`, updateAppointmentDto);
}
