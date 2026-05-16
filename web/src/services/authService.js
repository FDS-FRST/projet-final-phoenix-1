/**
 * authService.js - Version MOCK (fausses données pour tester)
 * À remplacer plus tard par la vraie API Spring Boot
 */

// 🎭 FAUX UTILISATEURS (simule une base de données)
const FAKE_USERS = [
  {
    id: 1,
    email: "resto@foodshare.com",
    password: "password123",
    nom: "Mon Super Restaurant",
    role: "OFFREUR",
  },
  {
    id: 2,
    email: "cafe@foodshare.com",
    password: "password123",
    nom: "Café Campus",
    role: "OFFREUR",
  },
];

// Simule un délai réseau (comme une vraie API)
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// 📝 S'inscrire (créer un compte offreur)
export const register = async (userData) => {
  await delay(800); // Simule l'attente réseau

  // Vérifie si l'email existe déjà
  const existingUser = FAKE_USERS.find((u) => u.email === userData.email);
  if (existingUser) {
    throw new Error("Cet email est déjà utilisé");
  }

  // Crée un nouvel utilisateur
  const newUser = {
    id: FAKE_USERS.length + 1,
    email: userData.email,
    nom: userData.nom,
    role: "OFFREUR",
  };

  // Ajoute à notre "base de données" (en mémoire seulement)
  FAKE_USERS.push({ ...newUser, password: userData.password });

  // Crée un faux token
  const fakeToken = `fake-token-${Date.now()}-${newUser.id}`;

  return {
    token: fakeToken,
    user: newUser,
  };
};

// 🔐 Se connecter
export const login = async (email, password) => {
  await delay(800); // Simule l'attente réseau

  // Cherche l'utilisateur
  const user = FAKE_USERS.find(
    (u) => u.email === email && u.password === password,
  );

  if (!user) {
    throw new Error("Email ou mot de passe incorrect");
  }

  // Crée un faux token
  const fakeToken = `fake-token-${Date.now()}-${user.id}`;

  // Retourne l'utilisateur SANS le mot de passe
  const { password: _, ...userWithoutPassword } = user;

  return {
    token: fakeToken,
    user: userWithoutPassword,
  };
};

// 👤 Récupérer l'utilisateur connecté
export const getCurrentUser = async () => {
  await delay(500);

  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Non authentifié");
  }

  // Extrait l'ID utilisateur du token (dans notre mock)
  const userId = token.split("-").pop();
  const user = FAKE_USERS.find((u) => u.id === parseInt(userId));

  if (!user) {
    throw new Error("Utilisateur non trouvé");
  }

  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

// 📞 Fonction pour appeler l'API (version mock)
export const authFetch = async (url, options = {}) => {
  await delay(300);

  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "/login";
    throw new Error("Non authentifié");
  }

  // Simule une réponse
  return {
    ok: true,
    json: async () => ({}),
    status: 200,
  };
};
