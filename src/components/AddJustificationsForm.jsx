import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  List,
  TextField,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { normalEndpoint } from "../api/endpoints";
// Validación con Yup
const schema = yup.object().shape({
  minutes_off: yup
    .number()
    .required("Los minutos son obligatorios")
    .positive("Debe ser un número positivo")
    .integer("Debe ser un número entero"),
  justification: yup
    .string()
    .required("La justificación es obligatoria")
    .min(5, "La justificación debe tener al menos 5 caracteres"),
});

export default function AddJustificationsForm({ dataJustification, hour }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    console.log("Se presionó el botón ");
    let startHour = hour.substring(0, 2)
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
    } catch (error) {
      console.error("Error al enviar:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <List component="div" disablePadding>
        <ListItem>
          <TextField
            label="Minutos"
            fullWidth
            variant="outlined"
            placeholder="30"
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
  );
}
