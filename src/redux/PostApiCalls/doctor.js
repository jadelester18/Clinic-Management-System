import { http } from "../http";

export function searchDoctors(doctors) {
  return http.post("/doctors/search", doctors);
}

export function getAvailableSlots(doctorId, date) {
  return http.get(`/doctors/${doctorId}/schedules/available-slots/${date}`);
}
