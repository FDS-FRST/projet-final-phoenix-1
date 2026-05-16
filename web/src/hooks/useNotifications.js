/**
 * useNotifications.js - Gère les notifications des commandes clients
 */
import { useState, useEffect } from "react";

// Données mockées des réservations (à remplacer par API plus tard)
const MOCK_RESERVATIONS_FOR_NOTIFS = [
  {
    id: 1,
    etudiantNom: "Alice Martin",
    offreTitre: "Pâtes Carbonara",
    debutRetrait: "12:00",
    finRetrait: "14:00",
    commandeDate: "2025-05-09T10:35:00",
    dateReservation: "2025-05-09",
    statut: "EN_ATTENTE",
  },
  {
    id: 2,
    etudiantNom: "Thomas Dubois",
    offreTitre: "Quiche Lorraine",
    debutRetrait: "12:00",
    finRetrait: "14:00",
    commandeDate: "2025-05-08T11:20:00",
    dateReservation: "2025-05-08",
    statut: "EN_ATTENTE",
  },
  {
    id: 3,
    etudiantNom: "Sophie Bernard",
    offreTitre: "Salade César",
    debutRetrait: "18:00",
    finRetrait: "19:30",
    commandeDate: "2025-05-07T09:15:00",
    dateReservation: "2025-05-07",
    statut: "RETIREE",
  },
  {
    id: 4,
    etudiantNom: "Lucas Petit",
    offreTitre: "Croissant",
    debutRetrait: "08:00",
    finRetrait: "10:00",
    commandeDate: new Date().toISOString(), // Aujourd'hui
    dateReservation: new Date().toISOString().split("T")[0],
    statut: "EN_ATTENTE",
  },
];

const useNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);

  // Formater l'heure (ex: "2025-05-09T10:35:00" → "10:35")
  const formatTime = (dateString) => {
    try {
      return new Date(dateString).toLocaleTimeString("fr-FR", {
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return "--:--";
    }
  };

  // Formater la date (ex: "2025-05-09" → "Aujourd'hui" ou "09/05/2025")
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      const today = new Date();

      // Comparer si c'est aujourd'hui (même année, mois, jour)
      const isToday = date.toDateString() === today.toDateString();

      if (isToday) {
        return "Aujourd'hui";
      }

      // Sinon afficher la date complète (jour/mois/année)
      return date.toLocaleDateString("fr-FR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    } catch {
      return "--/--/----";
    }
  };

  // Charger les notifications (réservations en attente)
  const loadNotifications = async () => {
    setLoading(true);
    try {
      // Simule un délai réseau
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Transforme les réservations EN_ATTENTE en notifications
      const newNotifications = MOCK_RESERVATIONS_FOR_NOTIFS.filter(
        (r) => r.statut === "EN_ATTENTE",
      ).map((r) => ({
        id: r.id,
        type: "nouvelle_commande",
        title: "Nouvelle commande 🍽️",
        message: `${r.etudiantNom} a commandé : ${r.offreTitre}`,
        plat: r.offreTitre,
        client: r.etudiantNom,
        heureCommande: formatTime(r.commandeDate),
        dateCommande: formatDate(r.commandeDate), // Affiche "Aujourd'hui" ou la date complète
        read: false,
        timestamp: r.commandeDate,
      }));

      setNotifications(newNotifications);
      setUnreadCount(newNotifications.filter((n) => !n.read).length);
    } catch (error) {
      console.error("Erreur chargement notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  // Marquer une notification comme lue
  const markAsRead = async (notificationId) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === notificationId ? { ...n, read: true } : n)),
    );
    setUnreadCount((prev) => {
      const notif = notifications.find((n) => n.id === notificationId);
      return notif && !notif.read ? Math.max(0, prev - 1) : prev;
    });
  };

  // Marquer toutes comme lues
  const markAllAsRead = async () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    setUnreadCount(0);
  };

  // Supprimer une notification
  const removeNotification = async (notificationId) => {
    setNotifications((prev) => {
      const notifToRemove = prev.find((n) => n.id === notificationId);
      if (notifToRemove && !notifToRemove.read) {
        setUnreadCount((count) => Math.max(0, count - 1));
      }
      return prev.filter((n) => n.id !== notificationId);
    });
  };

  useEffect(() => {
    loadNotifications();

    // Simule l'arrivée de nouvelles notifications toutes les 30 secondes
    const interval = setInterval(() => {
      loadNotifications();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return {
    notifications,
    unreadCount,
    loading,
    markAsRead,
    markAllAsRead,
    removeNotification,
    refreshNotifications: loadNotifications,
  };
};

export default useNotifications;
