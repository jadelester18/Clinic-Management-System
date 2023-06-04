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
import React, { useEffect, useState } from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Link } from "react-router-dom";
import { PhotoCamera, Visibility, VisibilityOff } from "@mui/icons-material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import InfoIcon from "@mui/icons-material/Info";
import CameraEnhanceIcon from "@mui/icons-material/CameraEnhance";
import dayjs from "dayjs";
import SelectCountry from "../general/SelectCountry";
import { countries } from "../../pages/addressDb/adress";
import SelectHonorific from "../general/SelectHonorific";

const EditProfile = ({ doctor, closeEditProfile, onSave }) => {
  const [form, setForm] = useState({
    honorific: "",
    country: null,
  });
  console.log("form in editprofile", form);
  console.log("doctor in editprofile", doctor);

  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // For Select/Dropdown Honorific
  const [honorific, setHonorific] = React.useState("");

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

  //When hovered the avatar
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleSave = () => {
    onSave(form);
  };

  const handleSelect = (event, value, property) => {
    switch (property) {
      case "honorific":
        setForm({ ...form, honorific: value });
        break;
      case "country":
        setForm({ ...form, country: value });
        break;
      default:
        throw new Error("Invalid input");
    }
  };

  const handleTextInput = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  useEffect(() => {
    if (doctor) {
      setForm({
        ...doctor,
        ...doctor.address,
        birthDate: dayjs(doctor.birthDate),
        country: countries.find(
          (country) => country.label === doctor.address.country
        ),
      });
    }
  }, [doctor]);

  return (
    <Container component="main">
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div style={{ position: "relative" }}>
          <input
            accept="image/*"
            id="avatar-upload"
            type="file"
            style={{ display: "none" }}
          />
          <label htmlFor="avatar-upload">
            <Avatar
              src={
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWadeZ6aQggj21bHnsjbOyRJ9ZavJGiYnG-oI7fN_tzH4qNXZnOh3GQr4vkpYNqN95C7Y&usqp=CAU"
              }
              alt="Avatar"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              sx={{
                m: 1,
                bgcolor: "primary.main",
                width: { xs: 100, sm: 130, md: 140 },
                height: { xs: 100, sm: 130, md: 140 },
                border: "5px solid white",
                boxShadow: 10,
              }}
            />
            {isHovered && (
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  opacity: 0.8,
                }}
              >
                <CameraEnhanceIcon sx={{ height: "50px", width: "50px" }} />
              </div>
            )}
          </label>
        </div>
        <Typography component="h1" variant="h5">
          Edit Profile
        </Typography>
        <Box
          sx={{
            "& .MuiTextField-root": { m: 1, width: "20ch" },
          }}
        >
          <Typography variant="body1" marginTop={1}>
            <InfoIcon fontSize="sx" />
            Personal Information
          </Typography>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            justifyContent="space-evenly"
            alignItems="center"
          >
            <SelectHonorific
              value={form.honorific}
              onSelect={(event) =>
                handleSelect(event, event.target.value, "honorific")
              }
            />
            {/* <FormControl sx={{ minWidth: 120, m: 1 }}>
              <InputLabel id="demo-simple-select-autowidth-label">
                Honorific
              </InputLabel>
              <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                value={form.honorific}
                label="Honorific"
                onChange={(event) =>
                  handleSelect(event, event.target.value, "honorific")
                }
                autoWidth
              >
                <MenuItem value={"Mr."}>Mr.</MenuItem>
                <MenuItem value={"Mrs."}>Mrs.</MenuItem>
                <MenuItem value={"Ms."}>Ms.</MenuItem>
                <MenuItem value={"Mx."}>Mx.</MenuItem>
              </Select>
            </FormControl> */}
            <TextField
              margin="normal"
              // error={!!errors.email}
              // helperText={errors.email}
              value={form.firstName}
              name="firstName"
              onChange={handleTextInput}
              // value={form.email}
              fullWidth
              // id="email"
              label="First Name"
              autoComplete="First Name"
            />
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
          </Stack>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            justifyContent="space-evenly"
            alignItems="center"
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker label="Birthdate" name="birthdate" />
              </DemoContainer>
            </LocalizationProvider>
            <FormControl sx={{ minWidth: 120, m: 1 }}>
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
          </Stack>
          <Typography variant="body1" marginTop={1}>
            <InfoIcon fontSize="sx" />
            Account Information
          </Typography>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            justifyContent="space-evenly"
            alignItems="center"
          >
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
          </Stack>
          <Typography variant="body1" marginTop={1}>
            <InfoIcon fontSize="sx" />
            Present Address
          </Typography>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            justifyContent="space-evenly"
            alignItems="center"
          >
            <SelectCountry
              value={form.country}
              onChange={(event, value) => handleSelect(event, value, "country")}
            />
            {/* <FormControl sx={{ width: "25ch" }}>
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
            </FormControl> */}
            <FormControl sx={{ width: "25ch" }}>
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
            <FormControl sx={{ width: "25ch" }}>
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
            <FormControl sx={{ width: "25ch" }}>
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
          </Stack>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            justifyContent="space-evenly"
            alignItems="center"
          >
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
          </Stack>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            // onClick={handleSubmit}
            // disabled={isFormInvalid()}
            onClick={handleSave}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default EditProfile;
