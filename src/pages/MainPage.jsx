import React from "react";
import { Box, Button, Typography } from "@mui/material";

export default function MainPage() {
  return (
    <>
      <Box
        sx={{
          height: "100vh",
          backgroundImage: `url('/images/perfiladora.jpg')`, // Puedes cambiar esta imagen por una tuya
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

        {/* Contenido centrado */}
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
      <Button variant="outlined" color="secondary.main">
        Peligro
      </Button>
    </>
  );
}
