import React, { useContext, useEffect } from "react";
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { SnackBarContext } from "../context/SnackBarContext";
import { useDispatch } from "react-redux";
import { loginStart, loginSuccess } from "../redux/UserReducer";

const VerifyUser = () => {
  const { token } = useParams();
  console.log("token ", token);
  const navigate = useNavigate();
  const { onShowSuccess, onShowFail } = useContext(SnackBarContext);

  const verifyEmail = () => {
    // dispatch(loginStart());
    fetch(`http://localhost:8080/api/v1/auth/verify-email/${token}`, {
      method: "PUT",
    })
      .then((res) => {
        onShowSuccess("Email verified!");
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
        onShowFail(error.response.data.status);
      });
  };

  useEffect(() => {
    if (token) {
      verifyEmail();
    }
  }, [token]);

  return <div>Welcome</div>;
};

export default VerifyUser;
