import {
  onSnapshot,
  query,
  collection,
  deleteDoc,
  doc,
  addDoc,
  updateDoc,
  serverTimestamp,
  where,
  getDoc,
} from "firebase/firestore";
import { createContext, useEffect, useState, useContext } from "react";
import { db } from "../firebase/firebase";

// Create context with default value
const BooksContext = createContext({
  books: [],
  setBooks: () => {},
  deleteBook: () => {},
  requestBorrow: () => {},
  approveRequest: () => {},
  borrowedBooks: [],
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
  const [requests, setRequests] = useState([]);
  const [borrowedBooks, setBorrowedBooks] = useState([]);

  // Subscribe to real-time updates for books
  useEffect(() => {
    const q = query(collection(db, "books"));
    const unsubscribe = onSnapshot(q, (snap) => {
      setBooks(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  // Subscribe to real-time updates for borrow requests
  useEffect(() => {
    const q = query(collection(db, "borrowRequests"));
    const unsubscribe = onSnapshot(q, (snap) => {
      setRequests(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });

    return () => unsubscribe();
  }, []);

  // Subscribe to real-time updates for borrowed books
  useEffect(() => {
    const q = query(
      collection(db, "borrowRequests"),
      where("status", "==", "approved")
    );
    const unsubscribe = onSnapshot(q, async (snap) => {
      const approvedRequests = snap.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      }));

      // Fetch book details for each approved request
      const booksWithDetails = await Promise.all(
        approvedRequests.map(async (request) => {
          const bookDoc = await getDoc(doc(db, "books", request.bookId));
          if (bookDoc.exists()) {
            return {
              ...request,
              title: bookDoc.data().title,
              author: bookDoc.data().author,
              genre: bookDoc.data().genre,
              year: bookDoc.data().year,
              pages: bookDoc.data().pages,
              rating: bookDoc.data().rating,
              isbn: bookDoc.data().isbn,
            };
          }
          return request;
        })
      );

      setBorrowedBooks(booksWithDetails);
    });

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

  // Request to borrow a book
  const requestBorrow = async (bookId, userId, userName) => {
    try {
      await addDoc(collection(db, "borrowRequests"), {
        bookId,
        userId,
        userName,
        status: "pending",
        requestDate: serverTimestamp(),
      });
    } catch (err) {
      console.error(err);
      alert("Failed to request book: " + err.message);
    }
  };

  // Approve a borrow request
  const approveRequest = async (requestId, bookId) => {
    try {
      // Update request status
      await updateDoc(doc(db, "borrowRequests", requestId), {
        status: "approved",
        approvedDate: serverTimestamp(),
      });

      // Update book quantity
      const bookRef = doc(db, "books", bookId);
      const book = books.find((b) => b.id === bookId);
      if (book) {
        await updateDoc(bookRef, {
          quantity: (book.quantity || 0) - 1,
          available: (book.quantity || 0) - 1 > 0,
        });
      }
    } catch (err) {
      console.error(err);
      alert("Failed to approve request: " + err.message);
    }
  };

  const booksActions = {
    books,
    setBooks,
    deleteBook,
    requestBorrow,
    approveRequest,
    requests,
    borrowedBooks,
  };

  return (
    <BooksContext.Provider value={booksActions}>
      {children}
    </BooksContext.Provider>
  );
}
