import { http } from "../http";

export function searchNurse(searchNursesDto) {
  return http.post(`/nurses/search`, searchNursesDto);
}
