/**
 * useOffres.js - Hook pour gérer les offres avec API réelle (Axios)
 */
import { useState, useEffect, useCallback } from "react";
import {
  fetchOffres,
  createOffre,
  updateOffre,
  deleteOffre,
} from "../services/api";

const useOffres = () => {
  const [offres, setOffres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Formater l'heure ISO (2025-05-22T12:00:00 → "12:00")
  const formatTime = (dateString) => {
    if (!dateString) return "";
    return dateString.substring(11, 16);
  };

  // Charger les offres
  const loadOffres = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetchOffres();
      const data = response.data;

      // Adapter les données pour le frontend
      const formattedData = data.map((offre) => ({
        id: offre.id,
        titre: offre.titre,
        description: offre.description,
        quantiteInitiale: offre.quantiteInitiale,
        quantiteRestante: offre.quantiteRestante,
        prix: offre.prix,
        debutRetrait: formatTime(offre.debutRetrait),
        finRetrait: formatTime(offre.finRetrait),
        lieu: offre.lieu,
        offreurNom: offre.offreurNom,
      }));

      setOffres(formattedData);
    } catch (err) {
      console.error("Erreur chargement offres:", err);
      setError(
        err.response?.data?.message || "Erreur lors du chargement des offres",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  // Ajouter une offre
  // Dans la fonction addOffre, modifie le payload :
  const addOffre = async (offreData) => {
    setLoading(true);
    setError(null);
    try {
      const today = new Date().toISOString().split("T")[0];

      // Récupère l'ID de l'utilisateur connecté
      const user = JSON.parse(localStorage.getItem("foodshare_user") || "{}");
      const offreurId = user.id;

      if (!offreurId) {
        throw new Error("Vous devez être connecté pour créer une offre");
      }

      const payload = {
        titre: offreData.titre,
        description: offreData.description || "",
        quantiteInitiale: parseInt(offreData.quantiteInitiale),
        prix: parseFloat(offreData.prix) || 0,
        debutRetrait: `${today}T${offreData.debutRetrait}:00`,
        finRetrait: `${today}T${offreData.finRetrait}:00`,
        lieu: offreData.lieu,
        offreurId: offreurId, // ← AJOUTE CETTE LIGNE
      };

      await createOffre(payload);
      await loadOffres();
      return { success: true };
    } catch (err) {
      console.error("Erreur ajout offre:", err);
      setError(err.response?.data?.message || "Erreur lors de l'ajout");
      return { success: false, error: err.response?.data?.message };
    } finally {
      setLoading(false);
    }
  };

  // Modifier une offre
  const editOffre = async (id, offreData) => {
    setLoading(true);
    setError(null);
    try {
      await updateOffre(id, offreData);
      await loadOffres();
      return { success: true };
    } catch (err) {
      console.error("Erreur modification offre:", err);
      setError(err.response?.data?.message || "Erreur lors de la modification");
      return { success: false, error: err.response?.data?.message };
    } finally {
      setLoading(false);
    }
  };

  // Supprimer une offre
  const removeOffre = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await deleteOffre(id);
      await loadOffres();
      return { success: true };
    } catch (err) {
      console.error("Erreur suppression offre:", err);
      setError(err.response?.data?.message || "Erreur lors de la suppression");
      return { success: false, error: err.response?.data?.message };
    } finally {
      setLoading(false);
    }
  };

  // Charger au montage
  useEffect(() => {
    loadOffres();
  }, [loadOffres]);

  return {
    offres,
    loading,
    error,
    addOffre,
    editOffre,
    removeOffre,
    refreshOffres: loadOffres,
  };
};;

export default useOffres;
