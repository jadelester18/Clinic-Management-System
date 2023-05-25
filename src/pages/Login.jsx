import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { loginStart, loginFailure, loginSuccess } from "../redux/UserReducer";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Joi from "joi";

function Login({ handleCloseLogin }) {
  const [eroor, setErrorMessage] = useState("");

  const login = async (dispatch, user) => {
    dispatch(loginStart());
    try {
      const res = await axios.post(
        `http://localhost:8080/api/v1/auth/authenticate`,
        user
      );
      dispatch(loginSuccess(res.data));

      // put accessToken in localStorage
      localStorage.setItem("accessToken", res.data.token);
    } catch (error) {
      // setErrorMessage(error.response.data.message);
      dispatch(loginFailure(eroor));
    }
  };

  // JOI
  const Joi = require("joi");
  // Define validation schema using Joi
  const schema = Joi.object({
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .required(),
    password: Joi.string().min(6).required(),
  });

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    errors: {},
  });

  const handleChange = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const userDetails = user.user;
  var emailPWChecker = "";

  const handleSubmit = (event) => {
    // event.preventDefault();

    if (userDetails?.noUser) {
      emailPWChecker = userDetails?.noUser;
      alert(emailPWChecker);
    }

    login(dispatch, formData);

    // Validate form data using Joi schema
    const { error } = schema.validate(formData, { abortEarly: false });

    if (error) {
      console.log("Validation Error:", error.details);
      // Update errors state with validation error messages
      const errors = {};
      error.details.forEach((err) => {
        errors[err.path[0]] = err.message;
      });
      setFormData((prevState) => ({ ...prevState, errors }));
      return;
    }

    // Clear errors state if validation passes
    setFormData((prevState) => ({ ...prevState, errors: {} }));

    // Submit form data if validation passes
    console.log("Form Data:", formData);
  };

  localStorage.setItem("role", user?.role);

  //For Password show to text format
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Log in
        </Typography>
        <Box
          component="formData"
          // onSubmit={handleClick}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            error={Boolean(formData.errors.email)}
            helperText={formData.errors.email}
            name="email"
            onChange={handleChange}
            value={formData.email}
            fullWidth
            // id="email"
            label="Email"
            autoComplete="email"
          />
          <TextField
            fullWidth
            type={showPassword ? "text" : "password"}
            error={Boolean(formData.errors.password)}
            helperText={formData.errors.password}
            name="password"
            label="Password"
            onChange={handleChange}
            value={formData.password}
            autoComplete="new-password"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={() => {
              handleSubmit();
              handleCloseLogin();
            }}
            // disabled={isFormInvalid()}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default Login;
