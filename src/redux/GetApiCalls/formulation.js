import { http } from "../http";

export function searchFormulations(searchDto) {
  return http.post(`/formulations/search`, searchDto);
}
