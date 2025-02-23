import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "Nunito, Poppins, sans-serif",
    h1: {
      fontFamily: "Poppins, sans-serif",
      fontWeight: 700,
    },
    h2: {
      fontFamily: "Poppins, sans-serif",
      fontWeight: 600,
    },
    h3: {
      fontFamily: "Poppins, sans-serif",
      fontWeight: 500,
    },
    body1: {
      fontFamily: "Nunito, sans-serif",
      fontSize: "1rem",
      fontWeight: 400,
    },
    body2: {
      fontFamily: "Nunito, sans-serif",
      fontSize: "0.875rem",
    },
    subtitle1: {
      fontFamily: "Nunito, sans-serif",
      fontSize: "1rem",
      fontWeight: 400,
    },
    subtitle2: {
      fontFamily: "Nunito, sans-serif",
      fontSize: "0.8rem",
      fontWeight: 400,
    },
  },
  palette: {
    primary: {
      main: "#B4CD6B", // Green
    },
    secondary: {
      main: "#0077B6", // Blue
    },
    background: {
      default: "#E3F2FD", // Light Blue
    },
    text: {
      primary: "#333333", // Dark Gray
      secondary: "#555555", // Muted Gray
    },
  },
  shape: {
    borderRadius: 12, // Rounded corners for buttons, cards
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none", // Disable uppercase text
          borderRadius: "12px",
          fontWeight: "600",
          padding: "10px 20px",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        },
      },
    },
  },
});

export default theme;
