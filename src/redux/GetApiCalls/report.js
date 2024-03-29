import { http } from "../http";

export function getReportById(reportId) {
  return http.get(`/reports/${reportId}`);
}

export function updateReport(reportId, updateReportDto) {
  return http.put(`/reports/${reportId}`, updateReportDto);
}

export function searchReports(searchReportsDto) {
  return http.post(`/reports/search`, searchReportsDto);
}

export function updatePrescriptionList(reportDetailsId, prescriptionDtos) {
  return http.put(
    `/report-details/${reportDetailsId}/prescriptions`,
    prescriptionDtos
  );
}

export function createMedCert(reportId, dto) {
  return http.post(`/reports/${reportId}/medical-certificate`, dto);
}

export function updateMedCert(medCertId, dto) {
  return http.put(`/medical-certificates/${medCertId}`, dto);
}
