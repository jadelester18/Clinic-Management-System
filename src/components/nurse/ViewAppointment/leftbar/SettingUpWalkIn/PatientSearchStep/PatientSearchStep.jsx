import { Box, Divider, Grid, List, Typography } from "@mui/material";
import React, { Fragment, useRef, useState } from "react";
import * as patientSvc from "../../../../../../redux/GetApiCalls/patient";
import { DEFAULT_DATE_FORMAT } from "../../../../../../redux/default";
import PatientSearchFilter from "./PatientSearchFilter";
import PatientRow from "./PatientRow";
import PatientHeader from "./PatientHeader";

const MAX_RESULT_SIZE = 5;

const PatientSearchStep = ({ selected, onSelect }) => {
  const [form, setForm] = useState({
    birthdate: null,
    firstName: "",
    lastName: "",
  });
  const [patients, setPatients] = useState([]);

  async function fetchPatients({ firstName, lastName, birthdate }) {
    try {
      if (firstName || lastName || birthdate) {
        const { data: page } = await patientSvc.searchPatients({
          firstName: firstName,
          lastName: lastName,
          birthDate: birthdate ? birthdate.format(DEFAULT_DATE_FORMAT) : null,
          pageNo: 0,
          pageSize: MAX_RESULT_SIZE,
        });
        console.log("fetchPatients result", page);
        setPatients(page.content);
      }
    } catch (error) {
      console.error(error);
    }
  }

  const debounce = useRef(null);

  function handleInput(event, origin) {
    if (origin === "birthdate") {
      const newForm = { ...form, birthdate: event };
      setForm(newForm);
      fetchPatients(newForm);
    } else {
      const newForm = { ...form, [origin]: event.target.value };
      setForm(newForm);
      if (debounce.current) {
        clearTimeout(debounce.current);
      }
      debounce.current = setTimeout(() => fetchPatients(newForm), 400);
    }
  }

  const styles = {
    list: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      overflowY: "scroll",
      maxHeight: "15rem",
      "&::-webkit-scrollbar": {
        width: "0.4em",
      },
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: "#888",
      },
    },
  };

  return (
    <>
      <PatientSearchFilter form={form} onInput={handleInput} />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <PatientHeader />
          <Divider variant="middle" />
          <List sx={styles.list}>
            {patients?.length > 0 ? (
              patients.map((patient) => (
                <Fragment key={patient.id}>
                  <PatientRow
                    selected={selected}
                    patient={patient}
                    onSelect={onSelect}
                  />
                  <Divider variant="middle" />
                </Fragment>
              ))
            ) : (
              <Box sx={{ textAlign: "center", m: 1 }}>
                <Typography variant="body1">No results</Typography>
              </Box>
            )}
          </List>
        </Grid>
      </Grid>
    </>
  );
};

export default PatientSearchStep;
