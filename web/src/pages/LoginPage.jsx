/**
 * LoginPage.jsx - Page pour se connecter ou s'inscrire
 */

import  { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Salad } from "lucide-react";

const LoginPage = () => {
  const [isRegister, setIsRegister] = useState(false); // Mode connexion ou inscription
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nom, setNom] = useState(""); // Pour l'inscription (nom du restaurant)

  const { login, register, error, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Tentative de connexion avec:", email, password);

    let result;
    if (isRegister) {
      console.log("Mode inscription");
      result = await register({
        email,
        password,
        nom,
        role: "OFFREUR",
      });
    } else {
      console.log("Mode connexion");
      result = await login(email, password);
    }

    console.log("Résultat:", result);

    if (result.success) {
      console.log("Redirection vers dashboard");
      navigate("/");
    } else {
      console.log("Erreur:", result.error);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #1B4332 0%, #2D7A4F 100%)",
      }}
    >
      <div
        style={{
          background: "white",
          borderRadius: 24,
          padding: 40,
          width: "100%",
          maxWidth: 400,
          boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
        }}
      >
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div
            style={{
              width: 60,
              height: 60,
              background: "#2D7A4F",
              borderRadius: 20,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 32,
              marginBottom: 16,
            }}
          >
            <Salad size={37} color="white" />
          </div>
          <h1
            style={{
              color: "#1B4332",
              marginBottom: 8,
              fontWeight: 700,
              letterSpacing: "-4px",
            }}
          >
            Food<span style={{ color: "#4CAF7D", fontWeight: 700 }}>Share</span>
          </h1>
          <br />
          <p style={{ color: "#6B7280", fontSize: 14 }}>
            {isRegister ? "Créer un compte offreur" : "Connexion offreur"}
          </p>
        </div>

        {/* Message d'erreur */}
        {error && (
          <div
            style={{
              background: "#FEF2F2",
              color: "#EF4444",
              padding: 12,
              borderRadius: 8,
              fontSize: 12,
              marginBottom: 16,
            }}
          >
            ⚠️ {error}
          </div>
        )}

        {/* Comptes de démonstration (pour tester) */}
        <div
          style={{
            background: "#F0FDF4",
            borderRadius: 12,
            padding: 12,
            marginBottom: 20,
            border: "1px solid #BBF7D0",
          }}
        >
          <p
            style={{
              fontSize: 11,
              color: "#166534",
              marginBottom: 8,
              fontWeight: 600,
            }}
          >
            🔐 Comptes de test :
          </p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <button
              type="button"
              onClick={() => {
                setEmail("resto@foodshare.com");
                setPassword("password123");
              }}
              style={{
                background: "#DCFCE7",
                border: "none",
                borderRadius: 6,
                padding: "4px 8px",
                fontSize: 10,
                cursor: "pointer",
                color: "#166534",
              }}
            >
              🥗 resto@foodshare.com
            </button>
            <button
              type="button"
              onClick={() => {
                setEmail("cafe@foodshare.com");
                setPassword("password123");
              }}
              style={{
                background: "#DCFCE7",
                border: "none",
                borderRadius: 6,
                padding: "4px 8px",
                fontSize: 10,
                cursor: "pointer",
                color: "#166534",
              }}
            >
              ☕ cafe@foodshare.com
            </button>
          </div>
        </div>

        {/* Formulaire */}
        <form onSubmit={handleSubmit}>
          {isRegister && (
            <div style={{ marginBottom: 16 }}>
              <label
                style={{
                  display: "block",
                  fontSize: 12,
                  fontWeight: 600,
                  color: "#374151",
                  marginBottom: 4,
                }}
              >
                Nom du restaurant
              </label>
              <input
                type="text"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  border: "1px solid #E5E7EB",
                  borderRadius: 16,
                  fontSize: 14,
                }}
                placeholder="Mon restaurant"
              />
            </div>
          )}

          <div style={{ marginBottom: 16 }}>
            <label
              style={{
                display: "block",
                fontSize: 12,
                fontWeight: 600,
                color: "#374151",
                marginBottom: 4,
              }}
            >
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "10px 12px",
                border: "1px solid #E5E7EB",
                borderRadius: 16,
                fontSize: 14,
              }}
              placeholder="restaurant@email.com"
            />
          </div>

          <div style={{ marginBottom: 24 }}>
            <label
              style={{
                display: "block",
                fontSize: 12,
                fontWeight: 600,
                color: "#374151",
                marginBottom: 4,
              }}
            >
              Mot de passe
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "10px 12px",
                border: "1px solid #E5E7EB",
                borderRadius: 16,
                fontSize: 14,
              }}
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "auto", // ← Auto = largeur du contenu
              background: "#2D7A4F",
              color: "white",
              border: "none",
              borderRadius: 16,
              padding: "10px 24px", // ← 10px haut/bas, 24px gauche/droite
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer",
              marginBottom: 16,
              display: "block", // ← Pour pouvoir centrer
              marginLeft: "auto", // ← Centre horizontalement
              marginRight: "auto", // ← Centre horizontalement
            }}
          >
            {loading
              ? "Chargement..."
              : isRegister
                ? "S'inscrire"
                : "Se connecter"}
          </button>

          <button
            type="button"
            onClick={() => setIsRegister(!isRegister)}
            style={{
              width: "100%",
              background: "transparent",
              border: "none",
              color: "#2D7A4F",
              fontSize: 12,
              cursor: "pointer",
              textDecoration: "underline",
            }}
          >
            {isRegister
              ? "Déjà un compte ? Se connecter"
              : "Pas de compte ? S'inscrire"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
