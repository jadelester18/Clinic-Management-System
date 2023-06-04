import { http } from "../http";

export function searchDoctors(doctors) {
  return http.post("/doctors/search", doctors);
}

export function getAvailableSlots(doctorId, date) {
  return http.get(`/doctors/${doctorId}/schedules/available-slots/${date}`);
}

export function getDoctorStatusList(date) {
  return http.get(`/doctors/status/${date}`);
}

export function updateDoctor(doctorId, updateDoctorDto) {
  return http.put(`/doctors/${doctorId}`, updateDoctorDto);
}
