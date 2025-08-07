import React from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import AuthProvider from "hooks/auth/AuthProvider";
import Layout from "pages/Layout/Layout";
import Leaderboard from "pages/Leaderboard/Leaderboard";
import Contests from "pages/Contests/Contests";
import Home from "pages/Home/Home";
import Problems from "pages/Problems/Problems";
import Login from "pages/Auth/Login";
import Signup from "pages/Auth/Signup";
import Code from "pages/Code/Code";
import NotFound from "pages/NotFound/NotFound";
import PrivateRoute from "hooks/auth/useAuth";
import Profile from "pages/Profile/Profile";

function App() {
  return (
      <BrowserRouter>
        <AuthProvider>
          <Layout>
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/" element={<Home />} />

              {/* Private Routes */}
              <Route element={<PrivateRoute />}>
                <Route path="/leaderboard" element={<Leaderboard />} />
                <Route path="/contests" element={<Contests />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/profile/:userId" element={<Profile />} />
                <Route path="/code" element={<Code />} />
                <Route path="/problems/:contestId" element={<Problems />} />
              </Route>

              {/* Catch-All */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </AuthProvider>
      </BrowserRouter>
  );
}

export default App;
