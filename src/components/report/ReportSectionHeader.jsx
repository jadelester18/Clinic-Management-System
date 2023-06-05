import { Stack, Tooltip, Typography } from "@mui/material";
import React from "react";
import HelpIcon from "@mui/icons-material/Help";

export default function ReportSectionHeader({ title, helpText }) {
  const styles = {
    stack: {
      direction: "row",
      spacing: 1,
      alignItems: "center",
      // width: "100%",
      my: 2,
    },
  };
  return (
    <Stack {...styles.stack}>
      <Typography variant="subtitle1">{title}</Typography>
      {helpText && (
        <Tooltip title={helpText} placement="right">
          <HelpIcon />
        </Tooltip>
      )}
    </Stack>
  );
}
