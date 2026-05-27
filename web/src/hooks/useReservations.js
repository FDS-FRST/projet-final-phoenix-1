/**
 * useReservations.js - Hook pour gérer les réservations avec API réelle (Axios)
 */
import { useState, useEffect, useCallback } from "react";
import { fetchAllReservations, updateStatutReserv } from "../services/api";

const useReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Charger toutes les réservations
  const loadReservations = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetchAllReservations();
      const data = response.data;

      // Adapter les données pour le frontend
      const formattedData = data.map((res) => ({
        id: res.id,
        etudiantNom: res.nomEtudiant || res.etudiant?.name || "Étudiant",
        offreTitre: res.titreOffre || res.offre?.titre || "Offre",
        dateReservation:
          res.dateReservation?.substring(0, 10) ||
          new Date().toISOString().substring(0, 10),
        statut: res.statut,
        debutRetrait: res.debutRetrait?.substring(11, 16) || "",
        finRetrait: res.finRetrait?.substring(11, 16) || "",
      }));

      setReservations(formattedData);
    } catch (err) {
      console.error("Erreur chargement réservations:", err);
      setError(
        err.response?.data?.message ||
          "Erreur lors du chargement des réservations",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  // Changer le statut d'une réservation
  const changerStatut = async (id, nouveauStatut) => {
    setError(null);
    try {
      await updateStatutReserv(id, nouveauStatut);
      // Mettre à jour localement sans recharger
      setReservations((prev) =>
        prev.map((r) => (r.id === id ? { ...r, statut: nouveauStatut } : r)),
      );
      return { success: true };
    } catch (err) {
      console.error("Erreur changement statut:", err);
      setError(
        err.response?.data?.message || "Erreur lors du changement de statut",
      );
      return { success: false, error: err.response?.data?.message };
    }
  };

  useEffect(() => {
    loadReservations();
  }, [loadReservations]);

  return {
    reservations,
    loading,
    error,
    changerStatut,
    refreshReservations: loadReservations,
  };
};

export default useReservations;
