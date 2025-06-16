import React, { useEffect, useState } from "react";
import { Box, Button, Typography, CircularProgress } from "@mui/material";
import datos from "../testData/insertions";
import InsertionsTable from "../components/InsertionsTable";
import axios from "axios";
import { normalEndpoint } from "../api/endpoints";
export default function MainPage() {
  return (
    <>
      <Box
        sx={{
          height: "100vh",
          backgroundImage: `url('/images/perfiladora.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
        }}
      >
        {/* Capa de oscurecimiento */}
        <Box
          sx={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            top: 0,
            left: 0,
            zIndex: 1,
          }}
        />

        <Typography
          variant="h2"
          sx={{
            zIndex: 2,
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          Bienvenido
        </Typography>
      </Box>
      
    </>
  );
}
