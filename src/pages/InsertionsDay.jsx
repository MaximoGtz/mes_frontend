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
  const [dataJustification, setDataJustification] = useState({});
  const [savedFormData, setSavedFormData] = useState({});

  const fetchTableData = async ({
    profiler_id,
    day,
    piece_length,
    operator_name,
    useSavedData
  }) => {
    if(useSavedData == true){
      profiler_id = savedFormData.profiler_id,
      day = savedFormData.day,
      piece_length = savedFormData.piece_length,
      operator_name = savedFormData.profiler_id
    }else{
      setSavedFormData({
        profiler_id : profiler_id,
        day : day,
        piece_length:piece_length,
        operator_name :operator_name,
      })
    }
    const formDataObject = {
      day,
      profiler_id,
      worker: operator_name,
    };
    setDataJustification(formDataObject);

    let milimeters_per_hour = 970 * 350;
    let corrected_result = milimeters_per_hour / piece_length;
    let pieces_per_hour = corrected_result.toFixed(2);
    setGoalPieces(corrected_result);
    setTableLoading(true);
    
    await axios
      .get(normalEndpoint("api/insertions/table/show"), {
        params: {
          profiler_id: profiler_id,
          date: day,
        },
      })
      .then((response) => {
        const data = response.data.map((datos) => ({
          ...datos,
          meters_per_hour: ((piece_length / 1000) * datos.count).toFixed(2),
          status: datos.count >= pieces_per_hour ? "positive" : "negative",
          worked_time: Math.ceil((datos.count * 60) / pieces_per_hour),
          justified_minutes: 0,
          total_minutes: Math.ceil((datos.count * 60) / pieces_per_hour),
        }));
        data.map((data) => {
          let sum = 0;
          if (data.justifications.length > 0) {
            data.justifications.forEach((element) => {
              sum += element.minutes_off;
            });
            data.total_minutes += sum;
            data.justified_minutes += sum;
          }
        });
        console.log(data);
        setTableData(data);
        setTableLoading(false);
        const real_pieces = data.reduce((acc, item) => acc + item.count, 0);
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
        // console.log(result);
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
          dataJustification={dataJustification}
          fetchTableData={fetchTableData}
          savedFormData={savedFormData}
          goalPieces={goalPieces}
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
