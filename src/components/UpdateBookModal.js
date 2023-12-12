import React, { useEffect, useState } from "react";
import {
  Modal,
  Button,
  TextField,
  Card,
  CircularProgress,
  Typography,
} from "@mui/material";

export const UpdateBookModal = ({
  open,
  onClose,
  onUpdateBook,
  book,
  loading,
}) => {
  const [updatedTitle, setUpdatedTitle] = useState(book ? book.title : "");
  const [updatedAuthor, setUpdatedAuthor] = useState(book ? book.author : "");

  useEffect(() => {
    setUpdatedTitle(book?.title || "");
    setUpdatedAuthor(book?.author || "");
  }, [book?._id]);

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    onUpdateBook({
      id: book._id,
      title: updatedTitle,
      author: updatedAuthor,
    });
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
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
          Updat book
        </Typography>

        <form onSubmit={handleUpdateSubmit}>
          <TextField
            label="Title"
            value={updatedTitle}
            onChange={(e) => setUpdatedTitle(e.target.value)}
            fullWidth
            margin="normal"
            variant="outlined"
            required
          />
          <TextField
            label="Author"
            value={updatedAuthor}
            onChange={(e) => setUpdatedAuthor(e.target.value)}
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
            Update
          </Button>
        </form>
      </Card>
    </Modal>
  );
};
