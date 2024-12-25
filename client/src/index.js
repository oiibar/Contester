import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import AuthProvider from "./hooks/AuthProvider"; // AuthProvider is moved here
import Layout from "./pages/Layout";
import About from "./pages/About";
import Leaderboard from "./pages/Leaderboard";
import Contests from "./pages/Contests";
import "./styles/App.css";
import Home from "./pages/Home";
import Problems from "./pages/Problems";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import Code from "./pages/Code";
import NotFound from "./pages/NotFound";
import PrivateRoute from "./hooks/useAuth";
import Profile from "./pages/Profile";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <React.StrictMode>
      <BrowserRouter>
        <AuthProvider>
          <Layout>
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />

              {/* Private Routes */}
              <Route element={<PrivateRoute />}>
                <Route path="/code" element={<Code />} />
                <Route path="/leaderboard" element={<Leaderboard />} />
                <Route path="/contests" element={<Contests />} />
                <Route path="/problems" element={<Problems />} />
                <Route path="/profile" element={<Profile />} />

              </Route>

              {/* Catch-All */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </AuthProvider>
      </BrowserRouter>
    </React.StrictMode>
);
