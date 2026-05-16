/**
 * OfferCard.jsx — Carte d'une offre alimentaire
 * Props :
 *   offre       : { id, titre, quantiteInitiale, quantiteRestante, prix, debutRetrait, finRetrait, lieu }
 *   onEdit      : (offre) => void
 *   onDelete    : (id) => void
 */
import "react";
import { FilePenLine, AlarmClock, MapPin } from "lucide-react";
// Détermine l'emoji et le fond selon le type d'offre
const getCardStyle = (offre) => {
  if (offre.quantiteRestante === 0)
    return {
      bg: "#FEE2E2",
      emoji: "🍕",
      badge: "ÉPUISÉ",
      badgeBg: "#FEE2E2",
      badgeColor: "#991B1B",
    };
  if (offre.quantiteRestante <= 2)
    return {
      bg: "#FFF3E8",
      emoji: "🥐",
      badge: "URGENT",
      badgeBg: "#FEF3C7",
      badgeColor: "#92400E",
    };
  if (offre.prix === 0)
    return {
      bg: "#E8F0FF",
      emoji: "🎁",
      badge: "DON",
      badgeBg: "#EDE9FE",
      badgeColor: "#5B21B6",
    };
  return {
    bg: "#E8F5EE",
    emoji: "🥗",
    badge: "ACTIF",
    badgeBg: "#DCFCE7",
    badgeColor: "#166534",
  };
};

const OfferCard = ({ offre, onEdit, onDelete, style = {} }) => {
  const { bg, emoji, badge, badgeBg, badgeColor } = getCardStyle(offre);
  const ratio =
    offre.quantiteInitiale > 0
      ? (offre.quantiteRestante / offre.quantiteInitiale) * 100
      : 0;
  const barColor = ratio > 30 ? "#4CAF7D" : ratio > 10 ? "#F97316" : "#EF4444";

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 14,
        overflow: "hidden",
        boxShadow: "0 2px 8px rgba(0,0,0,.08)",
        transition: "transform .2s, box-shadow .2s",
        cursor: "pointer",
        ...style,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-3px)";
        e.currentTarget.style.boxShadow = "0 8px 24px rgba(45,122,79,.18)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,.08)";
      }}
    >
      {/* Image / emoji zone */}
      <div
        style={{
          background: bg,
          height: 90,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          fontSize: 36,
        }}
      >
        <span
          style={{
            position: "absolute",
            top: 8,
            left: 8,
            background: badgeBg,
            color: badgeColor,
            fontSize: 9,
            fontWeight: 700,
            padding: "3px 8px",
            borderRadius: 6,
          }}
        >
          {badge}
        </span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit?.(offre);
          }}
          style={{
            position: "absolute",
            top: 6,
            right: 6,
            background: "rgba(255,255,255,.85)",
            border: "none",
            borderRadius: "50%",
            width: 24,
            height: 24,
            cursor: "pointer",
            fontSize: 12,
          }}
        >
          <FilePenLine size={16} color="#1B4332" />
        </button>
        {emoji}
      </div>

      {/* Corps */}
      <div style={{ padding: "10px 12px" }}>
        <p
          style={{
            fontSize: 12,
            fontWeight: 700,
            color: "#1B4332",
            marginBottom: 4,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {offre.titre}
        </p>
        <p style={{ fontSize: 10, color: "#6B7280", marginBottom: 8 }}>
          <AlarmClock size={10} color="#000000" /> {offre.debutRetrait}–
          {offre.finRetrait} &nbsp;|&nbsp; <MapPin size={10} color="#000000" />{" "}
          {offre.lieu}
        </p>

        {/* Barre quantité + prix */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div
            style={{
              flex: 1,
              height: 4,
              background: "#E5E7EB",
              borderRadius: 2,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${ratio}%`,
                height: "100%",
                background: barColor,
                borderRadius: 2,
                transition: "width .5s",
              }}
            />
          </div>
          <span
            style={{
              fontSize: 11,
              fontWeight: 800,
              color: offre.prix === 0 ? "#6366F1" : "#2D7A4F",
              whiteSpace: "nowrap",
            }}
          >
            {offre.prix === 0 ? "Don" : `${offre.prix.toFixed(2)} €`}
          </span>
        </div>

        <p style={{ fontSize: 10, color: "#9CA3AF", marginTop: 4 }}>
          {offre.quantiteRestante} / {offre.quantiteInitiale} restantes
        </p>

        {/* Bouton supprimer */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete?.(offre.id);
          }}
          style={{
            marginTop: 8,
            width: "100%",
            background: "#FEF2F2",
            color: "#EF4444",
            border: "none",
            borderRadius: 8,
            padding: "5px 0",
            fontSize: 10,
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Supprimer
        </button>
      </div>
    </div>
  );
};

export default OfferCard;
