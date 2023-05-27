import {
  Autocomplete,
  Avatar,
  Divider,
  Grid,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import * as hmoService from "../../../../../../redux/GetApiCalls/hmo";
import * as specializationService from "../../../../../../redux/GetApiCalls/specialization";

const DoctorSearchStep = () => {
  const [selectedHmo, setSelectedHmo] = useState(null);
  const [specialization, setSpecialization] = React.useState(null);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(6);

  const handleSelect = (value, origin) => {
    switch (origin) {
      case "specialization":
        setSpecialization(value);
        break;
      case "hmo":
        setSelectedHmo(value);
        break;
      default:
        throw new Error("Invalid input");
    }
    setPage(0);
    setRowsPerPage(5);
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item>
          <Typography variant="body1" mt={2}>
            Filter By:
          </Typography>
        </Grid>
        <Grid item xs={2.5}>
          <TextField
            autoFocus
            margin="dense"
            label="First Name"
            fullWidth
            variant="outlined"
            multiline
          />
        </Grid>
        <Grid item xs={2.5}>
          <TextField
            autoFocus
            margin="dense"
            label="Last Name"
            fullWidth
            variant="outlined"
            multiline
          />
        </Grid>
        <Grid item xs={2.5} mt={1}>
          <SelectHmo
            value={selectedHmo}
            onSelect={(event, newValue) => handleSelect(newValue, "hmo")}
          />
        </Grid>
        <Grid item xs={2.5} mt={1}>
          <SelectSpecialization
            value={specialization}
            onSelect={(event, newValue) =>
              handleSelect(newValue, "specialization")
            }
          />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <List
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              overflowY: "scroll",
              height: "15rem",
              "&::-webkit-scrollbar": {
                width: "0.4em",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#888",
              },
            }}
          >
            <ListItemButton alignItems="flex-start" fullWidth>
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
              </ListItemAvatar>
              <ListItemText
                primary="Brunch this weekend?"
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      Ali Connors
                    </Typography>
                    {" — I'll be in your neighborhood doing errands this…"}
                  </React.Fragment>
                }
              />
            </ListItemButton>
            <Divider component="li" />
          </List>
        </Grid>
      </Grid>
    </>
  );
};

export default DoctorSearchStep;

function SelectHmo({ value, onSelect }) {
  const [hmoList, setHmoList] = useState([]);

  async function fetchHmoList() {
    try {
      const { data } = await hmoService.getHmos();
      setHmoList(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchHmoList();
  }, []);

  return (
    <Autocomplete
      options={hmoList}
      getOptionLabel={(option) => option.title}
      value={value}
      renderInput={(params) => (
        <TextField {...params} label="HMO Accreditation" />
      )}
      onChange={onSelect}
      fullWidth
    />
  );
}

function SelectSpecialization({ value, onSelect }) {
  const [specializations, setSpecializations] = useState([]);

  async function fetchSpecializationList() {
    try {
      const { data } = await specializationService.getSpecializations();
      setSpecializations(data);
      console.log("specializations", specializations);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchSpecializationList();
  }, []);

  return (
    <Autocomplete
      options={specializations}
      getOptionLabel={(option) => option.description}
      value={value}
      renderInput={(params) => <TextField {...params} label="Specialization" />}
      onChange={onSelect}
      fullWidth
    />
  );
}
