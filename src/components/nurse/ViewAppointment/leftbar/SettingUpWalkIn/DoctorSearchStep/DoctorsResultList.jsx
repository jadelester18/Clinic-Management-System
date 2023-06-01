import { Box, Divider, Grid, List, Typography } from "@mui/material";
import React, { Fragment } from "react";
import DoctorRow from "./DoctorRow";
import DoctorHeader from "./DoctorHeader";

export default function DoctorsResultList({
  doctors,
  selected,
  date,
  onSelect,
}) {
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
    box: {
      textAlign: "center",
      m: 1,
    },
  };
  return (
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
  );
}
