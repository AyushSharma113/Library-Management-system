import React from "react";

import "./App.css";
import Layout from "./pages/Layout";
import { createBrowserRouter, RouterProvider } from "react-router";
import LibraryLandingPage from "./pages/LibraryLandingPage";
export default function App() {
  return (
    <>
      <LibraryLandingPage />
    </>
  );
}
