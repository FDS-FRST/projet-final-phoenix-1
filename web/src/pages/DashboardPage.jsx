/**
 * DashboardPage.jsx — Page principale du dashboard offreur
 * Assemblage : Sidebar (stats + filtres) + Grille offres + Tableau réservations
 */
import  { useState } from "react";
import OfferCard from "../components/OfferCard/OfferCard";
import OfferModal from "../components/OfferModal/OfferModal";
import ReservationTable from "../components/ReservationTable/ReservationTable";
import useOffres from "../hooks/useOffres";
import useReservations from "../hooks/useReservations";
import { ShieldAlert } from "lucide-react";
import HistoriquePage from "./HistoriquePage";
import StatistiquesPage from "./StatistiquesPage";

// ── Mini skeleton ──────────────────────────────────────────────────────────
const Skeleton = () => (
  <div
    style={{
      background: "#fff",
      borderRadius: 14,
      overflow: "hidden",
      animation: "pulse 1.5s infinite",
    }}
  >
    <div style={{ background: "#E8F0EB", height: 90 }} />
    <div style={{ padding: 12 }}>
      <div
        style={{
          height: 10,
          background: "#E8F0EB",
          borderRadius: 4,
          marginBottom: 8,
          width: "75%",
        }}
      />
      <div
        style={{
          height: 8,
          background: "#E8F0EB",
          borderRadius: 4,
          width: "50%",
        }}
      />
    </div>
  </div>
);

// ── Carte stat ─────────────────────────────────────────────────────────────
const StatCard = ({ label, value, sub }) => (
  <div
    className="stat-card"
    style={{
      background: "#fff",
      borderRadius: 12,
      padding: "12px 14px",
      boxShadow: "0 1px 4px rgba(0,0,0,.06)",
    }}
  >
    <p
      style={{
        fontSize: 10,
        color: "#6B7280",
        fontWeight: 500,
        marginBottom: 4,
      }}
    >
      {label}
    </p>
    <p style={{ fontSize: 22, fontWeight: 800, color: "#1B4332" }}>{value}</p>
    {sub && (
      <p
        style={{
          fontSize: 10,
          color: "#4CAF7D",
          fontWeight: 600,
          marginTop: 2,
        }}
      >
        {sub}
      </p>
    )}
  </div>
);

const TABS = ["Mes offres", "Réservations", "Historique", "Statistiques"];

