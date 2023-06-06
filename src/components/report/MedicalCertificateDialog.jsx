import React, { useEffect, useRef, useState } from "react";
import MedicalCertificate from "../../pages/MedicalCertificate";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import SelectDate from "../general/SelectDate";
import dayjs from "dayjs";
import { DEFAULT_DATE_FORMAT } from "../../redux/default";
import { useReactToPrint } from "react-to-print";
import MedicalCertificateForm from "./MedicalCertificateForm";
import SelectMedCertPurpose from "../general/SelectMedCertPurpose";
import SelectMedCertType from "../general/SelectMedCertType";
import LoadingScreen from "../LoadingScreen";
import { useSelector } from "react-redux";
import ClinicForm from "../general/ClinicForm";

export default function MedicalCertificateDialog({
  open,
  onClose,
  report,
  onSave,
  isSaving,
}) {
  const loginDetails = useSelector((state) => state.user?.user);

  const userIsDoctor = loginDetails.user.role === "ROLE_DOCTOR";
  const { details, queue, medicalCertificate } = report;
  const [form, setForm] = useState({
    isEdited: false,
    purpose: "WORK",
    type: "FIT",
    remarks: "",
    date: dayjs(),
    totalRestDays: "",
    patient: report.queue.patient,
    report: report,
  });

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    pageStyle: "@page {size: 10in 13in}",
    content: () => componentRef.current,
    documentTitle: "MedicalCert.pdf",
  });

  function handleChange(event, property) {
    switch (property) {
      case "date":
        setForm({ ...form, date: event, isEdited: true });
        break;
      case "purpose":
        setForm({ ...form, purpose: event.target.value, isEdited: true });
        break;
      case "type":
        setForm({ ...form, type: event.target.value, isEdited: true });
        break;
      case "totalRestDays":
        {
          const numericValue = event.target.value.replace(/[^0-9.-]+/g, "");
          setForm({ ...form, totalRestDays: +numericValue, isEdited: true });
        }
        break;
      case "remarks":
        setForm({ ...form, remarks: event.target.value, isEdited: true });
        break;
      default:
        throw new Error("Invalid input");
    }
  }

  function handleSave() {
    if (medicalCertificate) {
      onSave(medicalCertificate.id, form);
    } else {
      onSave(null, form);
    }
  }

  function isFormInvalid() {
    if (!form.isEdited && !!report.medicalCertificate) {
      return true;
    }
    return false;
  }

  useEffect(() => {
    if (report && report.medicalCertificate) {
      console.log("TEST SUCCESSFUL");
      setForm({
        ...form,
        ...report.medicalCertificate,
        date: dayjs(report.medicalCertificate.date),
      });
    }
  }, [report]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth={"lg"} fullWidth={true}>
      <DialogTitle>MEDICAL CERTIFICATE</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} alignItems={`center`} my={2}>
          {userIsDoctor && (
            <>
              <Grid item xs={12}>
                <Box sx={{ width: { xs: "100%", md: "20%" } }}>
                  <SelectDate
                    value={form.date}
                    onChange={(event) => handleChange(event, "date")}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <SelectMedCertPurpose
                  value={form.purpose}
                  onChange={(event) => handleChange(event, "purpose")}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <SelectMedCertType
                  value={form.type}
                  onChange={(event) => handleChange(event, "type")}
                />
              </Grid>
              {form.type === "UNFIT" && (
                <Grid item xs={12} md={6}>
                  <Stack>
                    <TextField
                      value={form.totalRestDays}
                      onChange={(event) => handleChange(event, "totalRestDays")}
                      label="If unfit, indicate no. of required rest days:"
                      variant="outlined"
                    />
                  </Stack>
                </Grid>
              )}
              <Grid item xs={12} md={6}>
                <Stack>
                  <TextField
                    value={form.remarks}
                    onChange={(event) => handleChange(event, "remarks")}
                    label="Additional remarks"
                    variant="outlined"
                    multiline
                  />
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6">PRINT PREVIEW</Typography>
              </Grid>
            </>
          )}
          <Grid item xs={12}>
            <ClinicForm componentRef={componentRef}>
              <MedicalCertificateForm
                certificate={{
                  ...form,
                  date: form.date?.format(DEFAULT_DATE_FORMAT),
                }}
              />
            </ClinicForm>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "space-between" }}>
        <Stack direction={`row`} spacing={1}>
          <Button variant="outlined" onClick={onClose}>
            Close
          </Button>
          <Button
            variant="contained"
            onClick={handlePrint}
            disabled={!report.medicalCertificate}
          >
            Print
          </Button>
        </Stack>
        {userIsDoctor && (
          <Button
            variant="contained"
            onClick={handleSave}
            disabled={isFormInvalid()}
          >
            Save
          </Button>
        )}
      </DialogActions>
      {isSaving && <LoadingScreen open={isSaving} />}
    </Dialog>
  );
}
