import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import DashBoard from "./DashBoard";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase";

const Layout = () => {
  const [user, setUser] = useState(null);
  //  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return <>{user ? <DashBoard /> : <Outlet />}</>;
};

export default Layout;
