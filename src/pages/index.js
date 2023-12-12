import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Snackbar, Container } from "@mui/material"; // Add necessary imports for Material-UI components
import { useGetBooks } from "@app/hooks";
import { useDeleteBook, useUpdateBook } from "@app/hooks"; // Path to your delete and update hooks
import { Components } from "@app/components";

const columns = [
  { field: "_id", headerName: "ID", width: 300, editable: false },
  { field: "title", headerName: "Title", editable: false, width: 300 },
  { field: "author", headerName: "Author", editable: false, width: 300 },
];

const ListPage = () => {
  const { books, refetch } = useGetBooks();

  const {
    loading: deleteLoading,
    deleteBook,
    status: statusDelete,
  } = useDeleteBook();
  const {
    loading: updateLoading,
    updateBook,
    status: statusUpdate,
  } = useUpdateBook();

  const [deleteModalOpen, setDeleteModalOpen] = React.useState(false);
  const [bookIdToDelete, setBookIdToDelete] = React.useState(null);
  const [updateModalOpen, setUpdateModalOpen] = React.useState(false);
  const [bookToUpdate, setBookToUpdate] = React.useState(null);
  const [openSnackbarUpdate, setOpenSnackbarUpdate] = React.useState(false);
  const [openSnackbarDelete, setOpenSnackbarDelete] = React.useState(false);

  const handleDeleteClick = (id) => {
    setBookIdToDelete(id);
    setDeleteModalOpen(true);
  };

  const handleDeleteModalClose = () => {
    setDeleteModalOpen(false);
    setBookIdToDelete(null);
  };

  const handleDeleteConfirm = async () => {
    await deleteBook({ id: bookIdToDelete });
    setOpenSnackbarDelete(true);
    handleDeleteModalClose();
    // Call the refetch function to update the book list after deletion
    refetch();
  };

  const handleUpdateClick = (book) => {
    setBookToUpdate(book);
    setUpdateModalOpen(true);
  };

  const handleUpdateModalClose = () => {
    setUpdateModalOpen(false);
    setBookToUpdate(null);
  };

  const handleUpdateSubmit = async (updatedBook) => {
    await updateBook(updatedBook);
    setOpenSnackbarUpdate(true);
    handleUpdateModalClose();
    // Call the refetch function to update the book list after update
    refetch();
  };

  const handleSnackbarClose = () => {
    setOpenSnackbarUpdate(false);
    setOpenSnackbarDelete(false);
  };

  return (
    <Container sx={{ paddingTop: 3 }}>
      <DataGrid
        rows={books}
        sx={{ backgroundColor: "white" }}
        columns={[
          ...columns,
          {
            field: "actions",
            headerName: "Actions",
            width: 150,
            renderCell: ({ row }) => (
              <>
                <Button onClick={() => handleDeleteClick(row._id)}>
                  Delete
                </Button>
                <Button onClick={() => handleUpdateClick(row)}>Update</Button>
              </>
            ),
          },
        ]}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[10]}
        getRowId={(row) => row._id}
        hideFooterSelectedRowCount
        disableColumnFilter
        disableColumnMenu
      />

      {/* Delete Confirmation Modal */}
      <Components.DeleteConfirmationModal
        open={deleteModalOpen}
        onClose={handleDeleteModalClose}
        onDelete={handleDeleteConfirm}
        loading={deleteLoading}
      />

      {/* Update Book Modal */}
      <Components.UpdateBookModal
        open={updateModalOpen}
        onClose={handleUpdateModalClose}
        onUpdateBook={handleUpdateSubmit}
        book={bookToUpdate}
        loading={updateLoading}
      />
      <Snackbar
        open={openSnackbarUpdate}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={
          statusUpdate === "success"
            ? "Book updated successfully!"
            : statusUpdate === "error"
            ? "Failed to update book"
            : ""
        }
      />
      <Snackbar
        open={openSnackbarDelete}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={
          statusDelete === "success"
            ? "Book deleted successfully!"
            : statusDelete === "error"
            ? "Failed to delete book"
            : ""
        }
      />
    </Container>
  );
};

export default ListPage;
