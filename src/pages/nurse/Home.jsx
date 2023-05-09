import React from "react";
import LeftBar from "../../components/nurse/leftbar/LeftBar";
import RightBar from "../../components/nurse/righbar/RightBar";
import Navbar from "../../components/navbar/Navbar";
import { Box, Stack } from "@mui/material";

function Home() {
  return (
    <Box>
      <Navbar />
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
        <LeftBar />
        <RightBar />
      </Stack>
    </Box>
  );
}

export default Home;
