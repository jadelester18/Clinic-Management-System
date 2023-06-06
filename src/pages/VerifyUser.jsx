import React, { useContext } from "react";
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { SnackBarContext } from "../context/SnackBarContext";

const VerifyUser = () => {
  let location = useLocation();
  let token = location.pathname.split("/")[2];
  const navigate = useNavigate();
  const { onShowSuccess, onShowFail } = useContext(SnackBarContext);

  fetch(`http://localhost:8080/api/v1/auth/verify-email/${token}`, {
    method: "PUT",
  })
    .then((data) => {
      onShowSuccess("Email verified!");
      navigate("/");
    })
    .catch((error) => {
      console.error(error);
      //   alert("Failed to update Status.");
      onShowFail(error.response.data.status);
    });

  return <div>Welcome</div>;
};

export default VerifyUser;
