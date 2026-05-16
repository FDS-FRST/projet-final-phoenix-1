import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";

// Pages
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";

// Components
import Navbar from "./components/Navbar/Navbar";
import OfferModal from "./components/OfferModal/OfferModal";

// Ce composant gère l'affichage selon connexion
function AppContent() {
  const { isAuthenticated, logout, user } = useAuth();

  return (
    <div
      style={{
        display: "flex",
        background: "#1B4332",
        flexDirection: "column",
        minHeight: "100vh",
        borderRadius: "0 0 24px 24px",
        overflow: "hidden",
      }}
    >
      {/* Navbar - On passe le nom et la fonction de déconnexion */}
      {isAuthenticated && (
        <Navbar offreurNom={user?.nom || "Mon restaurant"} onLogout={logout} />
      )}

      {/* Contenu principal */}
      <div style={{ flex: 1, padding: "0px", borderRadius: "0 0 24px 24px" }}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/"
            element={isAuthenticated ? <DashboardPage /> : <LoginPage />}
          />
        </Routes>
      </div>

      <OfferModal />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <style>
          {`
            body, #root {
              background: linear-gradient(135deg, #1B4332 0%, #1b4332 100%) !important;
            }
          `}
        </style>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;
