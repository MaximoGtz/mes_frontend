import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  List,
  TextField,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { set, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { normalEndpoint } from "../api/endpoints";
import Alert from "@mui/material/Alert";
import { useState } from "react";
// Validación con Yup
const schema = (total_minutes) =>
  yup.object().shape({
    minutes_off: yup
      .number()
      .required("Los minutos son obligatorios")
      .positive("Debe ser un número positivo")
      .integer("Debe ser un número entero")
      .max(
        60 - total_minutes,
        `Solo puedes justificar hasta ${60 - total_minutes} minutos`
      ),
    justification: yup
      .string()
      .required("La justificación es obligatoria")
      .min(5, "La justificación debe tener al menos 5 caracteres"),
  });

export default function AddJustificationsForm({
  dataJustification,
  hour,
  total_minutes,
  fetchTableData,
  savedFormData,
}) {
  const [alert, setAlert] = useState(<></>);
  const handleAlert = (error_type) => {
    switch (error_type) {
      case "no_more_justifications":
        setAlert(
          <Alert severity="error">No hay minutos para justificar</Alert>
        );

        break;

      default:
        break;
    }
    setTimeout(() => {
      setAlert(<></>);
    }, 2000);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema(total_minutes)),
  });

  const onSubmit = async (data) => {
    console.log("Minutos Justificados: ", total_minutes);
    if (total_minutes >= 60) {
      handleAlert("no_more_justifications");
      return;
    }
    let startHour = hour.substring(0, 2);
    // console.log(dataJustification.day);
    const datetime = `${dataJustification.day}T${startHour}:00:00`;
    console.log(datetime);
    const payload = {
      ...data,
      worker: dataJustification.worker,
      profiler_id: dataJustification.profiler_id,
      date_justified: datetime,
    };
    console.log(payload);
    try {
      const response = await axios.post(
        normalEndpoint("api/agregar_justificacion"),
        payload
      );
      console.log("Enviado con éxito:", response.data);
      reset(); // Limpia el formulario
      fetchTableData(savedFormData);
    } catch (error) {
      console.error("Error al enviar:", error);
    }
  };

  return (
    <>
      {alert}
      <form onSubmit={handleSubmit(onSubmit)}>
        <List component="div" disablePadding>
          <ListItem>
            <TextField
              label="Minutos"
              fullWidth
              variant="outlined"
              placeholder={`Máx: ${60 - total_minutes}`}
              error={!!errors.minutes_off}
              helperText={errors.minutes_off?.message}
              {...register("minutes_off")}
            />
          </ListItem>

          <ListItem>
            <TextField
              label="Justificación"
              fullWidth
              multiline
              rows={3}
              variant="outlined"
              placeholder="Aquí tu justificación"
              error={!!errors.justification}
              helperText={errors.justification?.message}
              {...register("justification")}
            />
          </ListItem>

          <ListItem>
            <button type="submit" style={{ all: "unset", width: "100%" }}>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <SendIcon />
                </ListItemIcon>
                <ListItemText primary="Enviar" />
              </ListItemButton>
            </button>
          </ListItem>
        </List>
      </form>
    </>
  );
}
