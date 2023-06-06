import { http } from "../http";

export function notification(notificationsDto) {
  return http.post(`/notifications`, notificationsDto);
}

export function updateNotification(id, updateNotificationsDto) {
  return http.put(`/notifications/${id}`, updateNotificationsDto);
}
