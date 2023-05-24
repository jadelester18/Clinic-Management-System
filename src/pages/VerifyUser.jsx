import React from "react";
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";

const VerifyUser = () => {
  let location = useLocation();
  let token = location.pathname.split("/")[2];
  const navigate = useNavigate();

  fetch(`http://localhost:8080/api/v1/auth/verify-email/${token}`, {
    method: "PUT",
  })
    .then((data) => {
      alert("Status updated successfully.");
      navigate("/");
    })
    .catch((error) => {
      console.error(error);
      //   alert("Failed to update Status.");
    });

  return <div>Welcome</div>;
};

export default VerifyUser;
