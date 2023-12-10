import { api } from "@app/api";
import { useState } from "react";

export const useDeleteBook = () => {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const deleteBook = async ({ id }) => {
    if (!id) return;
    setStatus("pending");

    setLoading(true);

    try {
      await api.delete(`/books/${id}`);
      setStatus("success");
    } catch (e) {
      setStatus("error");
      alert(`Server error: ${JSON.stringify(e)}`);
    }

    setLoading(false);
  };

  return {
    loading,
    deleteBook,
    status,
  };
};
