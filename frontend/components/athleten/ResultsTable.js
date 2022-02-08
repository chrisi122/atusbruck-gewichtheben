import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { getSinclairCoefficient } from "../../utils/sinclair";

// const columns = [
//   { field: "id", headerName: "ID", width: 90 },
//   {
//     field: "firstName",
//     headerName: "First name",
//     width: 150,
//     editable: true,
//   },
//   {
//     field: "lastName",
//     headerName: "Last name",
//     width: 150,
//     editable: true,
//   },
//   {
//     field: "age",
//     headerName: "Age",
//     type: "number",
//     width: 110,
//     editable: true,
//   },
//   {
//     field: "fullName",
//     headerName: "Full name",
//     description: "This column has a value getter and is not sortable.",
//     sortable: false,
//     width: 160,
//     valueGetter: (params) =>
//       `${params.row.firstName || ""} ${params.row.lastName || ""}`,
//   },
// ];

// const rows = [
//   { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
//   { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
//   { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
//   { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
//   { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
//   { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
//   { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
//   { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
//   { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
// ];

const ResultsTable = ({ results, gender }) => {
  const columns = [
    {
      field: "date",
      headerName: "Datum",
      type: "date",
      editable: true,
    },
    {
      field: "competition",
      headerName: "Bewerb",
      flex: 1,
      minWidth: 300,
    },
    {
      field: "location",
      headerName: "Ort",
      flex: 1,
      minWidth: 100,
    },
    {
      field: "bw",
      headerName: "KGW",
      type: "number",
      editable: true,
    },
    {
      field: "snatchAttempts",
      headerName: "Reißen Versuche",
      hide: true,
      minWidth: 150,
    },
    {
      field: "snatch",
      headerName: "Reißen",
      type: "number",
      editable: true,
    },
    {
      field: "cjAttempts",
      headerName: "Stoßen Versuche",
      hide: true,
      minWidth: 150,
    },
    {
      field: "cj",
      headerName: "Stoßen",
      type: "number",
      editable: true,
    },
    {
      field: "total",
      headerName: "ZWK",
      type: "number",
      editable: true,
    },
    {
      field: "sinclair",
      headerName: "Sinclair",
      type: "number",
      editable: true,
      valueGetter: (params) =>
        (
          getSinclairCoefficient(params.row.bw)[gender] * params.row.total
        ).toFixed(2),
    },
  ];

  const rows = results
    .map((result) => ({
      id: result.id,
      competition:
        result.attributes.competitions.data[0].attributes.title.default || null,
      location:
        result.attributes.competitions.data[0].attributes.location &&
        result.attributes.competitions.data[0].attributes.location.title +
          (result.attributes.competitions.data[0].attributes.location
            .countryShort !== "AUT"
            ? " / " +
              result.attributes.competitions.data[0].attributes.location
                .countryShort
            : ""),
      date: result.attributes.date,
      bw:
        result.attributes.bodyweight !== 0
          ? result.attributes.bodyweight.toFixed(1)
          : null,
      snatch: result.attributes.result.disciplines.find(
        (el) => el.type === "SNATCH"
      ).weight,
      cj: result.attributes.result.disciplines.find(
        (el) => el.type === "CLEAN_AND_JERK"
      ).weight,
      total: result.attributes.result.disciplines.find(
        (el) => el.type === "TOTAL"
      ).weight,
      sinclair: (
        getSinclairCoefficient(result.attributes.bodyweight)[gender] *
        result.attributes.result.disciplines.find((el) => el.type === "TOTAL")
          .weight
      ).toFixed(2),
      snatchAttempts:
        result.attributes.result.disciplines.find((el) => el.type === "SNATCH")
          .attempts &&
        result.attributes.result.disciplines
          .find((el) => el.type === "SNATCH")
          .attempts.map(
            (el) => el.weight + (el.status === "NO_LIFT" ? "x" : "")
          )
          .join(" / "),
      cjAttempts:
        result.attributes.result.disciplines.find(
          (el) => el.type === "CLEAN_AND_JERK"
        ).attempts &&
        result.attributes.result.disciplines
          .find((el) => el.type === "CLEAN_AND_JERK")
          .attempts.map(
            (el) => el.weight + (el.status === "NO_LIFT" ? "x" : "")
          )
          .join(" / "),
    }))
    .sort((a, b) => b.sinclair - a.sinclair);

  return (
    <div>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
        autoHeight
        sort
      />
    </div>
  );
};

export default ResultsTable;
