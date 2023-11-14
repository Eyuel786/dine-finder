import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#0070f4",
    },
    secondary: {
      main: "#f48200",
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableRipple: true,
      },
      styleOverrides: {
        root: {
          letterSpacing: "1px",
        },
      },
    },
    MuiIconButton: {
      defaultProps: {
        disableRipple: true,
      },
    },
  },
  typography: {
    fontFamily: ["Inter", "sans-serif"].join(","),
    allVariants: {
      textTransform: "none",
    },
  },
});

export default theme;
