import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router";
import { useFetching } from "../hooks/useFetching";
import { authenticateUser } from "../api/api";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("site") || "");
  const navigate = useNavigate();

  const { fetching: loginAction, isLoading, error } = useFetching(async (data) => {
    const res = await authenticateUser(data);
    setUser(res.user);
    setToken(res.token);
    localStorage.setItem("site", res.token);
    navigate("/");
  });

  const logOut = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("site");
    navigate("/login");
  };

  return (
      <AuthContext.Provider value={{ token, user, loginAction, logOut, isLoading, error }}>
        {children}
      </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
