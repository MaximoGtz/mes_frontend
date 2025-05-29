import { Box, Card, Typography } from "@mui/material";
import TableInsertionsHours from "../components/TableInsertionsHours";
import { useEffect, useState } from "react";
import { normalEndpoint } from "../api/endpoints";
import axios from "axios";
import TableInsertionsHoursForm from "../components/TableInsertionsHoursForm";
export default function InsertionsTableDay() {
  // const [formFields, setFormFields] = useState({});
  const [tableLoading, setTableLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  // useEffect(() => {
  //   console.log(formFields);
  //   fetchTableData(formFields);
  // }, [formFields]);
  const changeTableData = (index, minutesWorked) => {
    let death_time = Math.abs(minutesWorked - 60);
    console.log(death_time);

    // Clona el array y el objeto a modificar
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
    operator_name,
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
        console.log(response.data);
        const nuevaData = response.data.map((datos) => ({
          ...datos,
          meters_per_hour: ((piece_length / 1000) * datos.count).toFixed(2),
        }));
        setTableData(nuevaData);
        setTableLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <Box width={"100%"}>
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
    </Box>
  );
}
