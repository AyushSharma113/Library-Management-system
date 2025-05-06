import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import DashBoard from "./DashBoard";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useAuth } from "../context/AuthContext";
import StudentDashboard from "./StudentDashboard";

const Layout = () => {
  const [user, setUser] = useState(null);
  //  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();
  const isAdmin = currentUser?.email === "admin@gmail.com";

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>{user ? isAdmin ? <DashBoard /> : <StudentDashboard /> : <Outlet />}</>
  );
};

export default Layout;
