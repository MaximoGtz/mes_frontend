import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import HomeFilledIcon from "@mui/icons-material/HomeFilled";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import { Typography } from "@mui/material";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import TodayIcon from "@mui/icons-material/Today";
export default function AnchorTemporaryDrawer({
  toggleDrawer,
  state,
  handleNavigate,
}) {
  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List
        subheader={
          <Typography padding={"10px"}>Monitoreo de perfiladoras</Typography>
        }
      >
        <ListItem key="index" disablePadding>
          <ListItemButton
            onClick={() => {
              handleNavigate("index");
            }}
          >
            <ListItemIcon>
              <HomeFilledIcon />
            </ListItemIcon>
            <ListItemText primary="Inicio" />
          </ListItemButton>
        </ListItem>
        <ListItem key="production" disablePadding>
          <ListItemButton
            onClick={() => {
              handleNavigate("prod_table");
            }}
          >
            <ListItemIcon>
              <PrecisionManufacturingIcon />
            </ListItemIcon>
            <ListItemText primary="Tabla de producción" />
          </ListItemButton>
        </ListItem>
        <ListItem key="day_data" disablePadding>
          <ListItemButton
            onClick={() => {
              handleNavigate("day_data");
            }}
          >
            <ListItemIcon>
              <TodayIcon />
            </ListItemIcon>
            <ListItemText primary="Datos del día" />
          </ListItemButton>
        </ListItem>
        <ListItem key="stats" disablePadding>
          <ListItemButton
            onClick={() => {
              handleNavigate("stats");
            }}
          >
            <ListItemIcon>
              <QueryStatsIcon />
            </ListItemIcon>
            <ListItemText primary="Estadísticas" />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <React.Fragment key={"leftDrawer"}>
        {/* <Button onClick={toggleDrawer("left", true)}>Abrir drawer</Button> */}
        <Drawer
          anchor="left"
          open={state["left"]}
          onClose={toggleDrawer("left", false)}
        >
          {list("left")}
        </Drawer>
      </React.Fragment>
    </div>
  );
}
