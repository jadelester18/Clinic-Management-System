import { http } from "../http";

export function changePassword(request) {
  return http.post(`/auth/change-password`, request);
}

export function resetPassword(request) {
  return http.post(`/auth/reset-password`, request);
}

export function sendForgotPasswordLink(email) {
  return http.post(`/auth/forgot-password`, { email });
}
