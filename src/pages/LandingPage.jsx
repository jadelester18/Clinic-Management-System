import { Box, Card, Stack, Typography } from "@mui/material";
import React from "react";
import Hero from "../components/landingpage/Hero";
import Companies from "../components/landingpage/Companies";
import Guide from "../components/landingpage/Guide";
import Properties from "../components/landingpage/Properties";
import Footer from "../components/landingpage/Footer";

const LandingPage = () => {
  return (
    <Box>
      <Hero />
      {/* <Companies /> */}
      <Guide />
      <Properties />
      <Footer />
    </Box>
  );
};

export default LandingPage;
