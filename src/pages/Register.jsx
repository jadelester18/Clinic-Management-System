import {
  Autocomplete,
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
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import InfoIcon from "@mui/icons-material/Info";
import { signup } from "../redux/ApiCall";
import { useDispatch } from "react-redux";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { countries, provinces, cities } from "./addressDb/adress.js";
import axios from "axios";
import { useLocation } from "react-router-dom";

function Register({ handleCloseRegister }) {
  //For Country Code
  const [code, setCode] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [idTypeIdList, setIdTypeIdList] = React.useState([]);

  //For Register Components
  const [showPassword, setShowPassword] = React.useState(false);
  const [honorific, setHonorific] = useState("");
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [suffixName, setSuffixName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [gender, setGender] = React.useState("");
  const [contactNo, setContactNo] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [country, setCountry] = React.useState([]);
  const [province, setProvince] = React.useState([]);
  const [city, setCity] = React.useState([]);
  const [barangay, setBarangay] = React.useState([]);
  const [street, setStreet] = React.useState("");
  const [postalCode, setPostalCode] = React.useState("");

  const [idTypeId, setIdTypeId] = React.useState("");
  const [idNumber, setIdNumber] = React.useState("");
  const [idFileUrl, setIdFileUrl] = React.useState("");

  // Update contactNo whenever code or phone change
  React.useEffect(() => {
    setContactNo(code + phone);
  }, [code, phone]);

  //For Form Register
  const dispatch = useDispatch();
  const handleClick = (e) => {
    // e.preventDefault();
    signup(dispatch, {
      honorific,
      firstName,
      middleName,
      lastName,
      suffixName,
      birthDate,
      gender,
      contactNo,
      email,
      password,
      country,
      province,
      city,
      barangay,
      street,
      postalCode,
      idTypeId,
      idNumber,
      idFileUrl,
    });
  };

  //Fetching the IDs Type
  useEffect(() => {
    const fetchIdTypeIdListData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/id-type`
        );
        setIdTypeIdList(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchIdTypeIdListData();
  }, []);

  //For Showing Password
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  dayjs.extend(customParseFormat);

  const currentUrl = window.location.href;

  const [selectedProvince, setSelectedProvince] = useState("");
  const [filteredCities, setFilteredCities] = useState([]);

  const handleProvinceChange = (event) => {
    setSelectedProvince(event);

    const filteredCities = cities.filter(
      (city) => city.province_code === event
    );
    setFilteredCities(filteredCities);
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
                  onChange={(e) => setHonorific(e.target.value)}
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
                name="fname"
                fullWidth
                label="First Name"
                autoComplete="First Name"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                margin="normal"
                name="mname"
                fullWidth
                label="Middle Name"
                autoComplete="Middle Name"
                onChange={(e) => setMiddleName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                margin="normal"
                name="lname"
                fullWidth
                label="Last Name"
                autoComplete="Last Name"
                onChange={(e) => setLastName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                margin="normal"
                name="suffix"
                label="Suffix"
                autoComplete="Suffix"
                onChange={(e) => setSuffixName(e.target.value)}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="BirthDate"
                  value={birthDate}
                  onChange={(newValue) =>
                    setBirthDate(dayjs(newValue).format("YYYY-MM-DD"))
                  }
                  renderInput={(props) => (
                    <TextField
                      {...props}
                      value={
                        birthDate ? dayjs(birthDate).format("YYYY-MM-DD") : ""
                      }
                    />
                  )}
                />
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
                  value={gender}
                  label="Gender"
                  autoWidth
                  onChange={(e) => setGender(e.target.value)}
                >
                  <MenuItem value={"MALE"}>Male</MenuItem>
                  <MenuItem value={"FEMALE"}>Female</MenuItem>
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
            <Grid item xs={12} sm={6} md={4}>
              <Stack direction="row">
                <Autocomplete
                  id="country-select-demo"
                  // sx={{ width: 200 }}
                  sx={{ mr: 1 }}
                  options={countries
                    .sort((a, b) => a.label.localeCompare(b.label))}
                  autoHighlight
                  onChange={(event, value) => setCode("+" + value.phone)}
                  getOptionLabel={(option) => " +" + option.phone}
                  renderOption={(props, option) => (
                    <Box
                      component="li"
                      sx={{
                        "& > img": { mr: 2, flexShrink: 0 },
                        display: "flex",
                        flexDirection: "column",
                        textAlign: "center",
                      }}
                      {...props}
                    >
                      <img
                        loading="lazy"
                        width="20"
                        src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                        srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                        alt=""
                      />
                      {/* {option.label} */}({option.code}) +{option.phone}
                    </Box>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Code"
                      inputProps={{
                        ...params.inputProps,
                        autoComplete: "new-password", // disable autocomplete and autofill
                      }}
                    />
                  )}
                />
                <TextField
                  label="Phone Number"
                  fullWidth
                  inputProps={{
                    maxLength: 10,
                  }}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </Stack>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                margin="normal"
                name="email"
                fullWidth
                label="Email"
                autoComplete="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                type={showPassword ? "text" : "password"}
                name="password"
                label="Password"
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
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                label="Confirm Password"
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
              <Autocomplete
                id="country-select-demo"
                autoWidth
                options={countries.sort((a, b) =>
                  a.label.localeCompare(b.label)
                )}
                autoHighlight
                onChange={(event, value) => setCountry(value.label)}
                getOptionLabel={(option) => option.label}
                renderOption={(props, option) => (
                  <Box
                    component="li"
                    sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                    {...props}
                  >
                    <img
                      loading="lazy"
                      width="20"
                      src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                      srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                      alt=""
                    />
                    {option.label}
                  </Box>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Choose a country"
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: "new-password",
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Autocomplete
                id="country-select-demo"
                autoWidth
                options={provinces}
                autoHighlight
                onChange={(event, value) => {
                  setProvince(value.name);
                  handleProvinceChange(value.id);
                }}
                getOptionLabel={(option) => option.name}
                renderOption={(props, option) => (
                  <Box
                    component="li"
                    sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                    {...props}
                  >
                    {option.name}
                  </Box>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Choose a province"
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: "new-password",
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Autocomplete
                id="country-select-demo"
                autoWidth
                options={filteredCities}
                autoHighlight
                onChange={(event, value) => setCity(value.name)}
                getOptionLabel={(option) => option.name}
                renderOption={(props, option) => (
                  <Box
                    component="li"
                    sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                    {...props}
                  >
                    {option.name}
                  </Box>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Choose a city"
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: "new-password",
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                margin="normal"
                name="Barangay"
                fullWidth
                label="Barangay"
                autoComplete="barangay"
                onChange={(e) => setBarangay(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                margin="normal"
                name="Street"
                fullWidth
                label="Zone/Street"
                autoComplete="Street"
                onChange={(e) => setStreet(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                margin="normal"
                name="postalCode"
                fullWidth
                label="postal Code"
                autoComplete="postalCode"
                onChange={(e) => setPostalCode(e.target.value)}
              />
            </Grid>
          </Grid>
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
              <Autocomplete
                id="id-type-select"
                options={idTypeIdList} // Pass idTypeId as options
                autoHighlight
                onChange={(event, value) => setIdTypeId(value?.id)} // Update the state with the selected value
                getOptionLabel={(option) => option?.type}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="ID Type"
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: "new-password",
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                margin="normal"
                name="idNumber"
                fullWidth
                label="ID Number"
                autoComplete="idNumber"
                onChange={(e) => setIdNumber(e.target.value)}
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
                <input
                  hidden
                  accept="image/*"
                  type="file"
                  onChange={(e) => setIdFileUrl(e.target.value)}
                />
              </Button>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={() => {
              currentUrl === "http://localhost:3000/" && handleCloseRegister();
              handleClick();
            }}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default Register;
