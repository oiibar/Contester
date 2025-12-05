import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
} from 'react';
import { authenticateUser } from 'shared/api/authApi';
import { fetchUser } from 'shared/api/userApi';
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
  const [user, setUserState] = useState(() => {
    try {
      const raw = localStorage.getItem('user');
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });
  const [token, setTokenState] = useState(() => {
    try {
      return localStorage.getItem('token') || null;
    } catch {
      return null;
    }
  });
  const [isInitializing, setIsInitializing] = useState(true);
  const logoutTimerRef = useRef(null);

  const clearLogoutTimer = useCallback(() => {
    if (logoutTimerRef.current) {
      clearTimeout(logoutTimerRef.current);
      logoutTimerRef.current = null;
    }
  }, []);

  const logout = useCallback(() => {
    clearLogoutTimer();
    // используем низкоуровневые сеттеры, а также удаляем из localStorage
    setUserState(null);
    setTokenState(null);
    try {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
    } catch {}
  }, [clearLogoutTimer]);

  const scheduleAutoLogout = useCallback(
    (expiry) => {
      const now = Date.now();
      if (!expiry || expiry <= now) {
        logout();
        return;
      }
      clearLogoutTimer();
      logoutTimerRef.current = setTimeout(() => {
        logout();
      }, expiry - now);
    },
    [clearLogoutTimer, logout]
  );

  // Обёртки, которые сохраняют в localStorage
  const setUser = useCallback((next) => {
    setUserState((prev) => {
      const value = typeof next === 'function' ? next(prev) : next;
      try {
        if (value) {
          localStorage.setItem('user', JSON.stringify(value));
          if (value.id) localStorage.setItem('userId', value.id);
        } else {
          localStorage.removeItem('user');
          localStorage.removeItem('userId');
        }
      } catch {}
      return value;
    });
  }, []);

  const setToken = useCallback((t) => {
    setTokenState(t);
    try {
      if (t) localStorage.setItem('token', t);
      else localStorage.removeItem('token');
    } catch {}
    // расписание авто-логаута и рефетч пользователя обрабатываются в эффекте ниже
  }, []);

  // При изменении токена: расписать авто-логаут и попытаться получить свежего пользователя
  useEffect(() => {
    if (!token) {
      // если токена нет — очистить
      clearLogoutTimer();
      setUserState((prev) => {
        try {
          localStorage.removeItem('user');
          localStorage.removeItem('userId');
        } catch {}
        return null;
      });
      setIsInitializing(false);
      return;
    }

    const expiry = getTokenExpiry(token);
    scheduleAutoLogout(expiry);

    const storedUserId = localStorage.getItem('userId');
    let mounted = true;
    (async () => {
      try {
        if (!storedUserId) {
          setIsInitializing(false);
          return;
        }
        const fresh = await fetchUser(storedUserId, token);
        if (mounted && fresh) {
          setUserState(fresh);
          try {
            localStorage.setItem('user', JSON.stringify(fresh));
            if (fresh.id) localStorage.setItem('userId', fresh.id);
          } catch {}
        }
      } catch (err) {
        console.error('AuthProvider: failed to fetch user', err);
      } finally {
        setIsInitializing(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [token, scheduleAutoLogout, clearLogoutTimer]);

  // Логин через useFetching — использует setUser / setToken обёртки
  const {
    fetching: login,
    isLoading,
    error,
  } = useFetching(async (credentials) => {
    const res = await authenticateUser(credentials);
    // сохраняем через обёртки
    setUser(res.user);
    setToken(res.token);
    const expiry = getTokenExpiry(res.token);
    scheduleAutoLogout(expiry);
  });

  const authValue = {
    user,
    token,
    setUser,
    setToken,
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
