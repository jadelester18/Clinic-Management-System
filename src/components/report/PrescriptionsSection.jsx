import React, { Fragment } from "react";
import ReportSectionHeader from "./ReportSectionHeader";
import {
  Box,
  Container,
  Grid,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import DeleteIcon from "@mui/icons-material/Delete";

export default function PrescriptionsSection({ form, onAdd, onRemove }) {
  const styles = {
    outline: {
      border: 1,
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
    <>
      <ReportSectionHeader title={`Prescriptions`} />
      <Grid container spacing={2}>
        {form.prescriptions.map((prescription) => (
          <Fragment key={prescription.id}>
            <Grid item xs={10}>
              <Stack sx={styles.outline}>
                <Stack direction={`row`} justifyContent={`space-between`}>
                  <Typography variant="body2">
                    {prescription.formulation}
                  </Typography>
                  <Typography variant="body2">{`# ${prescription.subscription}`}</Typography>
                </Stack>
                <Typography variant="caption">{`Sig. ${prescription.signatura}`}</Typography>
              </Stack>
            </Grid>
            <Grid item xs={2}>
              <Box sx={styles.buttonBox}>
                <Tooltip title="Remove prescription">
                  <IconButton color="error">
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            </Grid>
          </Fragment>
        ))}
        <Grid item xs={12} md={10}>
          <TextField label="Add Prescription" onClick={() => {}} fullWidth />
        </Grid>
      </Grid>
    </>
  );
}
