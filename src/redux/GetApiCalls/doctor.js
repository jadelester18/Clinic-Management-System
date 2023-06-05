import { http } from "../http";

export function searchDoctor(searchDoctorsDto) {
  return http.post(`/doctors/search`, searchDoctorsDto);
}

export function getProfile() {
  return http.get(`/doctors/me`);
}

export function updateDoctorAvailability(isIn) {
  return http.put(`/doctors/me/is-in`, { isIn });
}
