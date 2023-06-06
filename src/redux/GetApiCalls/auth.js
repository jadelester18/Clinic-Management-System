import { http } from "../http";

export function changePassword(request) {
  return http.post(`/auth/change-password`, request);
}
