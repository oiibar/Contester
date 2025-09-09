import { useContext, createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useFetching } from '../fetching/useFetching';
import { authenticateUser } from '../../api/api';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [token, setToken] = useState(localStorage.getItem('site') || '');

  const {
    fetching: loginAction,
    isLoading,
    error,
  } = useFetching(async (data) => {
    const res = await authenticateUser(data);
    setUser(res.user);
    setToken(res.token);

    localStorage.setItem('site', res.token);
    localStorage.setItem('user', JSON.stringify(res.user));

    navigate('/');
  });

  const logOut = () => {
    setUser(null);
    setToken('');
    localStorage.removeItem('site');
    localStorage.removeItem('user');
    navigate('/login');
  };

  useEffect(() => {
    if (!token) {
      logOut();
    }
  }, [token]);

  return (
    <AuthContext.Provider
      value={{ token, user, setUser, loginAction, logOut, isLoading, error }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
