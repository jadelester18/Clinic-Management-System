import { Box, Grid, Stack, TextField } from "@mui/material";
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
import SelectProvince from "../../../../../general/SelectProvince";
import SelectCity from "../../../../../general/SelectCity";

const CreatingNewWalkIn = ({ form, setForm }) => {
  function handleSelect(event, value, origin) {
    console.log(value);
    console.log(origin);
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
      case "province":
        setForm({ ...form, province: value });
        break;
      case "city":
        setForm({ ...form, city: value });
        break;
      case "country":
        setForm({ ...form, country: value });
        break;
      default:
        throw new Error("Invalid input");
    }
  }

  function handleTextInput(event) {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  }

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
                onSelect={(event) =>
                  handleSelect(event, event.target.value, "honorific")
                }
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
                onChange={(event) => handleSelect(event, event, "birthDate")}
              />
            </Grid>
            <Grid item xs={4}>
              <SelectGender
                value={form.gender}
                onSelect={(event) =>
                  handleSelect(event, event.target.value, "gender")
                }
              />
            </Grid>
            <Grid item xs={4}>
              <Stack direction="row">
                <TextField
                  name="contactNo"
                  value={form.contactNo}
                  onChange={handleTextInput}
                  label="Contact no."
                  fullWidth
                  margin="dense"
                />
              </Stack>
            </Grid>
            <Grid item xs={4}>
              <TextField
                name="email"
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
              <SelectProvince
                value={form.province}
                onSelect={(event, value) =>
                  handleSelect(event, value, "province")
                }
              />
            </Grid>
            <Grid item xs={4}>
              <SelectCity
                value={form.city}
                onSelect={(event, value) => handleSelect(event, value, "city")}
                province={form.province}
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
