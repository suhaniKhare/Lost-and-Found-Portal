import { useEffect, useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import EditItemPage from "./pages/EditItem";
import Itemdetails from "./pages/Itemdetails";
import Login from "./pages/loginPage";
import MyListings from "./pages/MyListings";
import PostItem from "./pages/postItem";
import Signup from "./pages/SignupPage";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );
  const location = useLocation();

  useEffect(() => {
    setIsAuthenticated(!!localStorage.getItem("token"));
  }, [location]); // whenever route changes, check auth again

  return (
    <Routes>
      <Route
        path="/"
        element={
          isAuthenticated ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/login"
        element={
          isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />
        }
      />
      <Route
        path="/signup"
        element={
          isAuthenticated ? <Navigate to="/dashboard" replace /> : <Signup />
        }
      />
      <Route
        path="/dashboard"
        element={
          isAuthenticated ? <Dashboard /> : <Navigate to="/login" replace />
        }
      />
      <Route
        path="/myListings"
        element={
          isAuthenticated ? <MyListings /> : <Navigate to="/login" replace />
        }
      />

      <Route
        path="/postItem"
        element={
          isAuthenticated ? <PostItem /> : <Navigate to="/login" replace />
        }
      />
      <Route
        path="/item/:id"
        element={
          isAuthenticated ? <Itemdetails /> : <Navigate to="/login" replace />
        }
      />
      <Route
        path="/editItem/:id"
        element={
          isAuthenticated ? <EditItemPage /> : <Navigate to="/login" replace />
        }
      />
      
    
    </Routes>
  );
}

export default App;
