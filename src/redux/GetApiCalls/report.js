import { http } from "../http";

export function getReportById(reportId) {
  return http.get(`/reports/${reportId}`);
}

export function updateReport(reportId, updateReportDto) {
  return http.put(`/reports/${reportId}`, updateReportDto);
}
