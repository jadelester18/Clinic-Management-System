import React from "react";
import { Stack, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import * as util from "../../redux/util";

export const Prescription = ({ prescription, outlined }) => {
  const styles = {
    outline: {
      border: outlined ? 1 : 0,
      borderColor: grey[500],
      borderRadius: 1,
      p: 1,
      width: "100%",
    },
    stack: {
      justifyContent: "space-between",
    },
    buttonBox: {
      display: "flex",
      alignItems: "center",
      mx: 1,
      mt: 1,
    },
  };
  return (
    <Stack sx={styles.outline}>
      <Stack direction={`row`} justifyContent={`space-between`}>
        <Typography variant="body2">{prescription.formulation}</Typography>
        <Typography variant="body2">{`# ${prescription.subscription}`}</Typography>
      </Stack>
      <Typography variant="caption">{`Sig. ${util.signatura(
        prescription.signatura
      )}`}</Typography>
    </Stack>
  );
};
