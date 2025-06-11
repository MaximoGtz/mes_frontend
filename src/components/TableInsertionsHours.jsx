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
  ListItem,
  Divider,
  Grid,
} from "@mui/material";

import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import RestoreIcon from "@mui/icons-material/Restore";
import SendIcon from "@mui/icons-material/Send";
import { useEffect, useState } from "react";

import AddJustificationsForm from "./AddJustificationsForm";
export default function TableInsertionsHours({ data, tableLoading, dataJustification }) {
  let tableContent;
  const [forms, setForms] = useState([]);
  const handleOpenForm = (index) => {
    setForms((prevForms) =>
      prevForms.map((item, i) => (i === index ? !item : item))
    );
  };
  useEffect(() => {
    if (Array.isArray(data)) {
      setForms(data.map(() => false));
    }
  }, [data]);
  if (tableLoading) {
    tableContent = (
      <TableRow>
        <TableCell colSpan={5} align="center">
          <Box display="flex" justifyContent="center" mt={4}>
            <CircularProgress />
          </Box>
        </TableCell>
      </TableRow>
    );
  } else if (!data || data.length === 0) {
    tableContent = (
      <TableRow>
        <TableCell colSpan={5} align="center">
          <Box display="flex" justifyContent="center" mt={4}>
            <Typography variant="h5">No hay datos disponibles</Typography>
          </Box>
        </TableCell>
      </TableRow>
    );
  } else {
    tableContent = data.flatMap((row, index) => [
      <TableRow key={`row-${index}`}>
        <TableCell>{row.range}</TableCell>
        <TableCell sx={{ textAlign: "center", fontWeight: 600 }}>
          <Typography
            variant="body1"
            fontWeight={600}
            color={
              row.status === "positive"
                ? "success.main"
                : row.status === "negative"
                ? "error.main"
                : undefined
            }
          >
            {row.count}
          </Typography>
        </TableCell>
        <TableCell>{row.meters_per_hour}</TableCell>
        <TableCell>
          <Typography>
            {row.worked_time >= 60
              ? `Tiempo completado`
              : `${row.worked_time} minutos`}
          </Typography>
        </TableCell>
        <TableCell>
          <ListItemButton onClick={() => handleOpenForm(index)}>
            <ListItemIcon>
              <RestoreIcon fontSize="large" color="warning" />
            </ListItemIcon>
            <ListItemText primary="Justificaciones" />
            {forms?.[index] ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </TableCell>
      </TableRow>,

      <TableRow key={`collapse-${index}`}>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
          <Collapse in={forms?.[index] ?? false} timeout="auto" unmountOnExit>
            {row.justifications.map((jrow, jindex) => (
              <>
                <Typography variant="body1">
                  Justificación: {jindex + 1}
                </Typography>
                <Grid container spacing={2}>
                  <Grid size={6}>
                    <Typography variant="body1">
                      <span style={{ fontWeight: 600 }}>Trabajador: </span>
                      {jrow.worker}
                    </Typography>
                  </Grid>
                  <Grid size={6}>
                    <Typography variant="body1">
                      <span style={{ fontWeight: 600 }}>Minutos fuera: </span>
                      {jrow.minutes_off}
                    </Typography>
                  </Grid>
                  <Grid size={12}>
                    <Typography variant="body1"><span style={{ fontWeight: 600 }}>Justificacion: </span>{jrow.justification}</Typography>
                    
                    </Grid>
                </Grid>
              </>
            ))}
            <Box>
              <Typography variant="h5">

              Minutos por justificar:{" "}
              {row.worked_time >= 60 ? "0" : `${Math.abs(row.worked_time - 60) - row.justified_minutes}`}
              </Typography>
            </Box>
            <Box margin={1}>
              <AddJustificationsForm key={index} dataJustification={dataJustification} hour={row.range}/>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>,
    ]);
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
              <TableCell style={{ color: "white" }}>
                Tiempo trabajado (estimacion)
              </TableCell>
              <TableCell style={{ color: "white" }}>Acción</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{tableContent}</TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
