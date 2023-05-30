import { http } from "../http";

export function getLabProd() {
  return http.get("/lab-procedures");
}
