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
import React, { useState } from "react";
import {
  countries,
  provinces,
  cities,
} from "../../../../../../pages/addressDb/adress";

const CreatingNewWalkIn = ({
  openCreateAppointment,
  handleCloseCreateAppointment,
}) => {
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
              <FormControl fullWidth size="small">
                <InputLabel id="demo-simple-select-autowidth-label">
                  Honorific
                </InputLabel>
                <Select
                  labelId="demo-simple-select-autowidth-label"
                  id="demo-simple-select-autowidth"
                  label="Honorific"
                  autoWidth
                >
                  <MenuItem value={"Mr."}>Mr.</MenuItem>
                  <MenuItem value={"Mrs."}>Mrs.</MenuItem>
                  <MenuItem value={"Ms."}>Ms.</MenuItem>
                  <MenuItem value={"Mx."}>Mx.</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <TextField
                autoFocus
                margin="dense"
                label="First Name"
                fullWidth
                variant="outlined"
                multiline
                size="small"
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                autoFocus
                margin="dense"
                label="Middle Name"
                fullWidth
                variant="outlined"
                multiline
                size="small"
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                autoFocus
                margin="dense"
                label="Last Name"
                fullWidth
                variant="outlined"
                multiline
                size="small"
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                autoFocus
                margin="dense"
                label="Suffix"
                fullWidth
                variant="outlined"
                multiline
                size="small"
              />
            </Grid>
            <Grid item xs={4}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="BirthDate"
                  slotProps={{ textField: { size: "small" } }}
                  sx={{ width: "100%" }}
                  renderInput={(props) => (
                    <TextField
                      {...props}
                      value={dayjs().format("YYYY-MM-DD")}
                    />
                  )}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={4}>
              <FormControl fullWidth size="small">
                <InputLabel id="demo-simple-select-autowidth-label">
                  Gender
                </InputLabel>
                <Select
                  labelId="demo-simple-select-autowidth-label"
                  id="demo-simple-select-autowidth"
                  label="Gender"
                  autoWidth
                >
                  <MenuItem value={"Male"}>Male</MenuItem>
                  <MenuItem value={"Female"}>Female</MenuItem>
                </Select>
              </FormControl>
            </Grid>
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
                autoFocus
                margin="dense"
                label="Email"
                fullWidth
                variant="outlined"
                multiline
                size="small"
              />
            </Grid>
            <Grid item xs={4}>
              <Autocomplete
                id="country-select-demo"
                autoWidth
                size="small"
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
                margin="normal"
                name="Barangay"
                label="Barangay"
                autoComplete="barangay"
                fullWidth
                size="small"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                margin="normal"
                name="Street"
                label="Zone/Street"
                autoComplete="Street"
                fullWidth
                size="small"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                margin="normal"
                name="postalCode"
                label="postal Code"
                autoComplete="postalCode"
                fullWidth
                size="small"
                variant="outlined"
              />
            </Grid>
            {/* <Grid item xs={12}>
                <TextField
                  autoFocus
                  margin="dense"
                  label="Chief Complaint"
                  fullWidth
                  variant="outlined"
                  multiline
                  size="small"
                />
              </Grid> */}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CreatingNewWalkIn;
