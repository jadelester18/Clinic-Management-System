import {
  Autocomplete,
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import {
  DatePicker,
  LocalizationProvider,
  StaticDateTimePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import {
  countries,
  provinces,
  cities,
} from "../../../../../../pages/addressDb/adress";
import SelectHonorific from "../../../../../general/SelectHonorific";
import SelectBirthdate from "../../../../../general/SelectBirthdate";
import SelectGender from "../../../../../general/SelectGender";
import SelectCountry from "../../../../../general/SelectCountry";

const CreatingNewWalkIn = ({ patient }) => {
  const [form, setForm] = useState({
    honorific: "",
    firstName: "",
    lastName: "",
    suffixName: "",
    birthDate: null,
    gender: "",
    countryForPhone: null,
    contactNo: "",
    email: "",
    country: "",
    province: "",
    city: "",
    barangay: "",
    street: "",
    postalCode: "",
  });
  // console.log("form", form);

  const [country, setCountry] = React.useState([]);
  const [province, setProvince] = React.useState([]);
  const [city, setCity] = React.useState([]);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [filteredCities, setFilteredCities] = useState([]);

  const handleProvinceChange = (event) => {
    setSelectedProvince(event);

    const filteredCities = cities.filter(
      (city) => city.province_code === event
    );
    setFilteredCities(filteredCities);
  };

  function handleSelect(event, value, origin) {
    switch (origin) {
      case "honorific":
        setForm({ ...form, honorific: value });
        break;
      case "birthDate":
        setForm({ ...form, birthDate: value });
        break;
      case "gender":
        setForm({ ...form, gender: value });
        break;
      default:
        throw new Error("Invalid input");
    }
  }

  function handleTextInput(event) {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  }

  useEffect(() => {
    if (patient) {
      const countryForPhone = countries.find((country) => {
        const areaCode = patient.contactNo.substring(1, 3);
        return country.code === areaCode;
      });
      const countryForAddress = countries.find(
        (country) => country.label === patient.address?.country
      );
      setForm({
        ...patient,
        ...patient.address,
        birthDate: dayjs(patient.birthDate),
        countryForPhone: countryForPhone,
        contactNo: "",
        country: countryForAddress,
        province: "",
        city: "",
      });
    }
  }, [patient]);

  return (
    <Box>
      <Grid
        container
        spacing={2}
        // mt={2}
        direction={{ xs: "column", sm: "row" }}
      >
        <Grid item xs={12}>
          <Grid
            container
            direction="row"
            justifyContent="space-evenly"
            alignItems="center"
            spacing={2}
          >
            <Grid item xs={4}>
              <SelectHonorific
                value={form.honorific}
                onSelect={(event) => handleSelect(event, "honorific")}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                name="firstName"
                value={form.firstName}
                margin="dense"
                label="First name"
                fullWidth
                variant="outlined"
                onChange={handleTextInput}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                name="middleName"
                value={form.middleName}
                margin="dense"
                label="Middle name"
                fullWidth
                variant="outlined"
                onChange={handleTextInput}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                name="lastName"
                margin="dense"
                label="Last name"
                value={form.lastName}
                fullWidth
                variant="outlined"
                onChange={handleTextInput}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                margin="dense"
                value={form.suffixName}
                label="Suffix"
                fullWidth
                variant="outlined"
                onChange={handleTextInput}
              />
            </Grid>
            <Grid item xs={4}>
              <SelectBirthdate
                value={form.birthDate}
                onChange={(event) => handleSelect(event, "birthDate")}
              />
            </Grid>
            <Grid item xs={4}>
              <SelectGender
                value={form.gender}
                onSelect={(event) => handleSelect(event, "gender")}
              />
            </Grid>
            {/* TODO: CONTACT NO */}
            <Grid item xs={4}>
              <Stack direction="row">
                <Autocomplete
                  id="country-select-demo"
                  sx={{ mr: 1, width: 250 }}
                  options={countries.sort((a, b) =>
                    a.label.localeCompare(b.label)
                  )}
                  autoHighlight
                  getOptionLabel={(option) => option.code + " +" + option.phone}
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
                      size="small"
                      inputProps={{
                        ...params.inputProps,
                        autoComplete: "new-password", // disable autocomplete and autofill
                      }}
                    />
                  )}
                />
                <TextField
                  label="Phone Number"
                  size="small"
                  fullWidth
                  inputProps={{
                    maxLength: 10,
                  }}
                />
              </Stack>
            </Grid>
            <Grid item xs={4}>
              <TextField
                value={form.email}
                margin="dense"
                label="Email"
                fullWidth
                variant="outlined"
                onChange={handleTextInput}
              />
            </Grid>
            {/* TODO: COUNTRY */}
            <Grid item xs={4}>
              <SelectCountry
                value={form.country}
                onSelect={(event, value) =>
                  handleSelect(event, value, "country")
                }
              />
            </Grid>
            {/* TODO: ADDRESS */}
            <Grid item xs={4}>
              <Autocomplete
                id="country-select-demo"
                autoWidth
                options={provinces}
                autoHighlight
                size="small"
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
            <Grid item xs={4}>
              <Autocomplete
                id="country-select-demo"
                autoWidth
                options={filteredCities}
                autoHighlight
                size="small"
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
            <Grid item xs={4}>
              <TextField
                value={form.barangay}
                margin="dense"
                name="barangay"
                label="Barangay"
                autoComplete="barangay"
                fullWidth
                variant="outlined"
                onChange={handleTextInput}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                value={form.street}
                margin="dense"
                name="street"
                label="Zone/Street"
                autoComplete="Street"
                fullWidth
                variant="outlined"
                onChange={handleTextInput}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                value={form.postalCode}
                margin="dense"
                name="postalCode"
                label="Postal Code"
                autoComplete="postalCode"
                fullWidth
                variant="outlined"
                onChange={handleTextInput}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CreatingNewWalkIn;
