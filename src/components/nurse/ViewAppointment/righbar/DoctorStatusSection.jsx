import {
  Avatar,
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import DoctorStatusHeader from "./DoctorStatusHeader";
import DoctorStatusRow from "./DoctorStatusRow";

function DoctorStatusSection({ date, statusList, onSelect }) {
  return (
    <Box flex={2} p={2}>
      <Card sx={{ height: 440, borderRadius: 10 }} elevation={3}>
        <CardContent>
          <DoctorStatusHeader statusList={statusList} />
          <List
            sx={{
              width: "100%",
              bgcolor: "background.paper",
              borderRadius: 10,
              height: "20rem",
              display: "flex",
              flexDirection: "column",
              overflowY: "scroll",
              "&::-webkit-scrollbar": {
                width: "0.4em",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#888",
              },
              padding: 2,
            }}
            dense={true}
          >
            {statusList?.length > 0 ? (
              statusList?.map((status) => (
                <DoctorStatusRow
                  date={date}
                  doctorStatus={status}
                  key={status.doctor.id}
                  onSelect={onSelect}
                />
              ))
            ) : (
              <Typography variant="body1">No scheduled doctors</Typography>
            )}
          </List>
        </CardContent>
      </Card>
    </Box>
  );
}

export default DoctorStatusSection;