const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState("Mes offres");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingOffre, setEditingOffre] = useState(null);
  const [filterStatut, setFilterStatut] = useState("TOUTES");

  const {
    offres,
    loading: loadOffres,
    error: errOffres,
    addOffre,
    removeOffre,
  } = useOffres();
  const { reservations, loading: loadRes, changerStatut } = useReservations();

  // Stats calculées
  const actives = offres.filter((o) => o.quantiteRestante > 0);
  const urgentes = offres.filter(
    (o) => o.quantiteRestante > 0 && o.quantiteRestante <= 2,
  );
  const enAttente = reservations.filter((r) => r.statut === "EN_ATTENTE");

  // Filtrage
  const offresFiltered =
    filterStatut === "TOUTES"
      ? offres
      : filterStatut === "ACTIVES"
        ? offres.filter((o) => o.quantiteRestante > 0)
        : filterStatut === "URGENTES"
          ? offres.filter(
              (o) => o.quantiteRestante > 0 && o.quantiteRestante <= 2,
            )
          : offres.filter((o) => o.quantiteRestante === 0);

  const handleEdit = (offre) => {
    setEditingOffre(offre);
    setModalOpen(true);
  };
  const handleAdd = () => {
    setEditingOffre(null);
    setModalOpen(true);
  };
  const handleDelete = async (id) => {
    if (window.confirm("Supprimer cette offre ?")) await removeOffre(id);
  };
  const handleSubmit = async (data) => {
    return await addOffre(data);
  };

  return (
    <div
      className="dashboard-container"
      style={{ background: "#F0F4F1", minHeight: "100vh" }}
    >
      {/* Tabs */}
      <div
        className="dashboard-tabs"
        style={{
          background: "#fff",
          display: "flex",
          gap: 4,
          padding: "10px 24px",
          borderBottom: "1px solid #E5EDE9",
          overflowX: "auto",
        }}
      >
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              whiteSpace: "nowrap",
              padding: "7px 16px",
              borderRadius: 999,
              fontSize: 12,
              fontWeight: 600,
              cursor: "pointer",
              border: "none",
              transition: ".2s",
              background: activeTab === tab ? "#2D7A4F" : "#F5F5F5",
              color: activeTab === tab ? "#fff" : "#666",
              boxShadow:
                activeTab === tab ? "0 3px 10px rgba(45,122,79,.3)" : "none",
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Body */}
      <div
        className="dashboard-body"
        style={{ display: "flex", gap: 16, padding: 16 }}
      >
        {/* ── Sidebar ─────────────────────────────── */}
        <div
          className="dashboard-sidebar"
          style={{
            width: 210,
            flexShrink: 0,
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
          {/* Stats */}
          <div
            className="dashboard-stats-grid"
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}
          >
            <StatCard
              label="Offres actives"
              value={actives.length}
              sub={`↑ ${urgentes.length} urgentes`}
            />
            <StatCard
              label="Réservations"
              value={reservations.length}
              sub={`${enAttente.length} en attente`}
            />
            <StatCard label="Portions sauvées" value="87" sub="ce mois" />
            <StatCard label="Taux retrait" value="91%" sub="↑ bien !" />
          </div>

          {/* Filtres statut */}
          <div
            className="sidebar-filter"
            style={{
              background: "#fff",
              borderRadius: 12,
              padding: 14,
              boxShadow: "0 1px 4px rgba(0,0,0,.06)",
            }}
          >
            <p
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: "#1B4332",
                marginBottom: 8,
              }}
            >
              Filtrer par statut
            </p>
            {["TOUTES", "ACTIVES", "URGENTES", "EPUISEES"].map((s) => (
              <label
                key={s}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  marginBottom: 7,
                  cursor: "pointer",
                }}
              >
                <input
                  type="radio"
                  name="statut"
                  checked={filterStatut === s}
                  onChange={() => setFilterStatut(s)}
                  style={{ accentColor: "#2D7A4F" }}
                />
                <span style={{ fontSize: 11, color: "#444" }}>
                  {s.charAt(0) + s.slice(1).toLowerCase()}
                </span>
                <span
                  style={{
                    marginLeft: "auto",
                    background: "#F0F4F1",
                    color: "#2D7A4F",
                    fontSize: 9,
                    fontWeight: 700,
                    padding: "1px 6px",
                    borderRadius: 4,
                  }}
                >
                  {s === "TOUTES"
                    ? offres.length
                    : s === "ACTIVES"
                      ? actives.length
                      : s === "URGENTES"
                        ? urgentes.length
                        : offres.filter((o) => o.quantiteRestante === 0).length}
                </span>
              </label>
            ))}
          </div>

          {/* Bouton nouvelle offre */}
          <button
            className="new-offer-btn"
            onClick={handleAdd}
            style={{
              background: "#2D7A4F",
              color: "#fff",
              border: "none",
              borderRadius: 10,
              padding: 12,
              fontSize: 13,
              fontWeight: 700,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
              boxShadow: "0 4px 12px rgba(45,122,79,.3)",
            }}
          >
            ＋ Nouvelle offre
          </button>
        </div>

        {/* ── Main ────────────────────────────────── */}
        <div
          className="dashboard-main"
          style={{
            flex: 1,
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
            gap: 14,
          }}
        >
          {/* Erreur API */}
          {errOffres && (
            <div
              style={{
                background: "#FEF3C7",
                border: "1px solid #FCD34D",
                color: "#92400E",
                borderRadius: 10,
                padding: "10px 14px",
                fontSize: 12,
              }}
            >
              <ShieldAlert style={{ marginRight: 8 }} />
              {errOffres}
            </div>
          )}

          {/* Grille offres — affiché sur onglet "Mes offres" */}
          {activeTab === "Mes offres" && (
            <div
              className="offers-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: 12,
              }}
            >
              {loadOffres
                ? Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} />)
                : offresFiltered.map((offre, idx) => (
                    <OfferCard
                      key={offre.id}
                      offre={offre}
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                      style={{
                        animationDelay: `${idx * 60}ms`,
                        animation: "fadeUp .4s ease both",
                      }}
                    />
                  ))}
              {!loadOffres && offresFiltered.length === 0 && (
                <div
                  style={{
                    gridColumn: "1/-1",
                    textAlign: "center",
                    padding: 40,
                    color: "#9CA3AF",
                  }}
                >
                  <p style={{ fontSize: 36 }}>🥗</p>
                  <p style={{ fontSize: 13, fontWeight: 600, marginTop: 8 }}>
                    Aucune offre
                  </p>
                  <p style={{ fontSize: 12, marginTop: 4 }}>
                    Cliquez sur « Nouvelle offre » pour commencer
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Tableau réservations */}
          {(activeTab === "Mes offres" || activeTab === "Réservations") && (
            <div className="reservation-table-wrapper">
              <ReservationTable
                reservations={reservations}
                loading={loadRes}
                onChangerStatut={changerStatut}
              />
            </div>
          )}

          {/* Historique */}
          {activeTab === "Historique" && <HistoriquePage />}

          {/* Statistiques */}
          {activeTab === "Statistiques" && <StatistiquesPage />}
        </div>
      </div>

      {/* Modal */}
      <OfferModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        offre={editingOffre}
      />

      <style>{`
        @keyframes fadeUp { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pulse  { 0%,100%{opacity:1} 50%{opacity:.6} }
      `}</style>
    </div>
  );
};

export default DashboardPage;
