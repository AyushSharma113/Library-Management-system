// import { Navigate } from "react-router-dom";
// import { useAuthState } from "react-firebase-hooks/auth";
// import { auth } from "../firebase/firebase";

// export default function PrivateRoute({ children }) {
//   const [user, loading] = useAuthState(auth);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (!user) {
//     return <Navigate to="/" />;
//   }

//   return children;
// }
