import { api } from "@app/api";
import { useState } from "react";

export const useUpdateBook = () => {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const updateBook = async ({ id, ...payload }) => {
    if (!id) return;
    setStatus("pending");

    setLoading(true);

    try {
      await api.put(`/books/${id}`, payload);
      setStatus("success");
    } catch (e) {
      setStatus("error");
      alert(`Server error: ${JSON.stringify(e)}`);
    }

    setLoading(false);
  };

  return {
    loading,
    updateBook,
    status,
  };
};
