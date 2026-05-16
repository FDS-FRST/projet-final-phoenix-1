import { useState, useEffect } from "react";
import { MOCK_OFFRES } from "../services/mockData";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const useOffres = () => {
  const [offres, setOffres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadOffres = async () => {
    setLoading(true);
    try {
      await delay(800);
      setOffres([...MOCK_OFFRES]);
      setError(null);
    } catch (err) {
      setError("Erreur de chargement des offres");
    } finally {
      setLoading(false);
    }
  };

  const addOffre = async (offreData) => {
    setLoading(true);
    try {
      await delay(800);
      const newOffre = {
        id: Date.now(),
        ...offreData,
        quantiteRestante: offreData.quantiteInitiale,
      };
      setOffres((prev) => [newOffre, ...prev]);
      return { success: true };
    } catch (err) {
      setError("Erreur lors de l'ajout");
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const removeOffre = async (id) => {
    setLoading(true);
    try {
      await delay(800);
      setOffres((prev) => prev.filter((o) => o.id !== id));
      return { success: true };
    } catch (err) {
      setError("Erreur lors de la suppression");
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOffres();
  }, []);

  return {
    offres,
    loading,
    error,
    addOffre,
    removeOffre,
    refreshOffres: loadOffres,
  };
};

export default useOffres;
