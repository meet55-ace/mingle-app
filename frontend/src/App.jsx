import React, { useEffect } from "react";
import Navbar from "./components/navbar";
import { Routes, Route, Navigate } from "react-router-dom";
import ProfilePage from "./pages/profile";
import LoginPage from "./pages/login";
import SignUpPage from "./pages/sign-up";
import HomePage from "./pages/homepage";
import { useAuthStore } from "./store/useAuthStore";
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";

const App = () => {
  const { authUser, checkAuth, isCheckingAuth,onlineUsers } = useAuthStore();

  console.log({onlineUsers});

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );

  return (
    <div>
      <Navbar />
      <Routes>
        {/* Home page - only accessible if logged in */}
        <Route
          path="/"
          element={authUser ? <HomePage /> : <Navigate to="/login" />}
        />

        {/* SignUp page - only accessible if not logged in */}
        <Route
          path="/sign-up"
          element={!authUser ? <SignUpPage /> : <Navigate to="/" />}
        />

        {/* Login page - only accessible if not logged in */}
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to="/" />}
        />

        {/* Profile page - only accessible if logged in */}
        <Route
          path="/profile"
          element={authUser ? <ProfilePage /> : <Navigate to="/login" />}
        />
      </Routes>

      <Toaster />
    </div>
  );
};

export default App;
