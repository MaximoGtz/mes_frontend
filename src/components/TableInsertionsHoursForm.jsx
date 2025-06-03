import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  MenuItem,
  TextField,
  Typography,
  CircularProgress,
  Paper,
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import { normalEndpoint } from "../api/endpoints";
import * as Yup from "yup";
import axios from "axios";
import Grid from "@mui/material/Grid";
const validationSchema = Yup.object().shape({
  profiler_id: Yup.number().required("Selecciona una perfiladora"),
  day: Yup.string().required("Elige un día"),
  operator_name: Yup.string().required("Nombre del operador requerido"),
  piece_length: Yup.number()
    .typeError("Debe ser un número")
    .positive("Debe ser mayor a 0")
    .required("Campo requerido"),
});

const TableInsertionsHoursForm = ({ fetchTableData }) => {
  const [profilers, setProfilers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    axios
      .get(normalEndpoint("api/profilers"))
      .then((res) => {
        setProfilers(res.data.profilers);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error al obtener perfiladoras:", err);
        setLoading(false);
        setError(true);
      });
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }
  if (error) {
    return (
      <Paper
        sx={{
          backgroundColor: "error.main",
          margin: "30px 0px ",
          padding: "40px",
        }}
      >
        <Typography textAlign={"center"} variant="h3">
          Lo sentimos, algo salió mal :/
        </Typography>
      </Paper>
    );
  }
  return (
    <Box mx="auto" margin={"0 auto"} padding={"20px 0px"}>
      <Typography variant="h4" gutterBottom>
        Formulario de Producción
      </Typography>
      <Formik
        initialValues={{
          profiler_id: "",
          day: "",
          operator_name: "",
          piece_length: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          fetchTableData(values);
        }}
      >
        {({ errors, touched, handleChange, values }) => (
          <Form>
            <Grid container spacing={2}>
              <Grid size={6}>
                <TextField
                  select
                  fullWidth
                  name="profiler_id"
                  label="Perfiladora"
                  value={values.profiler_id}
                  onChange={handleChange}
                  error={touched.profiler_id && Boolean(errors.profiler_id)}
                  helperText={touched.profiler_id && errors.profiler_id}
                  margin="normal"
                  color="warning"
                  autoComplete="off"
                >
                  {profilers.map((profiler) => (
                    <MenuItem key={profiler.id} value={profiler.id}>
                      {profiler.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid size={6}>
                <TextField
                  fullWidth
                  name="day"
                  label="Día"
                  type="date"
                  value={values.day}
                  onChange={handleChange}
                  error={touched.day && Boolean(errors.day)}
                  helperText={touched.day && errors.day}
                  margin="normal"
                  InputLabelProps={{ shrink: true }}
                  color="warning"
                  autoComplete="off"
                />
              </Grid>
              <Grid size={6}>
                <TextField
                  fullWidth
                  name="operator_name"
                  label="Nombre del operador"
                  value={values.operator_name}
                  onChange={handleChange}
                  error={touched.operator_name && Boolean(errors.operator_name)}
                  helperText={touched.operator_name && errors.operator_name}
                  margin="normal"
                  color="warning"
                  autoComplete="off"
                />
              </Grid>
              <Grid size={6}>
                <TextField
                  fullWidth
                  name="piece_length"
                  label="Longitud de la pieza (milímetros)"
                  value={values.piece_length}
                  onChange={handleChange}
                  error={touched.piece_length && Boolean(errors.piece_length)}
                  helperText={touched.piece_length && errors.piece_length}
                  margin="normal"
                  color="warning"
                  autoComplete="off"
                />
              </Grid>
              <Grid
                size={6}
                textAlign={"center"}
                alignContent={"center"}
                alignItems={"center"}
                sx={{ margin: "0 auto" }}
              >
                <Button
                  type="submit"
                  variant="contained"
                  color="success"
                  fullWidth
                  sx={{ margin: "0 auto", padding: "10px", fontSize: "20px" }}
                >
                  Actualizar tabla
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default TableInsertionsHoursForm;
