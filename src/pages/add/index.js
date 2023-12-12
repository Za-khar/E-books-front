import React from "react";
import {
  TextField,
  Button,
  CircularProgress,
  Snackbar,
  Typography,
  Container,
  Card,
} from "@mui/material";
import { useAddBook } from "@app/hooks";

export default function AddPage() {
  const { loading, addBook, status } = useAddBook();
  const [title, setTitle] = React.useState("");
  const [author, setAuthor] = React.useState("");
  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addBook({ title, author });
    setOpenSnackbar(true);
    setTitle("");
    setAuthor("");
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container
      sx={{
        display: "flex",
        paddingTop: 3,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Card
        sx={{
          p: 3,
          width: "100%",
          maxWidth: 500,
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Typography variant="h6" textAlign="center" marginBottom={2}>
          Add book
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            margin="normal"
            variant="outlined"
            required
          />
          <TextField
            label="Author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            fullWidth
            margin="normal"
            variant="outlined"
            required
          />
          <Button
            type="submit"
            variant="outlined"
            sx={{ width: "100%", mt: 2 }}
            disabled={loading}
            startIcon={loading && <CircularProgress size={20} />}
          >
            Add
          </Button>
          <Snackbar
            open={openSnackbar}
            autoHideDuration={6000}
            onClose={handleSnackbarClose}
            message={
              status === "success"
                ? "Book added successfully!"
                : "Failed to add book"
            }
          />
        </form>
      </Card>
    </Container>
  );
}
