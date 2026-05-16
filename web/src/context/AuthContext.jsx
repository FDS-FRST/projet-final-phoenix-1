import  { createContext, useState, useContext, useEffect } from "react";
import {
  login as apiLogin,
  register as apiRegister,
  getCurrentUser,
} from "../services/authService";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      "useAuth doit être utilisé à l'intérieur d'un AuthProvider",
    );
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // ← DOIT être true au départ
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkUser = async () => {
      const token = localStorage.getItem("token");
      console.log("Token trouvé:", token); // ← Pour debug

      if (token) {
        try {
          const userData = await getCurrentUser();
          console.log("Utilisateur chargé:", userData); // ← Pour debug
          setUser(userData);
        } catch (err) {
          console.log("Erreur:", err); // ← Pour debug
          localStorage.removeItem("token");
          setUser(null);
        }
      }
      setLoading(false); // ← On dit que le chargement est fini
    };

    checkUser();
  }, []);

  const login = async (email, password) => {
    setError(null);
    setLoading(true);
    try {
      const response = await apiLogin(email, password);
      localStorage.setItem("token", response.token);
      setUser(response.user);
      console.log("Connexion réussie:", response.user); // ← Pour debug
      return { success: true, user: response.user };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    setError(null);
    setLoading(true);
    try {
      const response = await apiRegister(userData);
      localStorage.setItem("token", response.token);
      setUser(response.user);
      return { success: true, user: response.user };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    console.log("Déconnexion"); // ← Pour debug
  };

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    isOffreur: user?.role === "OFFREUR",
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
