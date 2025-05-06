import React from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import LibraryLandingPage from "./pages/LibraryLandingPage";

import Layout from "./pages/Layout";
import LibraryDashboard from "./pages/DashBoard";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <LibraryLandingPage />,
        },
        {
          path: "/dashboard",
          element: <LibraryDashboard />,
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
