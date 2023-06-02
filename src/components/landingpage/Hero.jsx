import { Box, Container, Typography, styled, useTheme } from "@mui/material";
import React from "react";
import Navbar from "./Navbar";
import CustomButton from "./CustomButton";

const Hero = () => {
  //For Theme
  const theme = useTheme();
  const primaryLight = theme.palette.primary.light;
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const main = theme.palette.neutral.main;
  const background = theme.palette.background.default;
  const alt = theme.palette.background.alt;
  const landingPageBg = theme.palette.background.landingPageBg;

  const CustomBox = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    gap: theme.spacing(5),
    // marginTop: theme.spacing(3),
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
    },
  }));

  const Title = styled(Typography)(({ theme }) => ({
    fontSize: "64px",
    color: dark,
    fontWeight: "bold",
    margin: theme.spacing(4, 0, 4, 0),
    [theme.breakpoints.down("sm")]: {
      fontSize: "40px",
    },
  }));

  return (
    <Box sx={{ backgroundColor: landingPageBg, minHeight: "80vh" }}>
      <Container>
        {/* <Navbar /> */}
        <CustomBox>
          <Box sx={{ flex: "1" }}>
            <Typography
              variant="body2"
              sx={{
                fontSize: "18px",
                color: main,
                fontWeight: "500",
                mt: 10,
                mb: 4,
              }}
            >
              Welcome to Grand Budapest Clinic
            </Typography>
            <Title variant="h1">
              Healing Lives, Restoring Hope: Your Path to Wellness.
            </Title>
            <Typography
              variant="body2"
              sx={{ fontSize: "18px", color: main, my: 4 }}
            >
              Transforming healthcare through compassionate expertise,
              cutting-edge innovation, and a commitment to your well-being.
            </Typography>
            <CustomButton
              backgroundColor="#0F184C"
              color="#fff"
              buttonText="More About Us"
              heroBtn={true}
            />
          </Box>
          <Box sx={{ flex: "1.25" }}>
            <Box sx={{ maxWidth: "100%", marginBottom: "2rem" }}>
              {/* <img src="" alt="Time Line Image" style={{maxWidth: '100%', marginBottom: '2rem'}}/> */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                enableBackground="new 0 0 66 66"
                viewBox="0 0 66 66"
                id="hospital-indemnity"
              >
                <path
                  fill="#241c70"
                  d="M63.61,61.97H2.39c-0.4,0-0.72-0.32-0.72-0.72s0.32-0.72,0.72-0.72h61.23c0.4,0,0.72,0.32,0.72,0.72S64.01,61.97,63.61,61.97z"
                ></path>
                <rect
                  width="55.34"
                  height="37.18"
                  x="5.33"
                  y="24.07"
                  fill="#fff"
                ></rect>
                <path
                  fill="#241c70"
                  d="M60.67,61.97H5.33c-0.4,0-0.72-0.32-0.72-0.72V24.07c0-0.4,0.32-0.72,0.72-0.72h55.34c0.4,0,0.72,0.32,0.72,0.72v37.18C61.39,61.65,61.07,61.97,60.67,61.97z M6.05,60.54h53.91V24.79H6.05V60.54z"
                ></path>
                <rect
                  width="62.56"
                  height="4.83"
                  x="1.72"
                  y="19.25"
                  fill="#7cedcb"
                ></rect>
                <rect
                  width="62.57"
                  height="1.63"
                  x="1.72"
                  y="19.25"
                  fill="#fff"
                  opacity=".4"
                ></rect>
                <path
                  fill="#241c70"
                  d="M64.28,24.79H1.72c-0.4,0-0.72-0.32-0.72-0.72v-4.83c0-0.4,0.32-0.72,0.72-0.72h62.56c0.4,0,0.72,0.32,0.72,0.72v4.83C65,24.47,64.68,24.79,64.28,24.79z M2.44,23.36h61.13v-3.39H2.44V23.36z"
                ></path>
                <rect
                  width="34.74"
                  height="4.83"
                  x="15.63"
                  y="4.74"
                  fill="#7cedcb"
                ></rect>
                <polygon
                  fill="#fff"
                  points="50.37 4.74 50.37 6.68 17.53 6.68 17.53 9.57 15.63 9.57 15.63 4.74"
                  opacity=".4"
                ></polygon>
                <path
                  fill="#241c70"
                  d="M50.37,10.29H15.63c-0.4,0-0.72-0.32-0.72-0.72V4.74c0-0.4,0.32-0.72,0.72-0.72h34.74c0.4,0,0.72,0.32,0.72,0.72v4.83C51.09,9.97,50.76,10.29,50.37,10.29z M16.35,8.85h33.3V5.46h-33.3V8.85z"
                ></path>
                <rect
                  width="28.96"
                  height="51.68"
                  x="18.52"
                  y="9.57"
                  fill="#fff"
                ></rect>
                <path
                  fill="#241c70"
                  d="M47.48,61.97H18.52c-0.4,0-0.72-0.32-0.72-0.72V9.57c0-0.4,0.32-0.72,0.72-0.72h28.96c0.4,0,0.72,0.32,0.72,0.72v51.68C48.2,61.65,47.87,61.97,47.48,61.97z M19.24,60.54h27.52V10.29H19.24V60.54z"
                ></path>
                <rect
                  width="5.75"
                  height="5.75"
                  x="8.79"
                  y="28.1"
                  fill="#7cedcb"
                ></rect>
                <rect
                  width="5.75"
                  height="5.75"
                  x="8.79"
                  y="38.15"
                  fill="#7cedcb"
                ></rect>
                <rect
                  width="5.75"
                  height="5.75"
                  x="8.79"
                  y="48.19"
                  fill="#7cedcb"
                ></rect>
                <g opacity=".4">
                  <polygon
                    fill="#fff"
                    points="14.54 28.1 14.54 30.26 10.8 30.26 10.8 33.85 8.79 33.85 8.79 28.1"
                  ></polygon>
                  <polygon
                    fill="#fff"
                    points="14.54 38.15 14.54 40.3 10.8 40.3 10.8 43.89 8.79 43.89 8.79 38.15"
                  ></polygon>
                  <polygon
                    fill="#fff"
                    points="14.54 48.19 14.54 50.35 10.8 50.35 10.8 53.93 8.79 53.93 8.79 48.19"
                  ></polygon>
                </g>
                <rect
                  width="5.75"
                  height="5.75"
                  x="51.46"
                  y="28.1"
                  fill="#7cedcb"
                ></rect>
                <rect
                  width="5.75"
                  height="5.75"
                  x="51.46"
                  y="38.15"
                  fill="#7cedcb"
                ></rect>
                <rect
                  width="5.75"
                  height="5.75"
                  x="51.46"
                  y="48.19"
                  fill="#7cedcb"
                ></rect>
                <polygon
                  fill="#fff"
                  points="57.21 28.1 57.21 30.26 53.48 30.26 53.48 33.85 51.47 33.85 51.47 28.1"
                  opacity=".4"
                ></polygon>
                <polygon
                  fill="#fff"
                  points="57.21 38.15 57.21 40.3 53.48 40.3 53.48 43.89 51.47 43.89 51.47 38.15"
                  opacity=".4"
                ></polygon>
                <polygon
                  fill="#fff"
                  points="57.21 48.19 57.21 50.35 53.48 50.35 53.48 53.93 51.47 53.93 51.47 48.19"
                  opacity=".4"
                ></polygon>
                <path
                  fill="#241c70"
                  d="M14.54 34.57H8.79c-.4 0-.72-.32-.72-.72V28.1c0-.4.32-.72.72-.72h5.75c.4 0 .72.32.72.72v5.75C15.25 34.25 14.93 34.57 14.54 34.57zM9.51 33.13h4.31v-4.31H9.51V33.13zM14.54 44.61H8.79c-.4 0-.72-.32-.72-.72v-5.75c0-.4.32-.72.72-.72h5.75c.4 0 .72.32.72.72v5.75C15.25 44.29 14.93 44.61 14.54 44.61zM9.51 43.17h4.31v-4.31H9.51V43.17zM14.54 54.65H8.79c-.4 0-.72-.32-.72-.72v-5.75c0-.4.32-.72.72-.72h5.75c.4 0 .72.32.72.72v5.75C15.25 54.33 14.93 54.65 14.54 54.65zM9.51 53.22h4.31v-4.31H9.51V53.22zM57.21 34.57h-5.75c-.4 0-.72-.32-.72-.72V28.1c0-.4.32-.72.72-.72h5.75c.4 0 .72.32.72.72v5.75C57.93 34.25 57.61 34.57 57.21 34.57zM52.18 33.13h4.31v-4.31h-4.31V33.13zM57.21 44.61h-5.75c-.4 0-.72-.32-.72-.72v-5.75c0-.4.32-.72.72-.72h5.75c.4 0 .72.32.72.72v5.75C57.93 44.29 57.61 44.61 57.21 44.61zM52.18 43.17h4.31v-4.31h-4.31V43.17zM57.21 54.65h-5.75c-.4 0-.72-.32-.72-.72v-5.75c0-.4.32-.72.72-.72h5.75c.4 0 .72.32.72.72v5.75C57.93 54.33 57.61 54.65 57.21 54.65zM52.18 53.22h4.31v-4.31h-4.31V53.22z"
                ></path>
                <rect
                  width="28.96"
                  height="51.68"
                  x="18.52"
                  y="9.57"
                  fill="#fff"
                ></rect>
                <path
                  fill="#241c70"
                  d="M47.48,61.97H18.52c-0.4,0-0.72-0.32-0.72-0.72V9.57c0-0.4,0.32-0.72,0.72-0.72h28.96c0.4,0,0.72,0.32,0.72,0.72v51.68C48.2,61.65,47.87,61.97,47.48,61.97z M19.24,60.54h27.52V10.29H19.24V60.54z"
                ></path>
                <rect
                  width="5.33"
                  height="5.33"
                  x="21.92"
                  y="12.51"
                  fill="#7cedcb"
                ></rect>
                <rect
                  width="5.33"
                  height="5.33"
                  x="30.34"
                  y="12.51"
                  fill="#7cedcb"
                ></rect>
                <rect
                  width="5.33"
                  height="5.33"
                  x="38.75"
                  y="12.51"
                  fill="#7cedcb"
                ></rect>
                <rect
                  width="5.33"
                  height="5.33"
                  x="21.92"
                  y="21.41"
                  fill="#7cedcb"
                ></rect>
                <rect
                  width="5.33"
                  height="5.33"
                  x="30.34"
                  y="21.41"
                  fill="#7cedcb"
                ></rect>
                <rect
                  width="5.33"
                  height="5.33"
                  x="38.75"
                  y="21.41"
                  fill="#7cedcb"
                ></rect>
                <rect
                  width="5.33"
                  height="5.33"
                  x="21.92"
                  y="30.31"
                  fill="#7cedcb"
                ></rect>
                <rect
                  width="5.33"
                  height="5.33"
                  x="30.34"
                  y="30.31"
                  fill="#7cedcb"
                ></rect>
                <rect
                  width="5.33"
                  height="5.33"
                  x="38.75"
                  y="30.31"
                  fill="#7cedcb"
                ></rect>
                <g opacity=".4">
                  <polygon
                    fill="#fff"
                    points="27.24 12.51 27.24 14.02 23.47 14.02 23.47 17.84 21.92 17.84 21.92 12.51"
                  ></polygon>
                  <polygon
                    fill="#fff"
                    points="35.66 12.51 35.66 14.02 31.89 14.02 31.89 17.84 30.33 17.84 30.33 12.51"
                  ></polygon>
                  <polygon
                    fill="#fff"
                    points="44.07 12.51 44.07 14.02 40.3 14.02 40.3 17.84 38.75 17.84 38.75 12.51"
                  ></polygon>
                </g>
                <g opacity=".4">
                  <polygon
                    fill="#fff"
                    points="27.24 21.41 27.24 22.92 23.47 22.92 23.47 26.74 21.92 26.74 21.92 21.41"
                  ></polygon>
                  <polygon
                    fill="#fff"
                    points="35.66 21.41 35.66 22.92 31.89 22.92 31.89 26.74 30.33 26.74 30.33 21.41"
                  ></polygon>
                  <polygon
                    fill="#fff"
                    points="44.07 21.41 44.07 22.92 40.3 22.92 40.3 26.74 38.75 26.74 38.75 21.41"
                  ></polygon>
                </g>
                <rect
                  width="5.32"
                  height="5.33"
                  x="21.92"
                  y="30.3"
                  fill="#fff"
                  opacity=".4"
                ></rect>
                <polygon
                  fill="#fff"
                  points="35.66 30.3 35.66 31.82 31.89 31.82 31.89 35.63 30.33 35.63 30.33 30.3"
                  opacity=".4"
                ></polygon>
                <polygon
                  fill="#fff"
                  points="44.07 30.3 44.07 31.82 40.3 31.82 40.3 35.63 38.75 35.63 38.75 30.3"
                  opacity=".4"
                ></polygon>
                <rect
                  width="3.77"
                  height="3.82"
                  x="23.47"
                  y="31.82"
                  fill="#7cedcb"
                ></rect>
                <path
                  fill="#241c70"
                  d="M27.25 18.56h-5.33c-.4 0-.72-.32-.72-.72v-5.33c0-.4.32-.72.72-.72h5.33c.4 0 .72.32.72.72v5.33C27.96 18.24 27.64 18.56 27.25 18.56zM22.64 17.12h3.89v-3.89h-3.89V17.12zM35.66 18.56h-5.33c-.4 0-.72-.32-.72-.72v-5.33c0-.4.32-.72.72-.72h5.33c.4 0 .72.32.72.72v5.33C36.38 18.24 36.06 18.56 35.66 18.56zM31.05 17.12h3.89v-3.89h-3.89V17.12zM44.08 18.56h-5.32c-.4 0-.72-.32-.72-.72v-5.33c0-.4.32-.72.72-.72h5.32c.4 0 .72.32.72.72v5.33C44.79 18.24 44.47 18.56 44.08 18.56zM39.47 17.12h3.89v-3.89h-3.89V17.12zM27.25 27.45h-5.33c-.4 0-.72-.32-.72-.72v-5.33c0-.4.32-.72.72-.72h5.33c.4 0 .72.32.72.72v5.33C27.96 27.13 27.64 27.45 27.25 27.45zM22.64 26.02h3.89v-3.89h-3.89V26.02zM35.66 27.45h-5.33c-.4 0-.72-.32-.72-.72v-5.33c0-.4.32-.72.72-.72h5.33c.4 0 .72.32.72.72v5.33C36.38 27.13 36.06 27.45 35.66 27.45zM31.05 26.02h3.89v-3.89h-3.89V26.02zM44.08 27.45h-5.32c-.4 0-.72-.32-.72-.72v-5.33c0-.4.32-.72.72-.72h5.32c.4 0 .72.32.72.72v5.33C44.79 27.13 44.47 27.45 44.08 27.45zM39.47 26.02h3.89v-3.89h-3.89V26.02zM27.25 36.35h-5.33c-.4 0-.72-.32-.72-.72v-5.33c0-.4.32-.72.72-.72h5.33c.4 0 .72.32.72.72v5.33C27.96 36.03 27.64 36.35 27.25 36.35zM22.64 34.91h3.89v-3.89h-3.89V34.91zM35.66 36.35h-5.33c-.4 0-.72-.32-.72-.72v-5.33c0-.4.32-.72.72-.72h5.33c.4 0 .72.32.72.72v5.33C36.38 36.03 36.06 36.35 35.66 36.35zM31.05 34.91h3.89v-3.89h-3.89V34.91zM44.08 36.35h-5.32c-.4 0-.72-.32-.72-.72v-5.33c0-.4.32-.72.72-.72h5.32c.4 0 .72.32.72.72v5.33C44.79 36.03 44.47 36.35 44.08 36.35zM39.47 34.91h3.89v-3.89h-3.89V34.91z"
                ></path>
                <rect
                  width="12.36"
                  height="16.48"
                  x="26.82"
                  y="44.77"
                  fill="#7cedcb"
                ></rect>
                <polygon
                  fill="#fff"
                  points="39.17 44.77 39.17 47.08 29.05 47.08 29.05 61.25 26.82 61.25 26.82 44.77"
                  opacity=".4"
                ></polygon>
                <path
                  fill="#241c70"
                  d="M39.18,61.97H26.82c-0.4,0-0.72-0.32-0.72-0.72V44.77c0-0.4,0.32-0.72,0.72-0.72h12.36c0.4,0,0.72,0.32,0.72,0.72v16.49C39.9,61.65,39.57,61.97,39.18,61.97z M27.54,60.54h10.92V45.49H27.54V60.54z"
                ></path>
                <rect
                  width="15.72"
                  height="3.75"
                  x="25.14"
                  y="41.02"
                  fill="#7cedcb"
                ></rect>
                <polygon
                  fill="#fff"
                  points="40.86 41.02 40.86 42.44 26.82 42.44 26.82 44.77 25.14 44.77 25.14 41.02"
                  opacity=".4"
                ></polygon>
                <path
                  fill="#241c70"
                  d="M40.86 45.49H25.14c-.4 0-.72-.32-.72-.72v-3.75c0-.4.32-.72.72-.72h15.72c.4 0 .72.32.72.72v3.75C41.57 45.16 41.25 45.49 40.86 45.49zM25.86 44.05h14.28v-2.31H25.86V44.05zM35.88 52.07v1.16c0 .19-.16.35-.35.35h-1.78v1.78c0 .19-.16.35-.35.35h-1.16c-.19 0-.35-.16-.35-.35v-1.78h-1.78c-.19 0-.35-.16-.35-.35v-1.16c0-.19.16-.35.35-.35h1.78v-1.78c0-.19.16-.35.35-.35h1.16c.19 0 .35.16.35.35v1.78h1.78C35.73 51.72 35.88 51.88 35.88 52.07z"
                ></path>
              </svg>
            </Box>
          </Box>
        </CustomBox>
      </Container>
    </Box>
  );
};

export default Hero;
