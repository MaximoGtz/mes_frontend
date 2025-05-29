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
  const changeTableData = (index, minutesWorked) => {
    let death_time = Math.abs(minutesWorked - 60);
    console.log(death_time);
    const newTableData = [...tableData];
    newTableData[index] = { ...newTableData[index], death_time };
    console.log(newTableData[index]);
    setTableData(newTableData);
  };
  const fetchTableData = async ({
    profiler_id,
    day,
    piece_length,
    pieces_per_hour,
    // operator_name,
  }) => {
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
        }));
        setTableData(nuevaData);
        setTableLoading(false);
        const total_expected = nuevaData.reduce(
          (acc, item) => acc + item.count,
          0
        );

        const result = { total_expected };
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
        <TableInsertionsHours
          data={tableData}
          tableLoading={tableLoading}
          changeTableData={changeTableData}
        ></TableInsertionsHours>
        <TableDayTotal data={totalTableData} />
      </Box>
    </Box>
  );
}
