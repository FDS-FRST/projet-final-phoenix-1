import { useState, useEffect } from "react";
import { MOCK_RESERVATIONS } from "../services/mockData";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const useReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadReservations = async () => {
    setLoading(true);
    try {
      await delay(800);
      setReservations([...MOCK_RESERVATIONS]);
    } catch (err) {
      console.error("Erreur chargement réservations:", err);
    } finally {
      setLoading(false);
    }
  };

  const changerStatut = async (id, nouveauStatut) => {
    setLoading(true);
    try {
      await delay(500);
      setReservations((prev) =>
        prev.map((r) => (r.id === id ? { ...r, statut: nouveauStatut } : r)),
      );
      return { success: true };
    } catch (err) {
      console.error("Erreur changement statut:", err);
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReservations();
  }, []);

  return {
    reservations,
    loading,
    changerStatut,
    refreshReservations: loadReservations,
  };
};

export default useReservations;
