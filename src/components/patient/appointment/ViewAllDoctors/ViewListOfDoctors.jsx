import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  TablePagination,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import DoctorsCardInfo from "./doctorsCard/DoctorsCardInfo";
import LastPageIcon from "@mui/icons-material/LastPage";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import PropTypes from "prop-types";

import * as doctorService from "../../../../redux/PostApiCalls/doctor";
import { useSelector } from "react-redux";
import SelectHmo from "../../../general/SelectHmo";
import SelectSpecialization from "../../../general/SelectSpecialization";

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
  const userLoggedinDetails = useSelector((state) => state.user);
  let userObject = userLoggedinDetails?.user;
  let token = userObject.token;
  let user = userLoggedinDetails?.user?.user;

  const [selectedHmo, setSelectedHmo] = useState(null);
  const [specialization, setSpecialization] = React.useState(null);
  const [firstName, setfirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [selectedDays, setSelectedDays] = useState([]);

  const [doctors, setDoctors] = useState([]);
  const [count, setCount] = useState(0);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(6);

  // const [location, setLocation] = React.useState("");

  //For Filter Fields
  const handleChangeFirstName = (event) => {
    setfirstName(event.target.value);
  };

  const handleChangeSurname = (event) => {
    setSurname(event.target.value);
  };

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

  const searchDoctors = async () => {
    try {
      const { data: doctorsPage } = await doctorService.searchDoctors({
        firstName: firstName ? firstName : null,
        lastName: surname ? surname : null,
        hmoId: selectedHmo ? selectedHmo.id : null,
        specId: specialization ? specialization.id : null,
        days: selectedDays,
        pageNo: page,
        pageSize: rowsPerPage,
      });
      console.log("Search Doctors Result", doctorsPage);
      setDoctors(doctorsPage.content);
      setCount(doctorsPage.totalElements);
    } catch (error) {
      console.error(error);
    }
  };

  // Fetching the Doctors list
  useEffect(() => {
    // Make the API call to fetch the list of doctors
    searchDoctors();
  }, [
    selectedHmo,
    firstName,
    selectedDays,
    specialization,
    surname,
    page,
    rowsPerPage,
  ]);

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

  // Reset filters handler
  const handleResetFilters = () => {
    setfirstName("");
    setSurname("");
    setDoctors([]);
    setPage(0);
    setSelectedDays([]);
    setSelectedHmo(null);
    setSpecialization(null);
    // setLocation("");
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
                value={surname}
                onChange={handleChangeSurname}
              />
            </Grid>
            <Grid item xs={12} sm={4} md={4} lg={2}>
              <TextField
                id="outlined-basic"
                label="Doctor's First Name"
                variant="outlined"
                size="large"
                fullWidth
                value={firstName}
                onChange={handleChangeFirstName}
              />
            </Grid>
            <Grid item xs={12} sm={4} md={4} lg={2}>
              <SelectHmo
                value={selectedHmo}
                onSelect={(event, newValue) => handleSelect(newValue, "hmo")}
              />
            </Grid>
            <Grid item xs={12} sm={4} md={4} lg={2}>
              <SelectSpecialization
                value={specialization}
                onSelect={(event, newValue) =>
                  handleSelect(newValue, "specialization")
                }
              />
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
        {doctors.map((doctor) => (
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={doctor.id}>
            <DoctorsCardInfo doctor={doctor} />
          </Grid>
        ))}
        {/* {(rowsPerPage > 0
          ? doctors.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          : doctors
        ).map((doctor) => (
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={doctor.id}>
            <DoctorsCardInfo doctor={doctor} />
          </Grid>
        ))}
        {emptyRows > 0 && (
          <Grid item sx={{ height: 53 * emptyRows }}>
            <Typography variant="body2">No Content</Typography>
          </Grid>
        )} */}
      </Grid>
      <Grid container justifyContent="center" mt={2}>
        <Grid item xs={12}>
          <Card>
            <TablePagination
              rowsPerPageOptions={[6, 12, 24]}
              colSpan={3}
              count={count}
              rowsPerPage={rowsPerPage}
              page={page}
              // SelectProps={{
              //   inputProps: {
              //     "aria-label": "rows per page",
              //   },
              //   native: true,
              // }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              // ActionsComponent={TablePaginationActions}
            />
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ViewListOfDoctors;
