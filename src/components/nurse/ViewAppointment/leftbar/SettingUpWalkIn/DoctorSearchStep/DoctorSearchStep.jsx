import { Box, Divider, Grid, List, Typography } from "@mui/material";
import React, { Fragment, useRef, useState } from "react";
import DoctorSearchFilter from "./DoctorSearchFilter";
import * as doctorSvc from "../../../../../../redux/PostApiCalls/doctor";
import DoctorRow from "./DoctorRow";
import DoctorHeader from "./DoctorHeader";

const MAX_RESULT_SIZE = 5;

const DoctorSearchStep = ({ selected, onSelect, date }) => {
  const [doctors, setDoctors] = useState([]);
  const [query, setQuery] = useState({
    firstName: "",
    lastName: "",
    hmo: null,
    specialization: null,
  });

  const handleSelect = (value, origin) => {
    let newQuery;
    switch (origin) {
      case "specialization":
        newQuery = { ...query, specialization: value };
        break;
      case "hmo":
        newQuery = { ...query, hmo: value };
        break;
      default:
        throw new Error("Invalid input");
    }
    setQuery(newQuery);
    fetchDoctors(newQuery);
  };

  const debounce = useRef(null);

  const handleTextInput = (event) => {
    const { name, value } = event.target;
    const newQuery = { ...query, [name]: value };
    setQuery(newQuery);
    if (debounce.current) {
      clearTimeout(debounce.current);
    }
    debounce.current = setTimeout(() => fetchDoctors(newQuery), 400);
  };

  const fetchDoctors = async ({ firstName, lastName, hmo, specialization }) => {
    try {
      const { data: doctorsPage } = await doctorSvc.searchDoctors({
        firstName: firstName ? firstName : null,
        lastName: lastName ? lastName : null,
        hmoId: hmo ? hmo.id : null,
        specId: specialization ? specialization.id : null,
        days: [],
        pageNo: 0,
        pageSize: MAX_RESULT_SIZE,
      });
      console.log("Search Doctors Result", doctorsPage);
      setDoctors(doctorsPage.content);
    } catch (error) {
      console.error(error);
    }
  };

  const styles = {
    list: {
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
    },
    box: {
      textAlign: "center",
      m: 1,
    },
  };

  return (
    <>
      <DoctorSearchFilter
        query={query}
        onSelect={handleSelect}
        onTextInput={handleTextInput}
      />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <DoctorHeader />
          <Divider variant="middle" />
          <List sx={styles.list}>
            {doctors?.length > 0 ? (
              doctors.map((doctor) => (
                <Fragment key={doctor.id}>
                  <DoctorRow
                    doctor={doctor}
                    selected={selected}
                    date={date}
                    onSelect={onSelect}
                  />
                  <Divider variant="middle" />
                </Fragment>
              ))
            ) : (
              <Box sx={styles.box}>
                <Typography variant="body1">No results</Typography>
              </Box>
            )}
          </List>
        </Grid>
      </Grid>
    </>
  );
};

export default DoctorSearchStep;
