// import React, { createContext, useEffect, useState } from "react";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [token, setToken] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // Safely parse JSON from localStorage
//   const getStoredUser = () => {
//   try {
//     const stored = localStorage.getItem("bookbazaar_user");

//     if (!stored || stored === "undefined" || stored === "null") {
//       return null;
//     }

//     return JSON.parse(stored);
//   } catch (e) {
//     console.warn("Failed to parse stored user JSON:", e);
//     return null;
//   }
// };


//   // Load user & token from localStorage on app start
//   useEffect(() => {
//     const storedUser = getStoredUser();
//     const storedToken = localStorage.getItem("bookbazaar_token");

//     if (storedUser && storedToken) {
//       setUser(storedUser);
//       setToken(storedToken);
//     }
//   }, []);

//   // Login method
//   const login = async (credentials) => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await fetch("http://localhost:1110/api/v1/authentication/users/register", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(credentials),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message || "Login failed");
//       }

//       const data = await response.json();

//       // Save user and token
//       setUser(data.user);
//       setToken(data.token);
//       localStorage.setItem("bookbazaar_user", JSON.stringify(data.user));
//       localStorage.setItem("bookbazaar_token", data.token);
//     } catch (err) {
//       console.error("Login error:", err.message);
//       setError(err.message);
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Logout method
//   const logout = () => {
//     setUser(null);
//     setToken(null);
//     localStorage.removeItem("bookbazaar_user");
//     localStorage.removeItem("bookbazaar_token");
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         token,
//         isAuthenticated: !!user && !!token,
//         isAdmin: user?.role === "admin",
//         loading,
//         error,
//         login,
//         logout,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };