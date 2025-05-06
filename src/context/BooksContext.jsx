import {
  onSnapshot,
  query,
  collection,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { createContext, useEffect, useState, useContext } from "react";
import { db } from "../firebase/firebase";

// Create context with default value
const BooksContext = createContext({
  books: [],
  setBooks: () => {},
  deleteBook: () => {},
});

export function useBooks() {
  const context = useContext(BooksContext);
  if (!context) {
    throw new Error("useBooks must be used within a BooksProvider");
  }
  return context;
}

export function BooksProvider({ children }) {
  const [books, setBooks] = useState([]);

  // Subscribe to real-time updates
  useEffect(() => {
    const q = query(collection(db, "books"));
    const unsubscribe = onSnapshot(q, (snap) => {
      setBooks(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  // Delete by document ID
  const deleteBook = async (id) => {
    try {
      await deleteDoc(doc(db, "books", id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete book: " + err.message);
    }
  };

  const booksActions = {
    books,
    setBooks,
    deleteBook,
  };

  return (
    <BooksContext.Provider value={booksActions}>
      {children}
    </BooksContext.Provider>
  );
}
