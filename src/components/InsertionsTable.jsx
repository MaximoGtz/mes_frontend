import {
  Box,
  Card,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  Paper,
  Button,
} from "@mui/material";
export default function InsertionsTable({ insertions }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Fecha</TableCell>
            <TableCell align="right">Numero de máquina</TableCell>
            <TableCell align="right">Numero de receta</TableCell>
            <TableCell align="right">Longitud del perfil</TableCell>
            <TableCell align="right">Distancia entre agujeros</TableCell>
            <TableCell align="right">Longitud antes del reinicio</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {insertions.map((insertion) => (
            <TableRow
              key={insertion.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {insertion.created_at}
              </TableCell>
              <TableCell align="right">{insertion.machine_number}</TableCell>
              <TableCell align="right">{insertion.recipe_number}</TableCell>
              <TableCell align="right">{insertion.profile_length}</TableCell>
              <TableCell align="right">
                {insertion.distance_between_holes}
              </TableCell>
              <TableCell align="right">
                {insertion.length_before_reset}
              </TableCell>
              <TableCell>
                <Box display={"flex"} justifyContent={"space-between"}>
                  <Button variant="contained" color="success" margin={"10px"}>
                    Ver inserción
                  </Button>
                  <Button variant="contained" color="secondary" margin={"10px"}>
                    Ver máquina
                  </Button>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
