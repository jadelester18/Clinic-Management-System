import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useState } from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { SnackBarContext } from "../context/SnackBarContext";
import * as authSvc from "../redux/GetApiCalls/auth";
import LoadingScreen from "../components/LoadingScreen";

function ForgotPassword({ handleCloseForgotPassword }) {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { onShowSuccess, onShowFail } = useContext(SnackBarContext);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      if (email) {
        const { data } = await authSvc.sendForgotPasswordLink(email);
      }
      onShowSuccess("Reset password request sent! Please check your email.");
      handleCloseForgotPassword();
    } catch (error) {
      console.error(error);
      onShowFail(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
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
            Forgot Password
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              name="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              fullWidth
              label="Email"
              autoComplete="email"
            />
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Container>
      {isLoading && <LoadingScreen open={isLoading} />}
    </>
  );
}

export default ForgotPassword;
