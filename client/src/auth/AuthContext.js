import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from 'react';
import { authenticateUser } from 'api/api';
import { useFetching } from 'hooks/fetching/useFetching';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext(null);

const getTokenExpiry = (token) => {
  try {
    const decoded = jwtDecode(token);
    return decoded.exp * 1000;
  } catch (e) {
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isInitializing, setIsInitializing] = useState(true);
  const logoutTimerRef = useRef(null);

  const clearLogoutTimer = () => {
    if (logoutTimerRef.current) {
      clearTimeout(logoutTimerRef.current);
      logoutTimerRef.current = null;
    }
  };

  const scheduleAutoLogout = (expiry) => {
    const now = Date.now();
    if (!expiry || expiry <= now) {
      logout();
      return;
    }
    clearLogoutTimer();
    logoutTimerRef.current = setTimeout(() => {
      logout();
    }, expiry - now);
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');

    if (storedUser && storedToken) {
      const expiry = getTokenExpiry(storedToken);

      if (!expiry || expiry <= Date.now()) {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setUser(null);
        setToken(null);
      } else {
        setUser(JSON.parse(storedUser));
        setToken(storedToken);
        scheduleAutoLogout(expiry);
      }
    }
    setIsInitializing(false);

    return () => clearLogoutTimer();
  }, []);

  const {
    fetching: login,
    isLoading,
    error,
  } = useFetching(async (credentials) => {
    const res = await authenticateUser(credentials);

    setUser(res.user);
    setToken(res.token);

    localStorage.setItem('user', JSON.stringify(res.user));
    localStorage.setItem('token', res.token);

    const expiry = getTokenExpiry(res.token);
    scheduleAutoLogout(expiry);
  });

  const logout = () => {
    clearLogoutTimer();
    setUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  const authValue = {
    user,
    token,
    login,
    logout,
    isAuthenticated: !!user,
    isLoading,
    error,
    isInitializing,
  };

  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
