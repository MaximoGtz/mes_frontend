import React, { useEffect, useState } from "react";
import { Box, Button, Typography, CircularProgress } from "@mui/material";
import datos from "../testData/insertions";
import InsertionsTable from "../components/InsertionsTable";
import axios from "axios";
import { normalEndpoint } from "../api/endpoints";
export default function MainPage() {
  const [insertions, setInsertions] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // Realizar la consulta a la API al cargar el componente
    const fetchInsertions = async () => {
      try {
        const response = await axios.get(normalEndpoint("api/insertions"));
        setInsertions(response.data.data);
      } catch (error) {
        console.error("Error al obtener las inserciones:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInsertions();
  }, []);
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
      <Box sx={{ padding: 4 }}>
        <Typography
          variant="h3"
          fontWeight={600}
          textAlign={"center"}
          marginBottom={"32px"}
        >
          Todas las inserciónes
        </Typography>
        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "300px",
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <InsertionsTable insertions={insertions} />
        )}
      </Box>
    </>
  );
}
