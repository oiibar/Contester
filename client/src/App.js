import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';
import { AuthProvider } from 'auth/AuthContext';
import Layout from 'shared/ui/Layout/Layout';
import PrivateRoute from 'auth/PrivateRoute';
import GlobalSkeleton from 'shared/ui/GlobalSkeleton/GlobalSkeleton';

const Leaderboard = lazy(() => import('pages/Leaderboard/Leaderboard'));
const Contests = lazy(() => import('pages/Contests/Contests'));
const Home = lazy(() => import('pages/Home/Home'));
const Problems = lazy(() => import('pages/Problems/Problems'));
const Login = lazy(() => import('pages/Auth/Login'));
const Signup = lazy(() => import('pages/Auth/Signup'));
const Code = lazy(() => import('pages/Code/Code'));
const NotFound = lazy(() => import('shared/ui/NotFound/NotFound'));
const Profile = lazy(() => import('pages/Profile/Profile'));

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Layout>
          <Suspense fallback={<GlobalSkeleton />}>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/" element={<Home />} />

              <Route element={<PrivateRoute />}>
                <Route path="/leaderboard" element={<Leaderboard />} />
                <Route path="/contests" element={<Contests />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/profile/:userId" element={<Profile />} />
                <Route path="/code" element={<Code />} />
                <Route path="/problems/:contestId" element={<Problems />} />
              </Route>

              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </Layout>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
