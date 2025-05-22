// import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
// import IconButton from "@mui/material/IconButton";
// import MenuIcon from "@mui/icons-material/Menu";
// import { Button } from "@mui/material";

export default function Navbar() {
  return (
    <Box>
      <AppBar position="static">
        <Toolbar variant="dense">
          {/* <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}
          {/* <img
            src="/images/images.jpg"
            alt="logo"
            style={{ width: "50px", height: "50px", padding: "0px 20px" }}
          ></img> */}
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
          <Typography sx={{ marginLeft: "auto" }}>
            Monitoreo de Perfiladoras
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
