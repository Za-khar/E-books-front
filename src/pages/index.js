import * as React from "react";
import Container from "@mui/material/Container";
import { DataGrid } from "@mui/x-data-grid";
import { useGetBooks } from "@app/hooks";

const columns = [
  { field: "_id", headerName: "ID", width: 90 },
  {
    field: "title",
    headerName: "Title",
    width: 150,
    editable: false,
  },
  {
    field: "author",
    headerName: "Author",
    width: 150,
    editable: false,
  },
];

export default function ListPage() {
  const { books } = useGetBooks();

  return (
    <Container
      sx={{
        paddingTop: 3,
      }}
    >
      <DataGrid
        sx={{ backgroundColor: "white" }}
        rows={books}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        getRowId={(row) => row._id}
        pageSizeOptions={[10]}
        checkboxSelection
        disableRowSelectionOnClick
        disableColumnMenu
        disableColumnFilter
        disableDensitySelector
        disableEval
        disableColumnSelector
      />
    </Container>
  );
}
