import { http } from "../http";

export function getLabProcedures() {
  return http.get("/lab-procedures");
}
