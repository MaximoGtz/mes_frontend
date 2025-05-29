import {
  Card,
  CardContent,
  Typography,
  Divider,
  Button,
  Box,
} from "@mui/material";
import React from "react";
export default function Footer() {
  const handleRedirect = () => {
    window.location.href = "https://www.idebmexico.com/";
  };
  return (
    <>
        <Card sx={{ width: "99%", margin: "10px 10px" }}>
          <CardContent>
            <Box display={"flex"}>
              <Typography variant="h5" component="div">
                I-DEB Soporte y Servicios
              </Typography>
              <Button
                variant="contained"
                sx={{ marginLeft: "auto" }}
                onClick={handleRedirect}
              >
                Ir a Página principal
              </Button>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Typography
              variant="body2"
              color="text.secondary"
              textAlign={"center"}
            >
              © 2025 Perfiladoras - Todos los derechos reservados.
            </Typography>
          </CardContent>
        </Card>
    </>
  );
}
