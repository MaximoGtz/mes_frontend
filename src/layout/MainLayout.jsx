import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import NavbarDrawer from "../layout/NavbarDrawer";
import { useNavigate } from "react-router-dom";
export default function MainLayout() {
  const navigate = useNavigate();
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setDrawerState({ ...drawerState, [anchor]: open });
  };
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
  const [drawerState, setDrawerState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Navbar toggleDrawer={toggleDrawer} handleNavigate={handleNavigate} />
      <NavbarDrawer
        toggleDrawer={toggleDrawer}
        state={drawerState}
        setState={setDrawerState}
        handleNavigate={handleNavigate}
      />
      <Box
        sx={{
          flex: 1,
          width: "100%",
          display: "flex", // muy importante si quieres que el contenido se expanda
          flexDirection: "column",
        }}
      >
        <Outlet />
      </Box>

      <Footer />
    </Box>
  );
}
