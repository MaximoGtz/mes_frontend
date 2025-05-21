import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";
import MainPage from "./pages/MainPage";
import { Container, Typography, Box } from "@mui/material";
function App() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Navbar />

      <Box sx={{ marginBottom: "auto" }}>
        <MainPage />
      </Box>

      <Footer />
    </Box>
  );
}

export default App;
