import React, { Fragment, useState } from "react";
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
import PrescriptionDialog from "./PrescriptionDialog";
import * as util from "../../redux/util";

export default function PrescriptionsSection({ form, onAdd, onRemove }) {
  const [isFormOpen, setIsFormOpen] = useState(false);

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
        {form.prescriptions.map((prescription, index) => (
          <Fragment key={prescription.id}>
            <Grid item xs={10}>
              <Stack sx={styles.outline}>
                <Stack direction={`row`} justifyContent={`space-between`}>
                  <Typography variant="body2">
                    {prescription.formulation}
                  </Typography>
                  <Typography variant="body2">{`# ${prescription.subscription}`}</Typography>
                </Stack>
                <Typography variant="caption">{`Sig. ${util.signatura(
                  prescription.signatura
                )}`}</Typography>
              </Stack>
            </Grid>
            <Grid item xs={2}>
              <Box sx={styles.buttonBox}>
                <Tooltip title="Remove prescription">
                  <IconButton color="error" onClick={() => onRemove(index)}>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            </Grid>
          </Fragment>
        ))}
        <Grid item xs={12} md={10}>
          <TextField
            label="Add Prescription"
            onClick={() => setIsFormOpen(true)}
            fullWidth
          />
        </Grid>
      </Grid>
      {isFormOpen && (
        <PrescriptionDialog
          open={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          onSave={onAdd}
        />
      )}
    </>
  );
}
