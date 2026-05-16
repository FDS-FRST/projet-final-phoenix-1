/**
 * ReservationTable.jsx — Tableau des réservations reçues
 * Props :
 *   reservations  : array
 *   loading       : boolean
 *   onChangerStatut : (id, statut) => void
 */
import "react";
import { ReceiptText } from "lucide-react";

// Couleurs selon le statut de la réservation
const STATUT_CONFIG = {
  EN_ATTENTE: { label: "En attente", bg: "#FEF3C7", color: "#92400E" },
  RETIREE: { label: "Retirée", bg: "#DCFCE7", color: "#166534" },
  NON_RETIREE: { label: "Non retirée", bg: "#FEE2E2", color: "#991B1B" },
};

const ReservationTable = ({ reservations, loading, onChangerStatut }) => (
  <div
    style={{
      background: "#fff",
      borderRadius: 14,
      overflow: "hidden",
      boxShadow: "0 2px 8px rgba(0,0,0,.07)",
    }}
  >
    {/* Header */}
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "12px 16px",
        borderBottom: "1px solid #F0F4F1",
      }}
    >
      <span style={{ fontSize: 13, fontWeight: 700, color: "#1B4332" }}>
        <ReceiptText size={12} color="#1B4332" /> Réservations reçues
      </span>
      <span style={{ fontSize: 11, color: "#6B7280" }}>
        {reservations.length} au total
      </span>
    </div>

    {/* Loading */}
    {loading && (
      <div
        style={{
          padding: 24,
          textAlign: "center",
          color: "#9CA3AF",
          fontSize: 13,
        }}
      >
        Chargement…
      </div>
    )}

    {/* Table */}
    {!loading && (
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#FAFCFB" }}>
              {[
                "Étudiant",
                "Offre",
                "Créneau",
                "Réservé le",
                "Statut",
                "Action",
              ].map((h) => (
                <th
                  key={h}
                  style={{
                    fontSize: 10,
                    fontWeight: 600,
                    color: "#6B7280",
                    textTransform: "uppercase",
                    letterSpacing: ".5px",
                    padding: "8px 14px",
                    textAlign: "left",
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {reservations.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  style={{
                    textAlign: "center",
                    padding: 24,
                    color: "#9CA3AF",
                    fontSize: 13,
                  }}
                >
                  Aucune réservation
                </td>
              </tr>
            )}
            {reservations.map((r) => {
              const cfg = STATUT_CONFIG[r.statut] || STATUT_CONFIG.EN_ATTENTE;
              return (
                <tr
                  key={r.id}
                  style={{ borderTop: "1px solid #F3F5F3" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "#F8FBF9")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "transparent")
                  }
                >
                  <td
                    style={{ padding: "9px 14px", fontSize: 12, color: "#111" }}
                  >
                    {r.etudiantNom}
                  </td>
                  <td
                    style={{
                      padding: "9px 14px",
                      fontSize: 12,
                      color: "#374151",
                    }}
                  >
                    {r.offreTitre}
                  </td>
                  <td
                    style={{
                      padding: "9px 14px",
                      fontSize: 11,
                      color: "#6B7280",
                    }}
                  >
                    {r.debutRetrait}–{r.finRetrait}
                  </td>
                  <td
                    style={{
                      padding: "9px 14px",
                      fontSize: 11,
                      color: "#6B7280",
                    }}
                  >
                    {r.dateReservation || "—"}
                  </td>
                  <td style={{ padding: "9px 14px" }}>
                    <span
                      style={{
                        background: cfg.bg,
                        color: cfg.color,
                        fontSize: 10,
                        fontWeight: 700,
                        padding: "3px 9px",
                        borderRadius: 999,
                      }}
                    >
                      {cfg.label}
                    </span>
                  </td>
                  <td style={{ padding: "9px 14px" }}>
                    {r.statut === "EN_ATTENTE" && (
                      <div style={{ display: "flex", gap: 6 }}>
                        <button
                          onClick={() => onChangerStatut?.(r.id, "RETIREE")}
                          style={{
                            background: "#DCFCE7",
                            color: "#166534",
                            border: "none",
                            borderRadius: 6,
                            padding: "3px 9px",
                            fontSize: 10,
                            fontWeight: 600,
                            cursor: "pointer",
                          }}
                        >
                          ✓ Retirée
                        </button>
                        <button
                          onClick={() => onChangerStatut?.(r.id, "NON_RETIREE")}
                          style={{
                            background: "#FEE2E2",
                            color: "#991B1B",
                            border: "none",
                            borderRadius: 6,
                            padding: "3px 9px",
                            fontSize: 10,
                            fontWeight: 600,
                            cursor: "pointer",
                          }}
                        >
                          ✗ Non retirée
                        </button>
                      </div>
                    )}
                    {r.statut !== "EN_ATTENTE" && (
                      <span style={{ color: "#D1D5DB", fontSize: 11 }}>—</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    )}
  </div>
);

export default ReservationTable;
