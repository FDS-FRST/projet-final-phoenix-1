/**
 * Navbar.jsx — Barre de navigation FoodShare (côté Offreur)
 * Affiche : Logo | Role badge | Notifications | Avatar | Déconnexion
 */
import  { useState } from "react";
import { Bell, Salad } from "lucide-react";
import NotificationPanel from "../NotificationPanel/NotificationPanel";
import useNotifications from "../../hooks/useNotifications";

const Navbar = ({ offreurNom = "Mon restaurant", onLogout }) => {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    removeNotification,
  } = useNotifications();

  return (
    <nav
      style={{
        background: "#F0F4F1",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "12px 24px",
        borderBottom: "1px solid #e5ede9",
        borderRadius: "24px 24px 0 0",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}
    >
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div
          style={{
            width: 36,
            height: 36,
            background: "#2D7A4F",
            borderRadius: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 18,
          }}
        >
          <Salad size={20} color="white" />
        </div>
        <span
          style={{
            fontSize: 20,
            fontWeight: 800,
            color: "#1B4332",
            letterSpacing: -0.5,
          }}
        >
          Food<span style={{ color: "#4CAF7D" }}>Share</span>
        </span>
      </div>

      {/* Centre : nom offreur */}
      <span style={{ fontSize: 13, color: "#6B7280", fontWeight: 500 }}>
        {offreurNom}
      </span>

      {/* Actions */}
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <span
          style={{
            background: "#E8F5EE",
            color: "#2D7A4F",
            fontSize: 11,
            fontWeight: 700,
            padding: "4px 12px",
            borderRadius: 999,
          }}
        >
          OFFREUR
        </span>

        {/* Notif */}
        <div style={{ position: "relative" }}>
          <button
            onClick={() => setIsNotificationOpen(!isNotificationOpen)}
            style={{
              background: "#f5f5f5",
              border: "none",
              borderRadius: "50%",
              width: 36,
              height: 36,
              cursor: "pointer",
            }}
          >
            <Bell size={20} color="#666" />
          </button>
          <span
            style={{
              position: "absolute",
              top: 4,
              right: 4,
              width: 8,
              height: 8,
              background: "#F97316",
              borderRadius: "50%",
              border: "2px solid #fff",
            }}
          />
        </div>
        {/* Panneau de notifications */}
        <NotificationPanel
          isOpen={isNotificationOpen}
          onClose={() => setIsNotificationOpen(false)}
          notifications={notifications}
          unreadCount={unreadCount}
          onMarkAsRead={markAsRead}
          onMarkAllAsRead={markAllAsRead}
          onRemove={removeNotification}
        />
        {/* Déconnexion */}
        <button
          onClick={onLogout}
          style={{
            background: "#FEF2F2",
            color: "#EF4444",
            border: "none",
            borderRadius: 8,
            padding: "6px 14px",
            fontSize: 12,
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Déconnexion
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
