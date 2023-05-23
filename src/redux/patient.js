import { http } from "./http";

export function searchDoctors(doctors) {
  return http.post("/doctors/search", doctors);
}
