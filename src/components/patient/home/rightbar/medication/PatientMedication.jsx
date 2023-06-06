import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Collapse,
  Divider,
  IconButton,
  Paper,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Tooltip,
  Typography,
  styled,
} from "@mui/material";
import React, { useRef } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { green } from "@mui/material/colors";
import MedicationLiquidIcon from "@mui/icons-material/MedicationLiquid";
import { Prescription } from "../../../../general/Prescription";
import PrintIcon from "@mui/icons-material/Print";
import { useReactToPrint } from "react-to-print";
import ClinicForm from "../../../../general/ClinicForm";
import PrescriptionForm from "../../../../general/PrescriptionForm";

const PatientMedication = ({ report }) => {
  const hasPrescriptions = report?.details?.prescriptions.length > 0;
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    pageStyle: "@page {size: 10in 13in}",
    content: () => componentRef.current,
    documentTitle: "Prescription.pdf",
  });
  return (
    <>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: green[500] }} aria-label="recipe">
            <MedicationLiquidIcon />
          </Avatar>
        }
        subheader={<Typography variant="h6">Prescription</Typography>}
        action={
          <Tooltip title="Print prescription">
            <IconButton
              color="primary"
              disabled={!hasPrescriptions}
              onClick={handlePrint}
            >
              <PrintIcon />
            </IconButton>
          </Tooltip>
        }
      />
      <Divider variant="middle" />
      <CardContent>
        <Box sx={{ maxWidth: 400 }}>
          {report && hasPrescriptions ? (
            report.details?.prescriptions.map((prescription) => (
              <>
                <Prescription
                  key={prescription.id}
                  prescription={prescription}
                />
                <Divider variant="middle" />
              </>
            ))
          ) : (
            <Box>
              <Typography variant="body1">
                No prescriptions at this time
              </Typography>
            </Box>
          )}
        </Box>
      </CardContent>
      <Box display={`none`}>
        <ClinicForm componentRef={componentRef}>
          {report && <PrescriptionForm report={report} />}
        </ClinicForm>
      </Box>
    </>
  );
};

export default PatientMedication;
