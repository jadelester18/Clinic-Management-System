import { http } from "../http";

export function getReportById(reportId) {
  return http.get(`/reports/${reportId}`);
}
