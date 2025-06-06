import MainLayout from "./layout/MainLayout";
import MainPage from "./pages/MainPage";
import NotFoundPage from "./pages/NotFoundPage";
import InsertionsDay from "./pages/InsertionsDay";
import StatsPage from "./pages/StatsPage";
import TablePage from "./pages/TablePage";
import { Container, Typography, Box } from "@mui/material";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<MainPage />} />
          <Route path="estatus/dia" element={<InsertionsDay />} />
          <Route path="tabla" element={<TablePage />} />
          <Route path="estatus/dia" element={<InsertionsDay />} />
          <Route path="estadisticas" element={<StatsPage />} />
          {/* <Route path="contact" element={<Contact />} /> */}
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
