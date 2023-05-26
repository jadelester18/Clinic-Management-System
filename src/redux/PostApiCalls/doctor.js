import { http } from "../http";

export function searchDoctors(doctors) {
  return http.post("/doctors/search", doctors);
}

export function getDoctorStatusList(date) {
  return http.get(`/doctors/status/${date}`);
}
