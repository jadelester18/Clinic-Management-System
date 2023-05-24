import { http } from "../http";

export function getDoctorProfile() {
  const path = window.location.pathname;
  const id = path.split("/")[2];
  return http.get(`/doctors/${id}`);
}

export function getProfileLeftBar() {
  const path = window.location.pathname;
  const id = path.split("/")[2];
  return http.get(`doctors/${id}`);
}

export function getDoctorAvailableTime(date) {
  const path = window.location.pathname;
  const id = path.split("/")[2];
  return http.get(`doctors/${id}/schedules/available-slots/${date}`);
}
