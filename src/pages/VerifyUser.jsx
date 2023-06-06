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
  const dispatch = useDispatch();
  let location = useLocation();
  let token = location.pathname.split("/")[2];
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
    verifyEmail();
  }, []);

  return <div>Welcome</div>;
};

export default VerifyUser;
