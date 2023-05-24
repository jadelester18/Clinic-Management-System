import { http } from "../http";

export function createAppointment(doctors) {
  return http.post("/appointments", doctors);
}
