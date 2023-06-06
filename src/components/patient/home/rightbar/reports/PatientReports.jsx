import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  styled,
} from "@mui/material";
import React from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FlagCircleIcon from "@mui/icons-material/FlagCircle";
import SummarizeIcon from "@mui/icons-material/Summarize";
import { orange } from "@mui/material/colors";
import dayjs from "dayjs";

const PatientReports = ({ reports, onView }) => {
  const styles = {
    list: {
      // display: "flex",
      // flexDirection: "column",
      height: "35rem",
      overflowY: "scroll",
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
      <Card sx={{ maxWidth: { md: 400 }, borderRadius: 10, boxShadow: 10 }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: orange[500] }}>
              <SummarizeIcon />
            </Avatar>
          }
          subheader={<Typography variant="h6">My Reports</Typography>}
        />
        <CardContent>
          <List sx={styles.list}>
            {reports.length > 0 ? (
              reports.map((report) => (
                <ReportRow key={report.id} report={report} onView={onView} />
              ))
            ) : (
              <Box textAlign={`center`}>
                <Typography variant="body1">No reports to show</Typography>
              </Box>
            )}
          </List>
        </CardContent>
      </Card>
      {/* {isMedCertOpen && (
        <MedicalCertificateDialog
          open={isMedCertOpen}
          onClose={() => setReportForMc(null)}
          report={reportForMc}
          onSave={handleAddMc}
          isSaving={isLoading}
        />
      )} */}
    </>
  );
};

export default PatientReports;

const ReportRow = ({ report, onView }) => {
  const { details, queue } = report;

  const patientIsAssessed = !!details?.chiefComplaint;
  const patientIsExamined = !!details?.diagnosis && !!details?.prognosis;

  return (
    <>
      <Divider variant="middle" />
      <ListItemButton
        onClick={() => onView(report)}
        sx={{ justifyContent: "space-between" }}
      >
        <ListItemIcon>
          <FlagCircleIcon />
        </ListItemIcon>
        <ListItemText
          primary={
            patientIsAssessed
              ? `"${details.chiefComplaint}"`
              : "Not yet assessed"
          }
          secondary={
            patientIsExamined
              ? `Dx. "${details.diagnosis}"`
              : "Not yet examined"
          }
        />
        <ListItemText
          // edge="end"
          primary={dayjs(queue.date).format("MMM DD")}
          sx={{ textAlign: "right" }}
        />
      </ListItemButton>
    </>
  );
};
