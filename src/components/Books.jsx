import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import {
  collection,
  query,
  onSnapshot,
  getDocs,
  deleteDoc,
  doc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";
import booksSeed from "../data/bookData";

export default function Books({ booksData, setBooksData }) {
  // Start with an empty list

  // 2️⃣ Subscribe to real-time updates
  useEffect(() => {
    onSnapshot(query(collection(db, "books")), (snap) => {
      setBooksData(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
  }, []);

  console.log(booksData);

  // 3️⃣ Delete by document ID
  const deleteBook = async (id) => {
    try {
      await deleteDoc(doc(db, "books", id));
      //   alert(`Book ${id} deleted successfully`);
    } catch (err) {
      console.error(err);
      alert("Failed to delete book: " + err.message);
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 750 }} aria-label="books table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 700 }}>No.</TableCell>
            <TableCell sx={{ fontWeight: 700 }}>Title</TableCell>
            <TableCell sx={{ fontWeight: 700 }}>Author</TableCell>
            <TableCell sx={{ fontWeight: 700 }}>Quantity</TableCell>
            <TableCell sx={{ fontWeight: 700 }}>Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {booksData.map((row, idx) => (
            <TableRow key={row.id}>
              <TableCell>{idx + 1}</TableCell>
              <TableCell>{row.title}</TableCell>
              <TableCell>{row.author}</TableCell>
              <TableCell>{row.quantity ?? "—"}</TableCell>
              <TableCell>
                <Button
                  onClick={() => deleteBook(row.id)} // pass the doc ID
                  variant="outlined"
                  color="error"
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
