import {
  Grid,
  Typography,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import React from "react";

export default function PatientRecords({ reports }) {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="subtitle2">HISTORY</Typography>
      </Grid>
      <List
        sx={{
          width: "100%",
          bgcolor: "background.paper",
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "16px",
          marginLeft: "15px",
          maxHeight: "25rem",
          flexDirection: "column",
          overflowY: "scroll",
          "&::-webkit-scrollbar": {
            width: "0em",
          },
          padding: 1,
        }}
      >
        {reports.length > 0 &&
          reports.map((report) => (
            <ListItemButton
              key={report.id}
              // component="a"
              // href="#simple-list"
              variant="contained"
              sx={{
                backgroundColor: "#03a9f4",
                boxShadow: 6,
                borderRadius: 3,
              }}
            >
              <ListItemText
                primary={
                  <Typography variant="h6" fontWeight="bold">
                    Main Title
                  </Typography>
                }
                secondary={
                  <Typography variant="subtitle1">Subtitle</Typography>
                }
              />
            </ListItemButton>
          ))}
        {reports.length === 0 && (
          <Typography variant="caption">No history</Typography>
        )}
      </List>
    </Grid>
  );
}
