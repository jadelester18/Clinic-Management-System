import {
  Avatar,
  Grid,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import * as util from "../../../../../../redux/util";

export default function PatientRow({ selected, patient, onSelect }) {
  const { icNo, birthDate, gender, email, contactNo, address } = patient;

  function isSelected() {
    return selected ? selected.id === patient.id : false;
  }

  const styles = {
    gContainer: {
      spacing: 1,
      justifyContent: "center",
      alignItems: "stretch",
    },
    gItem: {
      xs: 12,
      md: 4,
    },
    stack: {
      height: "100%",
      justifyContent: "center",
      alignItems: "center",
    },
    liText: {
      textAlign: { xs: "center", md: "left" },
    },
    liButton: {
      borderRadius: 10,
      border: isSelected() ? 1 : 0,
      borderColor: isSelected() ? "#00D5FA" : "none",
    },
  };
  return (
    <ListItemButton
      alignItems="center"
      onClick={() => onSelect(patient)}
      selected={isSelected()}
      sx={styles.liButton}
    >
      <Grid container {...styles.gContainer}>
        <Grid item {...styles.gItem}>
          <Stack
            direction={{ xs: "column", md: "row" }}
            height="100%"
            justifyContent={{ xs: "center", md: "space-between" }}
          >
            <Stack direction={{ xs: "column", md: "row" }} {...styles.stack}>
              <ListItemAvatar sx={{ m: 0 }}>
                <Avatar
                  alt={patient.firstName}
                  src={patient.avatarUrl || "/static/images/avatar/1.jpg"}
                />
              </ListItemAvatar>
              <ListItemText
                sx={styles.liText}
                disableTypography
                primary={
                  <Typography variant="body1">{util.name(patient)}</Typography>
                }
                secondary={<Typography variant="body2">{icNo}</Typography>}
              />
            </Stack>
            <Stack direction="column" {...styles.stack}>
              <Typography variant="body2">{birthDate}</Typography>
              <Typography variant="body2">{gender}</Typography>
            </Stack>
          </Stack>
        </Grid>
        <Grid item {...styles.gItem}>
          <Stack direction="column" {...styles.stack}>
            <Typography variant="body2">{email}</Typography>
            <Typography variant="body2">{contactNo}</Typography>
          </Stack>
        </Grid>
        <Grid item {...styles.gItem}>
          <Stack direction="column" {...styles.stack} textAlign="center">
            <Typography variant="body2">{util.fullAddress(address)}</Typography>
          </Stack>
        </Grid>
      </Grid>
    </ListItemButton>
  );
}
