import { http } from "../http";

export function changePatientStatus(icNo, dto) {
  return http.put(`/users/${icNo}/is-enabled`, dto);
}
