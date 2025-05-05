import { useState } from "react";
import { TextField, Button, Stack, Paper, Container } from "@mui/material";
import "./App.css";
import BookCardGrid from "./components/ListBooks";
import Books from "./components/Books";
import { auth, db } from "./firebase/firebase";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import Layout from "./pages/Layout";

function App() {
  return (
    <>
      <Layout />
    </>
  );
}

export default App;
