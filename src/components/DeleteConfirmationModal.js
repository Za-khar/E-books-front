import React from "react";
import { Modal, Button, Card, Box, Typography } from "@mui/material";

export const DeleteConfirmationModal = ({
  open,
  onClose,
  onDelete,
  loading,
}) => {
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
          maxWidth: 300,
          display: "flex",
          alignItems: "center",
        }}
      >
        <Box>
          <Typography variant="body1" textAlign="center" marginBottom={2}>
            Are you sure you want to delete this book?
          </Typography>

          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              onClick={onClose}
              disabled={loading}
              sx={{ marginRight: 2 }}
            >
              Cancel
            </Button>
            <Button onClick={onDelete} disabled={loading}>
              Delete
            </Button>
          </Box>
        </Box>
      </Card>
    </Modal>
  );
};
