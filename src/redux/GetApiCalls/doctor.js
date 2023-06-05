import { http } from "../http";

export function searchDoctor(searchDoctorsDto) {
  return http.post(`/doctors/search`, searchDoctorsDto);
}
