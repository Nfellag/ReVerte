import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  fonts: {
    heading: `'Nunito', sans-serif`,
    body: `'Nunito', sans-serif`,
  },
  colors: {
    principal: {
      50: "#E6F0FF",
      100: "#B3D1FF",
      200: "#80B3FF",
      300: "#4D94FF",
      400: "#1A75FF",
      500: "#005FCC",
    },
    chaleur: {
      50: "#FFE6E0",
      100: "#FFB3A3",
      200: "#FF8066",
      300: "#FF4D29",
      400: "#CC2E0A",
      500: "#992108",
    },
  },
  fontSizes: {
    h1: "44px",
    h2: "36px",
    h3: "28px",
    h4: "24px",
    body: "20px",
  },
});

export default theme;