import { api } from "@app/api";
import { useState } from "react";

export const useAddBook = () => {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const addBook = async ({ ...payload }) => {
    setStatus("pending");

    setLoading(true);

    try {
      await api.post(`/books`, payload);
      setStatus("success");
    } catch (e) {
      setStatus("error");
      alert(`Server error: ${JSON.stringify(e)}`);
    }

    setLoading(false);
  };

  return {
    loading,
    addBook,
    status,
  };
};
