import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  cssVarPrefix: "mui", // Opcional, si quieres usar variables CSS personalizadas
  cssVariables: true,
  palette: {
    mode: "dark",
    background: {
      default: "#121212", // negro industrial
      paper: "#1e1e1e", // gris oscuro para tarjetas y elementos elevados
    },
    primary: {
      main: "#424242", // gris medio para encabezados y componentes principales
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#757575", // gris claro para detalles
      contrastText: "#ffffff",
    },
    error: {
      main: "#d32f2f", // rojo apagado, más industrial
    },
    warning: {
      main: "#f9a825", // amarillo mostaza
    },
    info: {
      main: "#0288d1", // azul acero
    },
    success: {
      main: "#388e3c", // verde apagado, más sobrio
    },
    text: {
      primary: "#e0e0e0", // gris muy claro para contraste
      secondary: "#bdbdbd",
      disabled: "#757575",
    },
    divider: "#616161",
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: 14,
    button: {
      textTransform: "none",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 6,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
  },
});

export default theme;
