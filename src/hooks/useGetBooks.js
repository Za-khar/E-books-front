import { api } from "@app/api";
import { useEffect, useState } from "react";

export const useGetBooks = () => {
  const [loading, setLoading] = useState(false);
  const [books, setBooks] = useState([]);

  const getBooks = async () => {
    setLoading(true);

    try {
      const { data } = await api.get("/books");

      setBooks(data);
    } catch (e) {
      alert(`Server error: ${JSON.stringify(e)}`);
    }

    setLoading(false);
  };

  useEffect(() => {
    getBooks();
  }, []);

  const refetch = () => {
    getBooks();
  };

  return {
    books,
    loading,
    refetch,
  };
};
