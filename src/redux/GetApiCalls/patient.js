import { http } from "../http";

export function searchPatients(searchPatientsDto) {
  return http.post(`/patients/search`, searchPatientsDto);
}
