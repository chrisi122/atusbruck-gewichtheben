import { createTheme } from "@material-ui/core";

const primaryColor = "#da251d";
const secondaryColor = "#2c2c2c";
const textColor = "#2c2c2c";
const headingColor = "#242325";

let theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 760,
      md: 900,
      lg: 1120,
      xl: 1320,
      responsiveMenu: 1000,
      iPad: 850,
      maxWidth: 1400,
    },
  },
  palette: {
    primary: {
      main: primaryColor,
      mainGradient: `linear-gradient(to right, #da251d, cyan)`,
    },
    secondary: {
      main: secondaryColor,
    },
    text: {
      primary: "#2c2c2c",
    },
  },
  typography: {
    fontFamily: ["Montserrat", "sans-serif"].join(","),
    allVariants: { color: textColor },
    h1: {
      color: headingColor,
      boxSizing: "border-box",
      fontSize: "3rem",
      letterSpacing: "0.125rem",
      textTransform: "uppercase",
      fontWeight: 600,
      width: "fit-content",
      padding: 0,
      borderBottom: "0.25rem solid",
      borderImageSlice: "0 0 100% 0",
      borderImageSource: `radial-gradient(circle at center, ${primaryColor}, transparent)`,
      margin: "2rem auto",
      textAlign: "center",
    },
    h2: {
      fontSize: "2rem",
      borderLeft: `0.25rem solid ${primaryColor}`,
      padding: 0,
      paddingLeft: "0.5rem",
      fontWeight: 600,
      textTransform: "uppercase",
      letterSpacing: "0.075rem",
    },
    h3: {
      fontWeight: 600,
      textTransform: "uppercase",
      fontSize: "1.5rem",
      letterSpacing: "0.125rem",
    },
    h4: {
      fontWeight: 600,
      textTransform: "uppercase",
      fontSize: "1rem",
    },
    body1: {
      textAlign: "justify",
      hyphens: "auto",
      color: "inherit",
    },
    textWhite: {
      color: "green",
      fontSize: "3rem",
    },
    subtitle1: {
      fontSize: "0.8rem",
      fontWeight: 300,
      paddingTop: "0.25rem",
    },
  },
  overrides: {
    MuiPaper: {
      root: {
        overflow: "hidden",
      },
    },
  },
});

theme.overrides = {
  MuiTypography: {
    h1: {
      [theme.breakpoints.down("xs")]: {
        fontSize: "2rem",
      },
    },
    h2: {
      [theme.breakpoints.down("xs")]: {
        fontSize: "1.5rem",
        letterSpacing: 0,
      },
    },
    h3: {
      [theme.breakpoints.down("xs")]: {
        fontSize: "1.25rem",
        letterSpacing: 0,
      },
    },
    body1: {
      [theme.breakpoints.down("xs")]: {
        fontSize: "0.8rem",
      },
    },
  },
};

export default theme;
