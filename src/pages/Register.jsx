import {
  Autocomplete,
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
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
import Joi from "joi";
import app from "../firebase";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import CloseIcon from "@mui/icons-material/Close";
import VisibilityIcon from "@mui/icons-material/Visibility";

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
  const [country, setCountry] = React.useState("");
  const [province, setProvince] = React.useState("");
  console.log("province", province);
  const [city, setCity] = React.useState("");
  console.log("city", city);
  const [barangay, setBarangay] = React.useState([]);
  const [street, setStreet] = React.useState("");
  const [postalCode, setPostalCode] = React.useState("");

  const [idTypeId, setIdTypeId] = React.useState("");
  const [idNumber, setIdNumber] = React.useState("");
  const [idFileUrl, setIdFileUrl] = React.useState("");

  //For Viewing File Selected
  const [fileName, setFileName] = useState("");
  const [filePreview, setFilePreview] = useState(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setIdFileUrl(file);
    setFileName(file?.name);

    if (file.type === "application/pdf") {
      // setFilePreview(URL.createObjectURL(file));
      const reader = new FileReader();
      reader.onload = () => {
        setFilePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => {
        setFilePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setFilePreview(null);
    }
  };

  const handleViewClick = () => {
    setViewModalOpen(true);
  };

  const handleCloseModal = () => {
    setViewModalOpen(false);
  };

  const handleRemoveClick = () => {
    setIdFileUrl(null);
    setFileName("");
    setFilePreview(null);
  };

  const handleViewInNewTab = () => {
    window.open(URL.createObjectURL(idFileUrl), "_blank");
  };

  //For Handling the Joi Error message
  const [fieldErrors, setFieldErrors] = useState({});

  console.log(fieldErrors);

  // Update contactNo whenever code or phone change
  React.useEffect(() => {
    setContactNo(code + phone);
  }, [code, phone]);

  //For Form Register
  const dispatch = useDispatch();
  const handleClick = (e) => {
    // e.preventDefault();

    // Joi validation schema
    const schema = Joi.object({
      honorific: Joi.string().required(),
      firstName: Joi.string().required().min(2).max(50).messages({
        "string.empty": "First Name is required",
        "string.min": "First Name should have at least {#limit} characters",
        "string.max": "First Name should have at most {#limit} characters",
      }),
      middleName: Joi.string().min(2).max(50).allow("").messages({
        "string.min": "Middle Name should have at least {#limit} characters",
      }),
      lastName: Joi.string().required().min(2).max(50).messages({
        "string.empty": "Last Name is required",
        "string.min": "Last Name should have at least {#limit} characters",
        "string.max": "Last Name should have at most {#limit} characters",
      }),
      suffixName: Joi.string().allow("").max(50).messages({
        "string.max": "Suffix Name should have at most {#limit} characters",
      }),
      birthDate: Joi.string()
        .required()
        .custom((value, helpers) => {
          const isValid = dayjs(value, "YYYY-MM-DD", true).isValid();
          if (!isValid) {
            return helpers.message(
              "Invalid Birth Date format. Please use YYYY-MM-DD"
            );
          }
          return value;
        }),
      gender: Joi.string().required().valid("MALE", "FEMALE").messages({
        "any.only": "Gender must be MALE or FeMALE",
      }),
      contactNo: Joi.string()
        .required()
        .pattern(/^\+?[0-9]+$/, { name: "numbers" })
        // .length(10, { name: "Contact Number" })
        .messages({
          "string.pattern.base": "Contact Number should contain only numbers",
          "string.length": "Contact Number should be exactly {#limit} digits",
        }),
      email: Joi.string()
        .required()
        .email({ tlds: { allow: false } })
        .messages({
          "string.empty": "Email is required",
          "string.email": "Invalid email format",
        }),
      password: Joi.string()
        .required()
        .pattern(
          new RegExp(
            "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
          )
        )
        .messages({
          "string.empty": "Password is required",
          "string.pattern.base":
            "Password must contain at least 8 characters, one lowercase letter, one uppercase letter, one digit, and one special character",
        }),
      confirmPassword: Joi.string()
        .valid(Joi.ref("password"))
        .required()
        .messages({ "any.only": "Passwords do not match" }),
      country: Joi.string().required(),
      province: Joi.string().required(),
      city: Joi.string().required(),
      barangay: Joi.string().required(),
      street: Joi.string().required(),
      postalCode: Joi.string().required(),
      idTypeId: Joi.number().required(),
      idNumber: Joi.string().required(),
      idFileUrl: Joi.string().required(),
    });

    const data = {
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
      confirmPassword,
      country,
      province,
      city,
      barangay,
      street,
      postalCode,
      idTypeId,
      idNumber,
      idFileUrl,
    };

    const { error } = schema.validate(data, { abortEarly: false });

    if (error) {
      const errorMessages = {};
      error.details.forEach((err) => {
        const fieldName = err.path[0];
        const errorMessage = err.message;
        errorMessages[fieldName] = errorMessage;
      });
      setFieldErrors(errorMessages);
      return;
    }

    console.log(data);
    signup(dispatch, data);
    handleCloseRegister();
  };

  // Rest of the component code...

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

  const handleProvinceChange = (value) => {
    if (value) {
      setSelectedProvince(value.id);

      const filteredCities = cities.filter(
        (city) => city.province_code === value.id
      );
      setFilteredCities(filteredCities);
    } else {
      setFilteredCities([]);
      setCity("");
    }
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
              <FormControl fullWidth error={Boolean(fieldErrors.honorific)}>
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
                <FormHelperText>{fieldErrors.honorific || " "}</FormHelperText>
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
                helperText={fieldErrors.firstName || " "}
                error={Boolean(fieldErrors.firstName)}
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
                helperText={fieldErrors.middleName || " "}
                error={Boolean(fieldErrors.middleName)}
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
                helperText={fieldErrors.lastName || " "}
                error={Boolean(fieldErrors.lastName)}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                margin="normal"
                name="suffix"
                label="Suffix"
                autoComplete="Suffix"
                onChange={(e) => setSuffixName(e.target.value)}
                helperText={fieldErrors.suffixName || " "}
                error={Boolean(fieldErrors.suffixName)}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="BirthDate"
                  value={birthDate ? dayjs(birthDate) : null}
                  onChange={(newValue) =>
                    setBirthDate(newValue.format("YYYY-MM-DD"))
                  }
                  renderInput={(props) => (
                    <TextField
                      {...props}
                      value={
                        birthDate
                          ? dayjs(birthDate).format("YYYY-MM-DD")
                          : dayjs()
                      }
                    />
                  )}
                />
              </LocalizationProvider>
              <FormHelperText sx={{ color: "red" }}>
                {fieldErrors.birthDate || " "}
              </FormHelperText>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <FormControl
                sx={{ minWidth: { xs: "100%", md: 120 }, m: 1 }}
                error={Boolean(fieldErrors.gender)}
              >
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
                <FormHelperText>{fieldErrors.gender || " "}</FormHelperText>
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
                  options={countries.sort((a, b) =>
                    a.label.localeCompare(b.label)
                  )}
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
                      error={Boolean(fieldErrors.contactNo)}
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
                  error={Boolean(fieldErrors.contactNo)}
                />
              </Stack>
              <FormHelperText sx={{ color: "red" }}>
                {fieldErrors.contactNo || " "}
              </FormHelperText>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                margin="normal"
                name="email"
                fullWidth
                label="Email"
                autoComplete="email"
                onChange={(e) => setEmail(e.target.value)}
                helperText={fieldErrors.email || " "}
                error={Boolean(fieldErrors.email)}
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
                helperText={fieldErrors.password || " "}
                error={Boolean(fieldErrors.password)}
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
                onChange={(e) => setConfirmPassword(e.target.value)}
                helperText={fieldErrors.confirmPassword || " "}
                error={Boolean(fieldErrors.confirmPassword)}
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
                value={
                  country ? countries.find((c) => c.label === country) : null
                }
                onChange={(event, value) =>
                  setCountry(value ? value.label : "")
                }
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
                    helperText={fieldErrors.country || " "}
                    error={Boolean(fieldErrors.country)}
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
                  setProvince(value ? value.name : "");
                  handleProvinceChange(value);
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
                    helperText={fieldErrors.province || " "}
                    error={Boolean(fieldErrors.province)}
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
                value={
                  city ? filteredCities.find((c) => c.name === city) : null
                }
                onChange={(event, value) => setCity(value ? value.name : "")}
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
                    helperText={fieldErrors.city || " "}
                    error={Boolean(fieldErrors.city)}
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
                helperText={fieldErrors.barangay || " "}
                error={Boolean(fieldErrors.barangay)}
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
                helperText={fieldErrors.street || " "}
                error={Boolean(fieldErrors.street)}
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
                helperText={fieldErrors.postalCode || " "}
                error={Boolean(fieldErrors.postalCode)}
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
                options={idTypeIdList}
                autoHighlight
                onChange={(event, value) => setIdTypeId(value?.id)}
                helperText={fieldErrors.idTypeId || " "}
                error={Boolean(fieldErrors.idTypeId)}
                getOptionLabel={(option) => option?.type}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="ID Type"
                    helperText={fieldErrors.idTypeId || " "}
                    error={Boolean(fieldErrors.idTypeId)}
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
                helperText={fieldErrors.idNumber || " "}
                error={Boolean(fieldErrors.idNumber)}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Button
                variant="outlined"
                component="label"
                size="large"
                fullWidth
                sx={{
                  color: Boolean(fieldErrors.idFileUrl) ? "red" : "",
                  borderColor: Boolean(fieldErrors.idFileUrl) ? "red" : "",
                }}
              >
                Upload ID
                <input
                  hidden
                  accept=".pdf, image/*"
                  type="file"
                  onChange={handleFileChange}
                  error={Boolean(fieldErrors.idFileUrl)}
                />
              </Button>
              <FormHelperText sx={{ color: "red" }}>
                {fieldErrors.idFileUrl || " "}
              </FormHelperText>
              <Typography variant="body2">Show Selected File:</Typography>
              {filePreview && (
                <Box display="flex" alignItems="center" mt={2}>
                  <Typography>{fileName}</Typography>
                  <IconButton onClick={handleViewClick}>
                    <VisibilityIcon />
                  </IconButton>
                  <IconButton onClick={handleRemoveClick}>
                    <CloseIcon />
                  </IconButton>
                </Box>
              )}
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={() => {
              handleClick();
            }}
          >
            Submit
          </Button>
        </Box>
      </Box>
      <Dialog open={viewModalOpen} onClose={handleCloseModal}>
        <DialogTitle>File Preview</DialogTitle>
        <DialogContent>
          {filePreview && (
            <>
              {filePreview.startsWith("/") ? (
                <img src={filePreview} alt={fileName} />
              ) : (
                <iframe src={filePreview} width="100%" height="500px" />
              )}
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            onClick={handleViewInNewTab}
            sx={{ mr: "auto" }}
          >
            View in Full Resolution
          </Button>
          <Button onClick={handleCloseModal}>Close</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default Register;
