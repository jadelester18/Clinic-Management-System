import { http } from "../http";

export function getSpecialization() {
  return http.get("/specializations");
}
