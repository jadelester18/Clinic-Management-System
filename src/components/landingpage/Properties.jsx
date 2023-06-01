import { Box, Container, styled, Typography, useTheme } from "@mui/material";
import React from "react";
import House from "./House";
import { properties } from "./properties/properties";

const Properties = () => {
  //For Theme
  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const main = theme.palette.neutral.main;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;
  const landingPageBg = theme.palette.background.landingPageBg;

  const PropertiesBox = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "space-between",
    marginTop: theme.spacing(5),
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      alignItems: "center",
    },
  }));

  const PropertiesTextBox = styled(Box)(({ theme }) => ({
    [theme.breakpoints.down("md")]: {
      textAlign: "center",
    },
  }));

  return (
    <Box sx={{ mt: 5, backgroundColor: landingPageBg, py: 10 }}>
      <Container>
        <PropertiesTextBox>
          <Typography
            sx={{ color: dark, fontSize: "35px", fontWeight: "bold" }}
          >
            Featured Properties
          </Typography>
          <Typography sx={{ color: main, fontSize: "16px", mt: 1 }}>
            Everything you need to know when looking for a new home!
          </Typography>
        </PropertiesTextBox>

        <PropertiesBox>
          {properties.map((property) => (
            <House
              key={property.id}
              img={property.img}
              price={property.price}
              address={property.address}
              bedrooms={property.bedrooms}
              bathrooms={property.bathrooms}
              space={property.space}
            />
          ))}
        </PropertiesBox>
      </Container>
    </Box>
  );
};

export default Properties;
