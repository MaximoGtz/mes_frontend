import React from "react";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Box,
  CircularProgress,
  Typography,
  Button,
} from "@mui/material";

export default function TableInsertionsHours({
  data,
  tableLoading,
  changeTableData,
}) {
  let tableContent;
  if (tableLoading) {
    tableContent = (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  } else if (data.length == 0) {
    tableContent = <Typography>No hay datos</Typography>;
  } else if (data && !tableLoading) {
    tableContent = data.map((row, index) => (
      <TableRow key={index}>
        <TableCell>{row.range}</TableCell>
        <TableCell sx={{ textAlign: "center", fontWeight: 600 }}>
          {row.count}
        </TableCell>
        <TableCell>{row.meters_per_hour}</TableCell>
        <TableCell>
          <TextField
            label="Minutos"
            fullWidth
            color="warning"
            autoComplete="off"
            onChange={(event) => changeTableData(index, event.target.value)}
          ></TextField>
        </TableCell>
        <TableCell>
          <TextField
            fullWidth
            disabled
            autoComplete="off"
            value={row.death_time ? `${row.death_time} minutos` : `0 minutos`}
            color="warning"
          ></TextField>
        </TableCell>
        <TableCell>
          <TextField
            label="Escribe tus razónes"
            fullWidth
            multiline
            autoComplete="off"
            color="warning"
          ></TextField>
        </TableCell>
        <TableCell>
          <Button variant="contained" fullWidth color="warning">
            Guardar
          </Button>
        </TableCell>
      </TableRow>
    ));
  }
  return (
    <Box margin={"0 auto"}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: "chocolate" }}>
            <TableRow>
              <TableCell style={{ color: "white" }}>Hora</TableCell>
              <TableCell style={{ color: "white" }}>Piezas por hora</TableCell>
              <TableCell style={{ color: "white" }}>Metros por hora</TableCell>
              <TableCell style={{ color: "white" }}>Tiempo efectivo</TableCell>
              <TableCell style={{ color: "white" }}>Tiempo muerto</TableCell>
              <TableCell style={{ color: "white" }}>Causa del paro</TableCell>
              <TableCell style={{ color: "white" }}>Acción</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{tableContent}</TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
