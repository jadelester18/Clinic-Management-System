import { http } from "../http";

export function searchQueues(searchQueueDto) {
  return http.post(`/queues/search`, searchQueueDto);
}

export function updateQueueStatus(queueId, updateStatusDto) {
  return http.put(`/queues/${queueId}`, updateStatusDto);
}

export function createWalkInQueue(createWalkInQueueDto) {
  return http.post(`/queues`, createWalkInQueueDto);
}

export function getPatientQueueForToday() {
  return http.get(`/queues/patient/me/date/today`);
}
