import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { normalEndpoint } from "../api/endpoints";
import { Box, CircularProgress, Typography } from "@mui/material";
import InsertionsTable from "../components/InsertionsTable";
export default function TablePage() {
  const [loading, setLoading] = useState(true);
  const [insertions, setInsertions] = useState([]);
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
      <Box sx={{ padding: 4 }}>
        <Typography
          variant="h3"
          fontWeight={600}
          textAlign={"center"}
          marginBottom={"32px"}
        >
          Todas las inserciónes
        </Typography>
      </Box>
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
    </>
  );
}
