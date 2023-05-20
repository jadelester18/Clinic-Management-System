import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import React from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Link } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import InfoIcon from "@mui/icons-material/Info";

function Register({ handleCloseRegister }) {
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // For Select/Dropdown Honorific
  const [honorific, setHonorific] = React.useState("");

  const handleChangeHonorific = (event) => {
    setHonorific(event.target.value);
  };

  // For Select/Dropdown Sex
  const [sex, setSex] = React.useState("");

  const handleChangeSex = (event) => {
    setSex(event.target.value);
  };

  // For Select/Dropdown Country
  const [country, setCountry] = React.useState("");

  const handleChangeCountry = (event) => {
    setCountry(event.target.value);
  };

  //For Toggle New/Old Patient
  const [newOldPatient, setNewOldPatient] = React.useState("web");

  const handleChangeNewOldPatient = (event, newAlignment) => {
    setNewOldPatient(newAlignment);
  };

  //For Toggle New/Old Patient
  const [idType, setIdType] = React.useState("");

  const handleChangeSetIdType = (event) => {
    setIdType(event.target.value);
  };

  return (
    <Container component="main">
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Signup
        </Typography>
        <Box
          sx={{
            "& .MuiTextField-root": {
              m: 1,
              width: { xs: "100%" },
            },
          }}
        >
          <Typography variant="body1" marginTop={1}>
            <InfoIcon fontSize="sx" />
            Personal Information
          </Typography>
          <Grid
            container
            direction="row"
            justifyContent="space-evenly"
            alignItems="center"
            spacing={2}
            mt={2}
          >
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-autowidth-label">
                  Honorific
                </InputLabel>
                <Select
                  labelId="demo-simple-select-autowidth-label"
                  id="demo-simple-select-autowidth"
                  value={honorific}
                  label="Honorific"
                  onChange={handleChangeHonorific}
                  autoWidth
                >
                  <MenuItem value={"Mr."}>Mr.</MenuItem>
                  <MenuItem value={"Mrs."}>Mrs.</MenuItem>
                  <MenuItem value={"Ms."}>Ms.</MenuItem>
                  <MenuItem value={"Mx."}>Mx.</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                margin="normal"
                // error={!!errors.email}
                // helperText={errors.email}
                name="fname"
                // onChange={handleChange}
                // value={form.email}
                fullWidth
                // id="email"
                label="First Name"
                autoComplete="First Name"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                margin="normal"
                // error={!!errors.email}
                // helperText={errors.email}
                name="mname"
                // onChange={handleChange}
                // value={form.email}
                fullWidth
                // id="email"
                label="Middle Name"
                autoComplete="Middle Name"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                margin="normal"
                // error={!!errors.email}
                // helperText={errors.email}
                name="lname"
                // onChange={handleChange}
                // value={form.email}
                fullWidth
                // id="email"
                label="Last Name"
                autoComplete="Last Name"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                margin="normal"
                // error={!!errors.email}
                // helperText={errors.email}
                name="suffix"
                // onChange={handleChange}
                // value={form.email}
                // fullWidth
                // id="email"
                label="Suffix"
                autoComplete="Suffix"
              />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker label="Birthdate" name="birthdate" />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <FormControl sx={{ minWidth: { xs: "100%", md: 120 }, m: 1 }}>
                <InputLabel id="demo-simple-select-autowidth-label">
                  Gender
                </InputLabel>
                <Select
                  labelId="demo-simple-select-autowidth-label"
                  id="demo-simple-select-autowidth"
                  value={sex}
                  label="Sex"
                  onChange={handleChangeSex}
                  autoWidth
                >
                  <MenuItem value={"Male"}>Male</MenuItem>
                  <MenuItem value={"Female"}>Female</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Typography variant="body1" marginTop={1}>
            <InfoIcon fontSize="sx" />
            Account Information
          </Typography>
          <Grid
            container
            direction="row"
            justifyContent="space-evenly"
            alignItems="center"
            spacing={2}
            mt={2}
          >
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                margin="normal"
                name="contact"
                label="Contact Number"
                autoComplete="contact"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">+63</InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
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
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                type={showPassword ? "text" : "password"}
                // error={!!errors.password}
                // helperText={errors.password}
                name="password"
                label="Password"
                // onChange={handleChange}
                // value={form.password}
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
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                type={showPassword ? "text" : "password"}
                // error={!!errors.password}
                // helperText={errors.password}
                name="confirmPassword"
                label="Confirm Password"
                // onChange={handleChange}
                // value={form.password}
                autoComplete="confirmPassword"
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
            </Grid>
          </Grid>
          <Typography variant="body1" marginTop={1}>
            <InfoIcon fontSize="sx" />
            Present Address
          </Typography>
          <Grid
            container
            direction="row"
            justifyContent="space-evenly"
            alignItems="center"
            spacing={2}
            mt={2}
          >
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-autowidth-label">
                  Country
                </InputLabel>
                <Select
                  labelId="demo-simple-select-autowidth-label"
                  id="demo-simple-select-autowidth"
                  value={country}
                  label="Country"
                  onChange={handleChangeCountry}
                  autoWidth
                >
                  <MenuItem value={"Philippines"}>Philippines</MenuItem>
                  <MenuItem value={"China"}>China</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-autowidth-label">
                  Province
                </InputLabel>
                <Select
                  labelId="demo-simple-select-autowidth-label"
                  id="demo-simple-select-autowidth"
                  value={country}
                  label="Country"
                  onChange={handleChangeCountry}
                  autoWidth
                >
                  <MenuItem value={"Philippines"}>Camarines Sur</MenuItem>
                  <MenuItem value={"Philippines"}>Camarines Norte</MenuItem>
                  <MenuItem value={"China"}>National Capital Region</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-autowidth-label">
                  Municipality/City
                </InputLabel>
                <Select
                  labelId="demo-simple-select-autowidth-label"
                  id="demo-simple-select-autowidth"
                  value={country}
                  label="Country"
                  onChange={handleChangeCountry}
                  autoWidth
                >
                  <MenuItem value={"Philippines"}>Iriga City</MenuItem>
                  <MenuItem value={"China"}>Taguig</MenuItem>
                  <MenuItem value={"China"}>Makati</MenuItem>
                  <MenuItem value={"China"}>Pasay</MenuItem>
                  <MenuItem value={"China"}>Pasig</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-autowidth-label">
                  Barangay
                </InputLabel>
                <Select
                  labelId="demo-simple-select-autowidth-label"
                  id="demo-simple-select-autowidth"
                  value={country}
                  label="Country"
                  onChange={handleChangeCountry}
                  autoWidth
                >
                  <MenuItem value={"Philippines"}>Salvacion</MenuItem>
                  <MenuItem value={"China"}>Snta. Cruz</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                margin="normal"
                // error={!!errors.email}
                // helperText={errors.email}
                name="zonestreet"
                // onChange={handleChange}
                // value={form.email}
                fullWidth
                // id="email"
                label="Zone/Street"
                autoComplete="zonestreet"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                margin="normal"
                // error={!!errors.email}
                // helperText={errors.email}
                name="houseno"
                // onChange={handleChange}
                // value={form.email}
                fullWidth
                // id="email"
                label="House Number"
                autoComplete="House Number"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                margin="normal"
                // error={!!errors.email}
                // helperText={errors.email}
                name="postal"
                // onChange={handleChange}
                // value={form.email}
                fullWidth
                // id="email"
                label="Postal Code"
                autoComplete="Postal Code"
              />
            </Grid>
          </Grid>
          <Typography variant="body1" marginTop={1}>
            <InfoIcon fontSize="sx" />
            Are you a new patient or an existing patient?
          </Typography>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            justifyContent="space-evenly"
            alignItems="center"
          >
            <ToggleButtonGroup
              color="primary"
              value={newOldPatient}
              exclusive
              onChange={handleChangeNewOldPatient}
              aria-label="Platform"
              fullWidth
            >
              <ToggleButton value="web">New Patient</ToggleButton>
              <ToggleButton value="android">Existing Patient</ToggleButton>
            </ToggleButtonGroup>
          </Stack>
          <Typography variant="body1" marginTop={1}>
            <InfoIcon fontSize="sx" />
            ID Information
            <Typography fontSize={".8rem"}>
              * Kindly submit an ID with your name and date of birth. Please
              ensure that account details and ID matches the information
              submitted.
            </Typography>
          </Typography>
          <Grid
            container
            direction="row"
            justifyContent="space-evenly"
            alignItems="center"
            spacing={2}
            mt={2}
          >
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-autowidth-label">
                  ID Type
                </InputLabel>
                <Select
                  labelId="demo-simple-select-autowidth-label"
                  id="demo-simple-select-autowidth"
                  value={idType}
                  label="ID Type"
                  onChange={handleChangeSetIdType}
                  autoWidth
                >
                  <MenuItem value={"Drivers"}>Driver's License</MenuItem>
                  <MenuItem value={"Postal"}>Postal ID</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                margin="normal"
                // error={!!errors.email}
                // helperText={errors.email}
                name="idNumber"
                // onChange={handleChange}
                // value={form.email}
                fullWidth
                // id="email"
                label="ID Number"
                autoComplete="idNumber"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Button
                variant="outlined"
                component="label"
                size="large"
                fullWidth
              >
                Upload ID
                <input hidden accept="image/*" multiple type="file" />
              </Button>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleCloseRegister}
            // disabled={isFormInvalid()}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default Register;
