/**
 * api.js — Service Axios centralisé
 * Base URL : http://localhost:8080/api
 *
 * Endpoints utilisés :
 *   GET    /offres                 → liste des offres de l'offreur connecté
 *   POST   /offres                 → créer une offre
 *   PUT    /offres/:id             → modifier une offre
 *   DELETE /offres/:id             → supprimer une offre
 *
 *   GET    /reservations/offre/:id → réservations d'une offre
 *   PATCH  /reservations/:id/statut → mettre à jour le statut (RETIREE / NON_RETIREE)
 *
 *   POST   /auth/login             → connexion → renvoie { token, role }
 *   POST   /auth/register          → inscription
 */
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
  timeout: 8000,
  headers: { "Content-Type": "application/json" },
});

// ── Intercepteur : injecte le token JWT dans chaque requête ────────────────
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("foodshare_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ── Intercepteur : gestion globale des erreurs ────────────────────────────
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem("foodshare_token");
      window.location.href = "/login";
    }
    return Promise.reject(err);
  },
);

// ── AUTH ──────────────────────────────────────────────────────────────────
export const login = (credentials) => api.post("/auth/login", credentials);
export const register = (userData) => api.post("/auth/register", userData);

// ── OFFRES ────────────────────────────────────────────────────────────────
export const fetchOffres = () => api.get("/offres");
export const createOffre = (data) => api.post("/offres", data);
export const updateOffre = (id, data) => api.put(`/offres/${id}`, data);
export const deleteOffre = (id) => api.delete(`/offres/${id}`);

// ── RÉSERVATIONS ──────────────────────────────────────────────────────────
export const fetchReservations = (offreId) =>
  api.get(`/reservations/offre/${offreId}`);
export const fetchAllReservations = () => api.get("/reservations/mes-offres");
export const updateStatutReserv = (id, statut) =>
  api.patch(`/reservations/${id}/statut`, { statut });

export default api;
