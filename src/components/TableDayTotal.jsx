import { Grid3x3 } from "@mui/icons-material";
import { Box, Card, colors, Grid, Paper, Typography } from "@mui/material";
import React from "react";

export default function TableDayTotal({
  total_pieces,
  real_pieces,
  difference_pieces,
  total_meters,
  real_meters,
  difference_meters,
  status_production,
}) {
  return (
    <Box margin={"10px 0px"}>
      <Paper sx={{ backgroundColor: "background.paper" }}>
        <Grid container spacing={2} padding={"10px"}>
          <Grid size={4}>
            <Typography variant="h5" textAlign={"center"} fontWeight={600}>
              Meta de piezas por día:
            </Typography>
          </Grid>
          <Grid size={4}>
            <Typography variant="h5" textAlign={"center"} fontWeight={600}>
              Piezas hechas:
            </Typography>
          </Grid>
          <Grid size={4}>
            <Typography variant="h5" textAlign={"center"} fontWeight={600}>
              Diferencia de piezas respecto a la meta:
            </Typography>
          </Grid>
          <Grid size={4}>
            <Typography variant="h5" textAlign={"center"}>
              {total_pieces ? total_pieces : "Sin información"}
            </Typography>
          </Grid>
          <Grid size={4}>
            <Typography variant="h5" textAlign={"center"}>
              {real_pieces ? real_pieces : "Sin información"}
            </Typography>
          </Grid>
          <Grid size={4}>
            <Typography
              variant="h5"
              textAlign={"center"}
              fontWeight={600}
              color={
                status_production === "positive"
                  ? "success.main"
                  : status_production === "negative"
                  ? "error.main"
                  : undefined
              }
            >
              {difference_pieces ? difference_pieces : "Sin información"}
            </Typography>
          </Grid>
          <Grid size={4}>
            <Typography variant="h5" textAlign={"center"} fontWeight={600}>
              Meta de metros de por día:
            </Typography>
          </Grid>
          <Grid size={4}>
            <Typography variant="h5" textAlign={"center"} fontWeight={600}>
              Metros hechos:
            </Typography>
          </Grid>
          <Grid size={4}>
            <Typography variant="h5" textAlign={"center"} fontWeight={600}>
              Diferencia de metros respecto a la meta:
            </Typography>
          </Grid>
          <Grid size={4}>
            <Typography variant="h5" textAlign={"center"}>
              {total_meters ? total_meters : "Sin información"}
            </Typography>
          </Grid>
          <Grid size={4}>
            <Typography variant="h5" textAlign={"center"}>
              {real_meters ? real_meters : "Sin información"}
            </Typography>
          </Grid>
          <Grid size={4}>
            <Typography
              variant="h5"
              textAlign={"center"}
              fontWeight={600}
              color={
                status_production === "positive"
                  ? "success.main"
                  : status_production === "negative"
                  ? "error.main"
                  : undefined
              }
            >
              {difference_meters ? difference_meters : "Sin información"}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
