import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  MenuItem,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import { normalEndpoint } from "../api/endpoints";
import * as Yup from "yup";
import axios from "axios";
import Grid from "@mui/material/Grid";
const validationSchema = Yup.object().shape({
  profiler_id: Yup.number().required("Selecciona una perfiladora"),
  day: Yup.string().required("Elige un día"),
  pieces_per_hour: Yup.number()
    .typeError("Debe ser un número")
    .integer("Debe ser un número entero")
    .positive("Debe ser mayor a 0")
    .required("Campo requerido"),
  operator_name: Yup.string().required("Nombre del operador requerido"),
  piece_length: Yup.number()
    .typeError("Debe ser un número")
    .positive("Debe ser mayor a 0")
    .required("Campo requerido"),
});

const TableInsertionsHoursForm = ({ fetchTableData }) => {
  const [profilers, setProfilers] = useState([]);
  const [loading, setLoading] = useState(true);

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
      });
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box maxWidth={"xl"} mx="auto" margin={"0 auto"} padding={"20px 0px"}>
      <Typography variant="h4" gutterBottom>
        Formulario de Producción
      </Typography>
      <Formik
        initialValues={{
          profiler_id: "",
          day: "",
          pieces_per_hour: "",
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
                />
              </Grid>
              <Grid size={6}>
                <TextField
                  fullWidth
                  name="pieces_per_hour"
                  label="Piezas por hora deseadas"
                  value={values.pieces_per_hour}
                  onChange={handleChange}
                  error={
                    touched.pieces_per_hour && Boolean(errors.pieces_per_hour)
                  }
                  helperText={touched.pieces_per_hour && errors.pieces_per_hour}
                  margin="normal"
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
                />
              </Grid>
              <Grid size={6}>
                <TextField
                  fullWidth
                  name="piece_length"
                  label="Longitud de la pieza (MILIMETROS)"
                  value={values.piece_length}
                  onChange={handleChange}
                  error={touched.piece_length && Boolean(errors.piece_length)}
                  helperText={touched.piece_length && errors.piece_length}
                  margin="normal"
                />
              </Grid>
              <Grid
                size={6}
                textAlign={"center"}
                alignContent={"center"}
                alignItems={"center"}
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
