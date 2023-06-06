import { http } from "../http";

export function searchPatients(searchPatientsDto) {
  return http.post(`/patients/search`, searchPatientsDto);
}

export function updatePatient(patientId, createPersonDto) {
  return http.put(`/patients/${patientId}`, createPersonDto);
}

export function createPatient(createPersonDto) {
  return http.post(`/patients`, createPersonDto);
}
