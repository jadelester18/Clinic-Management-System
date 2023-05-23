import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TablePagination,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import DoctorsCardInfo from "./doctorsCard/DoctorsCardInfo";
import axios from "axios";
import LastPageIcon from "@mui/icons-material/LastPage";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import PropTypes from "prop-types";

import * as patientService from "../../../../redux/patient";

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

const ViewListOfDoctors = () => {
  const [HMOList, setHMOList] = useState([]);
  const [SpecializationList, setSpecializationList] = useState([]);
  const [firstName, setfirstName] = useState("");
  const [surName, setSurName] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(6);
  const [selectedDays, setSelectedDays] = useState([]);
  const [HMOAccredited, setHMOAccredited] = React.useState("");
  const [specialization, setSpecialization] = React.useState("");
  const [location, setLocation] = React.useState("");

  //Fetching the HMO list
  useEffect(() => {
    const fetchHMOListData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/v1/hmos`);
        setHMOList(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchHMOListData();
  }, []);

  //Fetching the Specialization list
  useEffect(() => {
    const fetchSpecializationListData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/specializations`
        );
        setSpecializationList(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSpecializationListData();
  }, []);

  //For Filter Fields

  const handleChangeFirstName = (event) => {
    setfirstName(event.target.value);
  };

  const handleChangeSurName = (event) => {
    setSurName(event.target.value);
  };

  // TEST
  const searchDoctors = async () => {
    const { data } = await patientService.searchDoctors({
      firstName: firstName,
      lastName: surName,
      hmoId: HMOAccredited,
      specId: specialization,
      days: selectedDays,
      pageNo: 0,
      pageSize: 10,
    });
    console.log(data);
  };

  useEffect(() => {
    searchDoctors();
  }, [HMOAccredited, firstName, selectedDays, specialization, surName]);

  //Fetching the Doctors list

  // useEffect(() => {
  //   // Make the API call to fetch the list of doctors
  //   fetch("http://localhost:8080/api/v1/doctors/search", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       firstName: firstName,
  //       lastName: surName,
  //       hmoId: HMOAccredited,
  //       specId: specialization,
  //       days: selectedDays,
  //       pageNo: 0,
  //       pageSize: 10,
  //     }),
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       // Update the state with the fetched list of doctors
  //       setDoctors(data.content);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching doctors:", error);
  //     });
  // }, [HMOAccredited, firstName, selectedDays, specialization, surName]);

  //For Pagination

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - doctors.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  //For multiple day selection

  const handleDayClick = (day) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(
        selectedDays.filter((selectedDay) => selectedDay !== day)
      );
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  const isDaySelected = (day) => selectedDays.includes(day);

  //For HMO Accredted
  const handleChangeHMOAccredited = (event) => {
    setHMOAccredited(event.target.value);
  };

  //For Specialization

  const handleChangeSpecialization = (event) => {
    setSpecialization(event.target.value);
  };

  //For Location

  const handleChangeLocation = (event) => {
    setLocation(event.target.value);
  };

  // Reset filters handler
  const handleResetFilters = () => {
    setfirstName("");
    setSurName("");
    setDoctors([]);
    setPage(0);
    setSelectedDays([]);
    setHMOAccredited("");
    setSpecialization("");
    setLocation("");
  };

  //Checking if screen is extra small
  const isMdScreen = useMediaQuery((theme) => theme.breakpoints.up("sm"));

  return (
    <Box>
      <Card>
        <CardContent>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={3} sm={3} md={3} lg={1.5}>
              <Button
                variant={isDaySelected("MONDAY") ? "contained" : "outlined"}
                size="medium"
                onClick={() => handleDayClick("MONDAY")}
              >
                {isMdScreen ? "Monday" : "Mon"}
              </Button>
            </Grid>
            <Grid item xs={3} sm={3} md={3} lg={1.5}>
              <Button
                variant={isDaySelected("TUESDAY") ? "contained" : "outlined"}
                size="medium"
                onClick={() => handleDayClick("TUESDAY")}
              >
                {isMdScreen ? "Tuesday" : "Tue"}
              </Button>
            </Grid>
            <Grid item xs={3} sm={3} md={3} lg={1.5}>
              <Button
                variant={isDaySelected("WEDNESDAY") ? "contained" : "outlined"}
                size="medium"
                onClick={() => handleDayClick("WEDNESDAY")}
              >
                {isMdScreen ? "Wednesday" : "Wed"}
              </Button>
            </Grid>
            <Grid item xs={3} sm={3} md={3} lg={1.5}>
              <Button
                variant={isDaySelected("THURSDAY") ? "contained" : "outlined"}
                size="medium"
                onClick={() => handleDayClick("THURSDAY")}
              >
                {isMdScreen ? "Thursday" : "Thu"}
              </Button>
            </Grid>
            <Grid item xs={3} sm={3} md={3} lg={1.5}>
              <Button
                variant={isDaySelected("FRIDAY") ? "contained" : "outlined"}
                size="medium"
                onClick={() => handleDayClick("FRIDAY")}
              >
                {isMdScreen ? "Friday" : "Fri"}
              </Button>
            </Grid>
            <Grid item xs={3} sm={3} md={3} lg={1.5}>
              <Button
                variant={isDaySelected("SATURDAY") ? "contained" : "outlined"}
                size="medium"
                onClick={() => handleDayClick("SATURDAY")}
              >
                {isMdScreen ? "Saturday" : "Sat"}
              </Button>
            </Grid>
            <Grid item xs={3} sm={3} md={3} lg={1.5}>
              <Button
                variant={isDaySelected("SUNDAY") ? "contained" : "outlined"}
                size="medium"
                onClick={() => handleDayClick("SUNDAY")}
              >
                {isMdScreen ? "Sunday" : "Sun"}
              </Button>
            </Grid>
          </Grid>
          <Grid container spacing={2} mt={2} justifyContent="center">
            <Grid item xs={12} sm={4} md={4} lg={2}>
              <TextField
                id="outlined-basic"
                label="Doctor's Surname"
                variant="outlined"
                size="large"
                fullWidth
                onChange={handleChangeSurName}
              />
            </Grid>
            <Grid item xs={12} sm={4} md={4} lg={2}>
              <TextField
                id="outlined-basic"
                label="Doctor's First Name"
                variant="outlined"
                size="large"
                fullWidth
                onChange={handleChangeFirstName}
              />
            </Grid>
            <Grid item xs={12} sm={4} md={4} lg={2}>
              <FormControl fullWidth size="large">
                <InputLabel id="demo-simple-select-label">
                  HMO Accredition
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="HMO Accredition"
                  onChange={HMOAccredited}
                >
                  {HMOList.map((HMOList) => (
                    <MenuItem key={HMOList.id} value={HMOList.id}>
                      {HMOList.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4} md={4} lg={2}>
              <FormControl fullWidth size="large">
                <InputLabel id="demo-simple-select-label">
                  Specialization
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Specialization"
                  onChange={handleChangeSpecialization}
                >
                  {SpecializationList.map((SpecializationList) => (
                    <MenuItem
                      key={SpecializationList.id}
                      value={SpecializationList.id}
                    >
                      {SpecializationList.description}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4} md={4} lg={2}>
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleResetFilters}
              >
                Reset Filters
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        {(rowsPerPage > 0
          ? doctors.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          : doctors
        ).map((doctor) => (
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={doctor.id}>
            <DoctorsCardInfo doctor={doctor} />
          </Grid>
        ))}
        {emptyRows > 0 && (
          <Grid style={{ height: 53 * emptyRows }}>
            <Typography variant="body2">No Content</Typography>
          </Grid>
        )}
      </Grid>
      <Grid container justifyContent="center" mt={2}>
        <Grid item xs={12}>
          <Card>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
              colSpan={3}
              count={doctors.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  "aria-label": "rows per page",
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ViewListOfDoctors;
