import { Grid3x3 } from "@mui/icons-material";
import { Box, Card, colors, Grid, Paper, Typography } from "@mui/material";
import React from "react";

export default function TableDayTotal(data) {
  return (
    <Box margin={"10px 0px"}>
      <Paper sx={{ backgroundColor: "info.dark" }}>
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
              Diferencia de piezas:
            </Typography>
          </Grid>
          <Grid size={4}>
            <Typography variant="h5" textAlign={"center"}>
              {!data ? data.total_expected : "Sin información"}
            </Typography>
          </Grid>
          <Grid size={4}>
            <Typography variant="h5" textAlign={"center"}>
              {!data ? data.total_made : "Sin información"}
            </Typography>
          </Grid>
          <Grid size={4}>
            <Typography variant="h5" textAlign={"center"}>
              {!data ? data.difference : "Sin información"}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
