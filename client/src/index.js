import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
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
import AuthProvider from "./hooks/AuthProvider";
import PrivateRoute from "./hooks/useAuth";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Layout>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route element={<PrivateRoute />}>
              <Route path="/code" element={<Code />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/contests" element={<Contests />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/problems" element={<Problems />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </Layout>
    </BrowserRouter>
  </React.StrictMode>
);
