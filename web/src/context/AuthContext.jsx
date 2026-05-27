/**
 * AuthContext.jsx - Gestion authentification avec API Axios
 */
import React, { createContext, useState, useContext, useEffect } from "react";
import { login as apiLogin, register as apiRegister } from "../services/api";

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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Vérifier si un utilisateur est déjà connecté
  useEffect(() => {
    const token = localStorage.getItem("foodshare_token");
    const storedUser = localStorage.getItem("foodshare_user");

    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Connexion

  // const login = async (email, password) => {
  //   setError(null);
  //   setLoading(true);
  //   try {
  //     const response = await apiLogin({ email, password });
  //     const { token, user: userData } = response.data;

  //     localStorage.setItem("foodshare_token", token);
  //     localStorage.setItem("foodshare_user", JSON.stringify(userData));
  //     setUser(userData);

  //     return { success: true, user: userData };
  //   } catch (err) {
  //     const message = err.response?.data?.message || "Erreur de connexion";
  //     setError(message);
  //     return { success: false, error: message };
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  //à remplacer après implementation spring auth
  const login = async (email, password) => {
    setError(null);
    setLoading(true);
    try {
      // Pour tester, on crée un faux utilisateur
      const fakeUser = {
        id: 1,
        name: "Test Restaurant",
        email: email,
        role: "OFFREUR",
      };

      localStorage.setItem("foodshare_token", "fake-token-123");
      localStorage.setItem("foodshare_user", JSON.stringify(fakeUser));
      setUser(fakeUser);

      return { success: true, user: fakeUser };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };
  // Inscription
  const register = async (userData) => {
    setError(null);
    setLoading(true);
    try {
      const response = await apiRegister(userData);
      const { token, user: newUser } = response.data;

      localStorage.setItem("foodshare_token", token);
      localStorage.setItem("foodshare_user", JSON.stringify(newUser));
      setUser(newUser);

      return { success: true, user: newUser };
    } catch (err) {
      const message = err.response?.data?.message || "Erreur d'inscription";
      setError(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  // Déconnexion
  const logout = () => {
    localStorage.removeItem("foodshare_token");
    localStorage.removeItem("foodshare_user");
    setUser(null);
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
