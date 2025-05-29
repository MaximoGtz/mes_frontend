import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
export default function MainLayout() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Navbar />

      <Box
        sx={{
          flex: 1,
          width: "100%",
          display: "flex", // muy importante si quieres que el contenido se expanda
          flexDirection: "column",
        }}
      >
        <Outlet />
      </Box>

      <Footer />
    </Box>
  );
}
