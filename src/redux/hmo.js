import { http } from "./http";

export function getHmos() {
  return http.get("/hmos");
}
