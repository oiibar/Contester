import { useContext, createContext, useState, useEffect, ReactNode } from "react";
import { useNavigate } from "react-router";
import { useFetching } from "./useFetching";
import { authenticateUser } from "../api/api";

interface User {
  [key: string]: any;
}

interface AuthContextType {
  token: string;
  user: User | null;
  setUser: (user: User | null) => void;
  loginAction: (data: any) => Promise<void>;
  logOut: () => void;
  isLoading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [token, setToken] = useState(localStorage.getItem("site") || "");

  const { fetching: loginAction, isLoading, error } = useFetching(async (data: any) => {
    const res:any = await authenticateUser(data);
    setUser(res.user);
    setToken(res.token);

    localStorage.setItem("site", res.token);
    localStorage.setItem("user", JSON.stringify(res.user));

    navigate("/");
  });

  const logOut = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("site");
    localStorage.removeItem("user");
    navigate("/login");
  };

  useEffect(() => {
    if (!token) {
      logOut();
    }
  }, [token]);

  return (
      <AuthContext.Provider value={{ token, user, setUser, loginAction, logOut, isLoading, error }}>
        {children}
      </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};