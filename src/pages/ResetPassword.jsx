import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import {
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Joi from "joi";
import { joiPasswordExtendCore } from "joi-password";
import jwtDecode from "jwt-decode";
import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LoadingScreen from "../components/LoadingScreen";
import { SnackBarContext } from "../context/SnackBarContext";
import * as authSvc from "../redux/GetApiCalls/auth";
const joiPassword = Joi.extend(joiPasswordExtendCore);

export const ResetPassword = () => {
  const { token } = useParams();
  const tokenObj = jwtDecode(token);
  const [pwForm, setPwForm] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [isNewVisible, setIsNewVisible] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);

  const [errors, setErrors] = useState({});

  const [isLoading, setIsLoading] = useState(false);
  const { onShowSuccess, onShowFail } = useContext(SnackBarContext);

  const navigate = useNavigate();

  const handlePwChange = (event) => {
    const { name, value } = event.target;

    const { error } = newPasswordSchema
      .extract(name)
      .label(name)
      .validate(value);

    if (error) {
      if (name === "confirmPassword") {
        setErrors({
          ...errors,
          [name]: "Password does not match.",
        });
      } else {
        setErrors({
          ...errors,
          [name]: error.details[0].message,
        });
      }
    } else {
      setErrors({ ...errors, [name]: null });
    }

    setPwForm({ ...pwForm, [name]: value });
  };

  function isPwFormInvalid() {
    const error = newPasswordSchema.validate(pwForm).error;
    console.log(error);
    return !!error;
  }

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const { data } = await authSvc.resetPassword({
        email: tokenObj.sub,
        newPassword: pwForm.newPassword,
      });
      navigate("/");
      onShowSuccess("Password reset successfully!");
    } catch (error) {
      console.error(error);
      onShowFail(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  const newPasswordSchema = Joi.object({
    newPassword: joiPassword
      .string()
      .minOfSpecialCharacters(1)
      .minOfLowercase(1)
      .minOfUppercase(1)
      .minOfNumeric(1)
      .noWhiteSpaces()
      .min(8)
      .required()
      .messages({
        "password.minOfSpecialCharacters":
          "Password requires lowercase, uppercase, number, and special character.",
        "password.minOfLowercase":
          "Password requires lowercase, uppercase, number, and special character.",
        "password.minOfUppercase":
          "Password requires lowercase, uppercase, number, and special character.",
        "password.minOfNumeric":
          "Password requires lowercase, uppercase, number, and special character.",
        "password.noWhiteSpaces": "White spaces are not allowed.",
        "string.min": "Password requires a minimum length of 8.",
        "string.empty": "Please input your new password.",
      }),
    confirmPassword: Joi.string().equal(pwForm.newPassword).required(),
  });
  return (
    <>
      <Container component="main" maxWidth="xs">
        {/* <CssBaseline /> */}
        <Box>
          <Stack justifyContent={`center`} alignItems={`center`}>
            <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Reset Password
            </Typography>
          </Stack>
          <Box sx={{ mt: 1 }}>
            <Stack width={"100%"} spacing={2}>
              <TextField
                name="newPassword"
                value={pwForm.newPassword}
                onChange={handlePwChange}
                variant="outlined"
                label="Enter new password"
                type={isNewVisible ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setIsNewVisible(!isNewVisible)}
                        edge="end"
                        size="small"
                      >
                        {isNewVisible ? (
                          <VisibilityIcon />
                        ) : (
                          <VisibilityOffIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                error={!!errors.newPassword}
                helperText={errors.newPassword || " "}
                fullWidth
              />
              <TextField
                name="confirmPassword"
                value={pwForm.confirmPassword}
                onChange={handlePwChange}
                variant="outlined"
                label="Confirm new password"
                fullWidth
                type={isConfirmVisible ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setIsConfirmVisible(!isConfirmVisible)}
                        edge="end"
                        size="small"
                      >
                        {isConfirmVisible ? (
                          <VisibilityIcon />
                        ) : (
                          <VisibilityOffIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword || " "}
              />
              <Button
                fullWidth
                variant="contained"
                disabled={isPwFormInvalid()}
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </Stack>
          </Box>
        </Box>
      </Container>
      {isLoading && <LoadingScreen open={isLoading} />}
    </>
  );
};
