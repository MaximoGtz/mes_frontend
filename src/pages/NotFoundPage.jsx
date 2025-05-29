import React from "react";
import { Typography, Box, Container, Button } from "@mui/material";
export default function NotFoundPage() {
  return (
    <>
      <Box
        sx={{
          flex: 1,
          height: "100%",
          width: "100%",
          display: "flex",
          justifyContent: "center", // centra horizontalmente
          alignItems: "center", // centra verticalmente
          flexDirection: "column",
        }}
      >
        <Typography variant="h1" textAlign="center" fontWeight={600}>
          Error 404
        </Typography>
        <Typography variant="h3" textAlign="center">
          Página no encontrada
        </Typography>
      </Box>
    </>
  );
}
