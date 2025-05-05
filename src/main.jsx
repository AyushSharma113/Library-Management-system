import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material";
import LandingPage from "./pages/LandingPage.jsx";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </StrictMode>
);
