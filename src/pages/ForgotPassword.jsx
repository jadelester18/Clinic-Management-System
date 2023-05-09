import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

function ForgotPassword() {
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
          Forgot Password
        </Typography>
        <Box
          component="form"
          // onSubmit={handleClick}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            // error={!!errors.email}
            // helperText={errors.email}
            name="email"
            // onChange={handleChange}
            // value={form.email}
            fullWidth
            // id="email"
            label="Email"
            autoComplete="email"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            // onClick={handleSubmit}
            // disabled={isFormInvalid()}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default ForgotPassword;
