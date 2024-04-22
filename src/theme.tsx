import { blue } from "@mui/material/colors";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import localFont from "next/font/local";

const lato = localFont({
  src: [
    // Thin
    {
      path: "../public/fonts/Lato-Thin.ttf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../public/fonts/Lato-ThinItalic.ttf",
      weight: "100",
      style: "italic",
    },
    // Light
    {
      path: "../public/fonts/Lato-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/Lato-LightItalic.ttf",
      weight: "300",
      style: "italic",
    },
    // Regular
    {
      path: "../public/fonts/Lato-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Lato-Italic.ttf",
      weight: "400",
      style: "italic",
    },
    // Bold
    {
      path: "../public/fonts/Lato-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/Lato-BoldItalic.ttf",
      weight: "700",
      style: "italic",
    },
    // Black
    {
      path: "../public/fonts/Lato-Black.ttf",
      weight: "900",
      style: "normal",
    },
    {
      path: "../public/fonts/Lato-BlackItalic.ttf",
      weight: "900",
      style: "italic",
    },
  ],
});

const getTheme = () => {
  const palette = {
    background: {
      paper: "#FFFFFF",
      default: "#F2F6EA",
    },
    primary: {
      light: "#dbe8c1",
      dark: "#2a3811",
      main: blue["900"],
    },
    secondary: {
      light: "#FFFFF0",
      main: "#72976F",
    },
    grey: {
      50: "#F3F3F3",
      100: "#E6E6E6",
      200: "#D5D5D5",
      300: "#BCBCBC",
      400: "#939393",
      500: "#707070",
      600: "#4B4B4B",
      700: "#3B3B3B",
      800: "#222222",
      900: "#000000",
    },
  };
  const theme = createTheme({
    palette,
    typography: {
      fontFamily: lato.style.fontFamily,
      h1: {
        fontSize: "3.222rem",
        fontWeight: 900,
        lineHeight: 1.05,
        letterSpacing: "-0.01em",
      },
      h2: {
        fontSize: "2.369rem",
        fontWeight: 900,
        lineHeight: 1.05,
        letterSpacing: "-0.01em",
        color: palette.grey[900],
      },
      h3: {
        fontSize: "1.778rem",
        fontWeight: 900,
        lineHeight: 1.1,
        letterSpacing: "0",
      },
      h4: {
        fontSize: "1.333rem",
        lineHeight: 1.45,
        fontWeight: 700,
        letterSpacing: "0",
      },
      h5: {
        fontSize: "1rem",
        lineHeight: 1.5,
        fontWeight: 700,
        letterSpacing: "0",
      },
      body1: {
        fontSize: "1rem",
        letterSpacing: 0,
        lineHeight: 1.5,
        color: palette.grey[800],
      },
      body2: {
        fontSize: "0.80rem",
        letterSpacing: "-0.01em",
        lineHeight: 1.5,
      },
      button: {
        fontSize: "1rem",
        textTransform: "none",
        letterSpacing: "0.01em",
        lineHeight: 1.5,
      },
    },

    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            scrollbarColor: palette.background.default,
            overflow: "auto",
            "&::-webkit-scrollbar-x, & *::-webkit-scrollbar": {
              width: 15,
              height: 15,
            },
            "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
              borderRadius: 20,
              backgroundColor: palette.background.default,
              border: `3px solid ${palette.grey[100]}`,
            },
            "&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover":
              {
                backgroundColor: palette.secondary.main,
                border: palette.secondary.main,
                width: 20,
                height: 20,
              },
          },
        },
      },

      MuiButton: {
        defaultProps: {
          style: {
            textTransform: "none",
          },
        },
      },
    },
  });
  // ResponsiveFontSizes -> https://mui.com/material-ui/customization/theming/#responsivefontsizes-theme-options-theme
  return responsiveFontSizes(theme);
};

export default getTheme;
