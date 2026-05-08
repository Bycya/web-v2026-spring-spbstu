import { createContext, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import api from "../api/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useLocalStorage("user", null);

  const login = async (login, password) => {
    const response = await api.post("/login", { login, password });
    setUser(response.data);
    return response.data;
  };

  const logout = async () => {
    try {
      await api.post("/logout");
    } catch {
      // ignore
    }
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
