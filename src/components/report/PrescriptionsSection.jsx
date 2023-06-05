import React, { Fragment, useState } from "react";
import ReportSectionHeader from "./ReportSectionHeader";
import {
  Box,
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
import { Prescription } from "../general/Prescription";
import PrintIcon from "@mui/icons-material/Print";

export default function PrescriptionsSection({
  form,
  onAdd,
  onRemove,
  disabled,
  onPrint,
  disablePrint,
}) {
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
      <Stack direction={`row`} spacing={2} alignItems={`center`}>
        <ReportSectionHeader title={`Prescriptions`} />
        <Tooltip title="Print prescription">
          <IconButton color="primary" onClick={onPrint} disabled={disablePrint}>
            <PrintIcon />
          </IconButton>
        </Tooltip>
      </Stack>

      <Grid container spacing={2}>
        {form.prescriptions.length > 0 ? (
          form.prescriptions.map((prescription, index) => (
            <Fragment key={prescription.id}>
              <Grid item xs={10}>
                <Prescription prescription={prescription} outlined={true} />
              </Grid>
              {!disabled && (
                <Grid item xs={2}>
                  <Box sx={styles.buttonBox}>
                    <Tooltip title="Remove prescription">
                      <IconButton color="error" onClick={() => onRemove(index)}>
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Grid>
              )}
            </Fragment>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography variant="body2">None</Typography>
          </Grid>
        )}
        {!disabled && (
          <Grid item xs={12} md={10}>
            <TextField
              label="Add Prescription"
              onClick={() => setIsFormOpen(true)}
              fullWidth
            />
          </Grid>
        )}
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
