import { http } from "../http";

export function getSpecializations() {
  return http.get("/specializations");
}
