// import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useMediaQuery, useTheme } from "@mui/material";
import { Button } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
export default function Navbar({ toggleDrawer, handleNavigate }) {
  
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg")); // true si lg o mayor
  
  return (
    <Box>
      <AppBar position="static">
        <Toolbar variant="dense">
          {isLargeScreen && (
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              width={"100%"}
            >
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
              <Box
                display={"flex"}
                width={"60%"}
                justifyContent={"space-around"}
              >
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
                {/* <Button
                  variant="contained"
                  fullWidth
                  sx={{ margin: "0px 10px" }}
                  onClick={() => {
                    handleNavigate("stats");
                  }}
                >
                  Estadísticas
                </Button> */}
              </Box>
              <Box>
                <Typography sx={{ marginLeft: "auto" }} textAlign={"center"}>
                  Monitoreo de Perfiladoras
                </Typography>
              </Box>
            </Box>
          )}
          {!isLargeScreen && (
            <>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={toggleDrawer("left", true)}
              >
                <MenuIcon />
              </IconButton>
              <Typography>I-DEB</Typography>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
