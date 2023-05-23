import axios from "axios";
import { useSelector } from "react-redux";

export const http = axios.create({
  baseURL: "http://localhost:8080/api/v1",
  // withCredentials: true,
  // headers: { "Access-Control-Allow-Origin": "*" },
});

http.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    console.error("An unexpected error occurred");
  }

  return Promise.reject(error);
});

http.interceptors.request.use((request) => {
  const userLoggedinDetails = useSelector((state) => state.user);
  let userObject = userLoggedinDetails?.user;
  let accesstoken = userObject?.token;
  // const accessToken = localStorage.getItem(accessToken);
  console.log(accesstoken);
  if (accesstoken) {
    request.headers = {
      Authorization: `Bearer ${accesstoken}`,
    };
  }
  return request;
});
