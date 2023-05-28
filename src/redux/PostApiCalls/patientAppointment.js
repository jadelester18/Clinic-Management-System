import { http } from "../http";

export function createAppointment(doctors) {
  return http.post("/appointments", doctors);
}

export function updateAppointment(appointmentId, updateAppointmentDto) {
  return http.put(`/appointments/${appointmentId}`, updateAppointmentDto);
}
