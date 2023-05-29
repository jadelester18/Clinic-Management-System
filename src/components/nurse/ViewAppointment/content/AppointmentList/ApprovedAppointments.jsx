import { Box, CardContent, Divider, List, Typography } from "@mui/material";
import React, { Fragment, useState } from "react";
import ApprovedAppointmentRow from "./ApprovedAppointmentRow";
import ConfirmDialog from "../../../../ConfirmDialog";
import ApprovedAppointmentsHeader from "./ApprovedAppointmentsHeader";

const DEFAULT_DIALOG = {
  appointmentId: 0,
  open: false,
};

const ApprovedAppointments = ({ appointments, onArrivalChange }) => {
  const [arrivalDialog, setArrivalDialog] = useState(DEFAULT_DIALOG);
  const [revertDialog, setRevertDialog] = useState(DEFAULT_DIALOG);

  function handleArrival(appointmentId) {
    onArrivalChange(appointmentId, true);
    setArrivalDialog(DEFAULT_DIALOG);
  }

  function handleRevert(appointmentId) {
    onArrivalChange(appointmentId, false);
    setRevertDialog(DEFAULT_DIALOG);
  }

  const styles = {
    list: {
      width: "100%",
      bgcolor: "background.paper",
      borderRadius: 10,
      display: "flex",
      flexDirection: "column",
      height: "25rem",
      overflowY: "scroll",
      "&::-webkit-scrollbar": {
        width: "0.4em",
      },
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: "#888",
      },
      padding: 2,
    },
    box: { textAlign: "center", m: 2 },
  };
  return (
    <>
      <Box>
        <CardContent>
          <List sx={styles.list} dense={true}>
            {/* Add the header */}
            <ApprovedAppointmentsHeader />
            <Divider component="li" />
            {appointments?.length > 0 ? (
              appointments.map((appointment) => (
                <Fragment key={appointment.id}>
                  <ApprovedAppointmentRow
                    appointment={appointment}
                    onArrived={(appointmentId) =>
                      setArrivalDialog({ appointmentId, open: true })
                    }
                    onRevert={(appointmentId) =>
                      setRevertDialog({ appointmentId, open: true })
                    }
                  />
                  <Divider variant="inset" component="li" />
                </Fragment>
              ))
            ) : (
              <Box sx={styles.box}>
                <Typography variant="body1">
                  No appointments to display
                </Typography>
              </Box>
            )}
          </List>
        </CardContent>
      </Box>
      {arrivalDialog.open && (
        <ConfirmDialog
          title="Patient has arrived?"
          subtitle="Patient will be queued for assessment."
          open={arrivalDialog.open}
          onConfirm={() => handleArrival(arrivalDialog.appointmentId, true)}
          onClose={() => setArrivalDialog(DEFAULT_DIALOG)}
        />
      )}
      {revertDialog.open && (
        <ConfirmDialog
          title="Revert changes?"
          subtitle="Patient waiting time will be reset."
          open={revertDialog.open}
          onConfirm={() => handleRevert(revertDialog.appointmentId, true)}
          onClose={() => setRevertDialog(DEFAULT_DIALOG)}
        />
      )}
    </>
  );
};

export default ApprovedAppointments;
