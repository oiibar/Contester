import React from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import AuthProvider from "./hooks/AuthProvider";
import Layout from "./pages/Layout";
import Leaderboard from "./pages/Leaderboard";
import Contests from "./pages/Contests";
import Home from "./pages/Home";
import Problems from "./pages/Problems";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import Code from "./pages/Code";
import NotFound from "./pages/NotFound";
import PrivateRoute from "./hooks/useAuth";
import Profile from "./pages/Profile";

function App() {
  return (
      <BrowserRouter>
        <AuthProvider>
          <Layout>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/" element={<Home />} />

              <Route element={<PrivateRoute />}>
                <Route path="/code" element={<Code />} />
                <Route path="/leaderboard" element={<Leaderboard />} />
                <Route path="/contests" element={<Contests />} />
                <Route path="/problems" element={<Problems />} />
                <Route path="/profile" element={<Profile />} />
              </Route>

              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </AuthProvider>
      </BrowserRouter>
  );
}

export default App;
