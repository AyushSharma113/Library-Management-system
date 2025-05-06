import { Navigate } from "react-router-dom";

import { auth } from "../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

export default function PrivateRoute({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("PrivateRoute: Setting up auth state listener");
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("PrivateRoute: Auth state changed", user);
      setUser(user);
      setLoading(false);
    });

    return () => {
      console.log("PrivateRoute: Cleaning up auth state listener");
      unsubscribe();
    };
  }, []);

  if (loading) {
    console.log("PrivateRoute: Loading state");
    return <div>Loading...</div>;
  }

  if (!user) {
    console.log("PrivateRoute: No user, redirecting to home");
    return <Navigate to="/" replace />;
  }

  console.log("PrivateRoute: User authenticated, rendering children");
  return children;
}
