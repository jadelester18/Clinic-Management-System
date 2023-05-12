import React from "react";
import NurseLeftBar from "../../components/nurse/leftbar/NurseLeftBar";
import NurseRightBar from "../../components/nurse/righbar/NurseRightBar";
import { Box, Stack } from "@mui/material";

function NurseHome() {
  return (
    <Box>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-evenly"
        sx={{
          marginLeft: { xs: "0%", sm: "0px", md: "10%" },
          marginRight: { xs: "0%", sm: "0px", md: "10%" },
          spacing: { xs: 0, sm: 0, md: 2 },
        }}
        alignItems="center"
      >
        <NurseLeftBar />
        <NurseRightBar />
      </Stack>
    </Box>
  );
}

export default NurseHome;
