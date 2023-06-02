import React, { useContext, useEffect, useState } from "react";
import { Button, Dialog, DialogActions, DialogContent } from "@mui/material";
import Report from "../../../../report/Report";
import { SnackBarContext } from "../../../../../context/SnackBarContext";
import * as reportSvc from "../../../../../redux/GetApiCalls/report";
import LoadingScreen from "../../../../LoadingScreen";

export default function ReportDialog({
  open,
  onClose,
  reportId,
  onSave,
  isSaving,
}) {
  const [report, setReport] = useState(null);
  console.log("reportId", reportId);

  const { onShowSuccess, onShowFail } = useContext(SnackBarContext);

  async function fetchReport() {
    try {
      const { data } = await reportSvc.getReportById(reportId);
      setReport(data);
    } catch (error) {
      console.error(error);
      onShowFail(error.response.data.message);
    }
  }

  useEffect(() => {
    if (reportId) {
      fetchReport();
    }
  }, [reportId]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth={"lg"} fullWidth={true}>
      <DialogContent>
        <Report report={report} onSave={onSave} />
        {isSaving && <LoadingScreen open={isSaving} />}
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={onClose}>
          CLOSE
        </Button>
      </DialogActions>
    </Dialog>
  );
}
