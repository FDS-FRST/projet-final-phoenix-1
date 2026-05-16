/**
 * NotificationPanel.jsx - Panneau des notifications clients
 */
import "react";
import { Bell, CheckCheck, X, Clock, User, Calendar } from "lucide-react";

const NotificationPanel = ({
  isOpen,
  onClose,
  notifications,
  unreadCount,
  onMarkAsRead,
  onMarkAllAsRead,
  onRemove,
}) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Overlay sombre */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          top: 0,
          left: 0,  
          right: 0,
          bottom: 0,
          background: "rgba(0,0,0,0.2)",
          backdropFilter: "blur(2px)",
          WebkitBackdropFilter: "blur(2px)",
          zIndex: 999,
        }}
      />

      {/* Panneau de notifications */}
      <div
        style={{
          position: "absolute",
          top: "70px",
          right: "20px",
          width: "380px",
          maxWidth: "calc(100vw - 40px)",
          background: "white",
          borderRadius: "16px",
          boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
          zIndex: 1000,
          overflow: "hidden",
        }}
      >
        {/* En-tête */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "16px",
            borderBottom: "1px solid #E5EDE9",
            background: "#fff",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Bell size={18} color="#2D7A4F" />
            <span
              style={{ fontWeight: 700, color: "#1B4332", fontSize: "14px" }}
            >
              Notifications
            </span>
            {unreadCount > 0 && (
              <span
                style={{
                  background: "#F97316",
                  color: "white",
                  fontSize: "10px",
                  fontWeight: 600,
                  padding: "2px 8px",
                  borderRadius: "20px",
                }}
              >
                {unreadCount} nouvelle{unreadCount > 1 ? "s" : ""}
              </span>
            )}
          </div>

          {unreadCount > 0 && (
            <button
              onClick={onMarkAllAsRead}
              style={{
                background: "none",
                border: "none",
                fontSize: "11px",
                color: "#2D7A4F",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              <CheckCheck size={12} />
              Tout lire
            </button>
          )}
        </div>

        {/* Liste des notifications */}
        <div
          style={{
            maxHeight: "400px",
            overflowY: "auto",
          }}
        >
          {notifications.length === 0 ? (
            <div
              style={{
                padding: "40px 20px",
                textAlign: "center",
                color: "#9CA3AF",
              }}
            >
              <Bell size={32} style={{ marginBottom: "8px", opacity: 0.5 }} />
              <p style={{ fontSize: "13px" }}>Aucune notification</p>
              <p style={{ fontSize: "11px" }}>Les commandes apparaîtront ici</p>
            </div>
          ) : (
            notifications.map((notif) => (
              <div
                key={notif.id}
                onClick={() => onMarkAsRead(notif.id)}
                style={{
                  padding: "14px 16px",
                  borderBottom: "1px solid #F0F4F1",
                  background: notif.read ? "#fff" : "#F0FDF4",
                  cursor: "pointer",
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#F8FBF9";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = notif.read
                    ? "#fff"
                    : "#F0FDF4";
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        marginBottom: "6px",
                        flexWrap: "wrap",
                      }}
                    >
                      <span style={{ fontSize: "14px" }}>🍽️</span>
                      <span
                        style={{
                          fontWeight: 700,
                          fontSize: "12px",
                          color: "#1B4332",
                        }}
                      >
                        {notif.title}
                      </span>
                      {!notif.read && (
                        <span
                          style={{
                            width: "8px",
                            height: "8px",
                            background: "#F97316",
                            borderRadius: "50%",
                            display: "inline-block",
                          }}
                        />
                      )}
                    </div>

                    <p
                      style={{
                        fontSize: "11px",
                        color: "#374151",
                        marginBottom: "8px",
                      }}
                    >
                      {notif.message}
                    </p>

                    {/* Infos : client + date + heure (sans retrait) */}
                    <div
                      style={{
                        display: "flex",
                        gap: "12px",
                        fontSize: "10px",
                        color: "#9CA3AF",
                        flexWrap: "wrap",
                      }}
                    >
                      <span
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "3px",
                        }}
                      >
                        <User color="#1B4332" size={12} /> {notif.client}
                      </span>
                      <span
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "3px",
                        }}
                      >
                        <Calendar color="#1B4332" size={12} />{" "}
                        {notif.dateCommande}
                      </span>
                      <span
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "3px",
                        }}
                      >
                        <Clock color="#1B4332" size={12} />{" "}
                        {notif.heureCommande}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemove(notif.id);
                    }}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      color: "#9CA3AF",
                      padding: "4px",
                      borderRadius: "4px",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background = "#FEE2E2")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = "none")
                    }
                  >
                    <X size={12} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pied */}
        {notifications.length > 0 && (
          <div
            style={{
              padding: "12px 16px",
              borderTop: "1px solid #E5EDE9",
              background: "#FAFCFB",
              textAlign: "center",
            }}
          >
            <span style={{ fontSize: "10px", color: "#9CA3AF" }}>
              {unreadCount} commande{unreadCount > 1 ? "s" : ""} en attente de
              confirmation
            </span>
          </div>
        )}
      </div>
    </>
  );
};

export default NotificationPanel;
