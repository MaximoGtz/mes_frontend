import { Box, Typography } from "@mui/material";
import TableInsertionsHours from "../components/TableInsertionsHours";
import { useState } from "react";
import { normalEndpoint } from "../api/endpoints";
import axios from "axios";
import TableDayTotal from "../components/TableDayTotal";
import TableInsertionsHoursForm from "../components/TableInsertionsHoursForm";
export default function InsertionsTableDay() {
  const [tableLoading, setTableLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [totalTableData, setTotalTableData] = useState([]);
  const [goalPieces, setGoalPieces] = useState(undefined);
  const changeTableData = (index, minutesWorked) => {
    let death_time = Math.abs(minutesWorked - 60);
    const newTableData = [...tableData];
    newTableData[index] = { ...newTableData[index], death_time };
    setTableData(newTableData);
  };
  const fetchTableData = async ({ profiler_id, day, piece_length }) => {
    let milimeters = 970;
    let pieces_hour_goal = 350;

    let operation_result = (piece_length * pieces_hour_goal) / milimeters;
    let pieces_per_hour = operation_result.toFixed(2);
    setGoalPieces(pieces_per_hour);
    console.log(operation_result);
    setTableLoading(true);
    await axios
      .get(normalEndpoint("api/insertions/table/show"), {
        params: {
          profiler_id: profiler_id,
          date: day,
        },
      })
      .then((response) => {
        const nuevaData = response.data.map((datos) => ({
          ...datos,
          meters_per_hour: ((piece_length / 1000) * datos.count).toFixed(2),
          status: datos.count >= pieces_per_hour ? "positive" : "negative",
        }));
        console.log(nuevaData);
        setTableData(nuevaData);
        setTableLoading(false);
        const real_pieces = nuevaData.reduce(
          (acc, item) => acc + item.count,
          0
        );
        const total_pieces = pieces_per_hour * 12;
        const difference_pieces = real_pieces - total_pieces;
        let status_production;
        let real_meters = ((piece_length / 1000) * real_pieces).toFixed(2);
        let total_meters = ((piece_length / 1000) * total_pieces).toFixed(2);
        let difference_meters = (real_meters - total_meters).toFixed(2);
        if (difference_pieces < 0) {
          status_production = "negative";
        } else {
          status_production = "positive";
        }
        const result = {
          real_pieces,
          total_pieces,
          difference_pieces,
          status_production,
          real_meters,
          total_meters,
          difference_meters,
        };
        console.log(result);
        setTotalTableData(result);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <Box width={"100%"}>
      <Box padding={"20px"} maxWidth={"xl"} margin={"0 auto "}>
        <Typography
          variant="h3"
          sx={{ margin: "20px 0px" }}
          textAlign={"center"}
          fontWeight={600}
        >
          Producción por día
        </Typography>
        <TableInsertionsHoursForm
          fetchTableData={fetchTableData}
        ></TableInsertionsHoursForm>
        <Typography variant="h5" sx={{ padding: "10px" }}>
          Meta de piezas por hora:{" "}
          <span style={{ fontWeight: 600, color: "#0288d1" }}>
            {goalPieces}
          </span>{" "}
          pzs.
        </Typography>
        <TableInsertionsHours
          data={tableData}
          tableLoading={tableLoading}
          changeTableData={changeTableData}
        ></TableInsertionsHours>
        <TableDayTotal
          total_pieces={totalTableData.total_pieces}
          real_pieces={totalTableData.real_pieces}
          difference_pieces={totalTableData.difference_pieces}
          total_meters={totalTableData.total_meters}
          real_meters={totalTableData.real_meters}
          difference_meters={totalTableData.difference_meters}
          status_production={totalTableData.status_production}
        />
      </Box>
    </Box>
  );
}
