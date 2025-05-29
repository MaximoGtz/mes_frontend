// import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
export default function Navbar() {
  const navigate = useNavigate();

  const handleNavigate = (page) => {
    switch (page) {
      case "index":
        navigate("/");
        break;
      case "prod_table":
        navigate("/tabla");
        break;
      case "day_data":
        navigate("/estatus/dia");
        break;
      case "stats":
        navigate("/estadisticas");
        break;

      default:
        navigate("/");
        break;
    }
  };
  return (
    <Box>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Box display={"flex"} justifyContent={"space-between"} width={"100%"}>
            <Box display={"flex"}>
              <Typography variant="h6" color="inherit" component="div">
                I-DEB
              </Typography>
              <Typography
                variant="body2"
                color="inherit"
                component="div"
                textAlign={"center"}
                alignContent={"center"}
                marginLeft={"5px"}
                marginTop={"4px"}
              >
                Soporte y Servicios
              </Typography>
            </Box>
            <Box display={"flex"} width={"60%"} justifyContent={"space-around"}>
              <Button
                variant="contained"
                fullWidth
                sx={{ margin: "0px 10px" }}
                onClick={() => {
                  handleNavigate("index");
                }}
              >
                Inicio
              </Button>
              <Button
                variant="contained"
                fullWidth
                sx={{ margin: "0px 10px" }}
                onClick={() => {
                  handleNavigate("prod_table");
                }}
              >
                Tabla de producción
              </Button>
              <Button
                variant="contained"
                fullWidth
                sx={{ margin: "0px 10px" }}
                onClick={() => {
                  handleNavigate("day_data");
                }}
              >
                Datos del día
              </Button>
              <Button
                variant="contained"
                fullWidth
                sx={{ margin: "0px 10px" }}
                onClick={() => {
                  handleNavigate("stats");
                }}
              >
                Estadísticas
              </Button>
            </Box>
            <Box>
              <Typography sx={{ marginLeft: "auto" }} textAlign={"center"}>
                Monitoreo de Perfiladoras
              </Typography>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
