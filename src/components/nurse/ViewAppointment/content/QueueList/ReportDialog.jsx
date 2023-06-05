import React, { useContext, useEffect, useState } from "react";
import { Button, Dialog, DialogActions, DialogContent } from "@mui/material";
import Report from "../../../../report/Report";
import { SnackBarContext } from "../../../../../context/SnackBarContext";
import * as reportSvc from "../../../../../redux/GetApiCalls/report";
import LoadingScreen from "../../../../LoadingScreen";
import MedicalCertificateDialog from "../../../../report/MedicalCertificateDialog";

export default function ReportDialog({
  open,
  onClose,
  reportId,
  onSave,
  isSaving,
}) {
  const [report, setReport] = useState(null);

  const { onShowSuccess, onShowFail } = useContext(SnackBarContext);

  const [mcIsOpen, setMcIsOpen] = useState(false);

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
        {report && (
          <Report
            report={report}
            onSave={onSave}
            onViewMc={() => setMcIsOpen(true)}
          />
        )}
        {isSaving && <LoadingScreen open={isSaving} />}
        {report && mcIsOpen && (
          <MedicalCertificateDialog
            open={mcIsOpen}
            onClose={() => setMcIsOpen(false)}
            report={report}
          />
        )}
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={onClose}>
          CLOSE
        </Button>
      </DialogActions>
    </Dialog>
  );
}
