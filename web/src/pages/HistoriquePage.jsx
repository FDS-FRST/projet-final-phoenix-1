/**
 * HistoriquePage.jsx - Historique des commandes passées
 */
import { useState, useEffect } from "react";
import { Search, Calendar, Filter } from "lucide-react";
import { fetchAllReservations } from "../services/api";

const HistoriquePage = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatut, setFilterStatut] = useState("TOUS");
  const [filterDate, setFilterDate] = useState("");

  // Charger les réservations depuis l'API
  useEffect(() => {
    const loadReservations = async () => {
      setLoading(true);
      try {
        const response = await fetchAllReservations();
        const data = response.data || [];

        // Transformer les données pour l'affichage (garde ton format)
        const formattedData = data.map((r) => ({
          id: r.id,
          client: r.nomEtudiant || r.etudiant?.name || "Étudiant",
          plat: r.titreOffre || r.offre?.titre || "Offre",
          quantite: r.quantite || 1,
          prix: r.prix || 0,
          date:
            r.dateReservation?.substring(0, 10) ||
            new Date().toISOString().substring(0, 10),
          heure: r.dateReservation?.substring(11, 16) || "12:00",
          statut: r.statut || "EN_ATTENTE",
        }));

        setReservations(formattedData);
      } catch (error) {
        console.error("Erreur chargement historique:", error);
        setReservations([]);
      } finally {
        setLoading(false);
      }
    };

    loadReservations();
  }, []);

  const filtered = reservations.filter((item) => {
    const matchSearch =
      item.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.plat.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatut = filterStatut === "TOUS" || item.statut === filterStatut;
    const matchDate = !filterDate || item.date === filterDate;
    return matchSearch && matchStatut && matchDate;
  });

  const totalCommandes = filtered.length;
  const totalRetirees = filtered.filter((i) => i.statut === "RETIREE").length;
  const chiffreAffaires = filtered.reduce(
    (sum, i) => sum + (i.prix || 0) * (i.quantite || 1),
    0,
  );

  if (loading) {
    return (
      <div
        style={{
          background: "#fff",
          borderRadius: "14px",
          padding: "60px",
          textAlign: "center",
          color: "#9CA3AF",
        }}
      >
        Chargement de l'historique...
      </div>
    );
  }

  return (
    <div
      style={{ background: "#fff", borderRadius: "14px", overflow: "hidden" }}
    >
      {/* En-tête avec statistiques */}
      <div
        style={{
          display: "flex",
          gap: "16px",
          padding: "16px",
          background: "#F8FBF9",
          borderBottom: "1px solid #E5EDE9",
          flexWrap: "wrap",
        }}
      >
        <div>
          <span style={{ fontSize: "11px", color: "#6B7280" }}>
            Total commandes
          </span>
          <br />
          <span style={{ fontSize: "20px", fontWeight: 700, color: "#1B4332" }}>
            {totalCommandes}
          </span>
        </div>
        <div>
          <span style={{ fontSize: "11px", color: "#6B7280" }}>Retirées</span>
          <br />
          <span style={{ fontSize: "20px", fontWeight: 700, color: "#2D7A4F" }}>
            {totalRetirees}
          </span>
        </div>
        <div>
          <span style={{ fontSize: "11px", color: "#6B7280" }}>CA total</span>
          <br />
          <span style={{ fontSize: "20px", fontWeight: 700, color: "#1B4332" }}>
            {chiffreAffaires.toFixed(2)} €
          </span>
        </div>
      </div>

      {/* Filtres */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "12px",
          padding: "16px",
          borderBottom: "1px solid #E5EDE9",
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            gap: "8px",
            background: "#F8FBF9",
            padding: "8px 12px",
            borderRadius: "8px",
          }}
        >
          <Search size={16} color="#9CA3AF" />
          <input
            type="text"
            placeholder="Rechercher..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              border: "none",
              background: "transparent",
              flex: 1,
              outline: "none",
              fontSize: "13px",
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            background: "#F8FBF9",
            padding: "8px 12px",
            borderRadius: "8px",
          }}
        >
          <Filter size={16} color="#9CA3AF" />
          <select
            value={filterStatut}
            onChange={(e) => setFilterStatut(e.target.value)}
            style={{
              border: "none",
              background: "transparent",
              outline: "none",
              fontSize: "13px",
            }}
          >
            <option value="TOUS">Tous</option>
            <option value="RETIREE">Retirée</option>
            <option value="NON_RETIREE">Non retirée</option>
            <option value="EN_ATTENTE">En attente</option>
          </select>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            background: "#F8FBF9",
            padding: "8px 12px",
            borderRadius: "8px",
          }}
        >
          <Calendar size={16} color="#9CA3AF" />
          <input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            style={{
              border: "none",
              background: "transparent",
              outline: "none",
              fontSize: "13px",
            }}
          />
        </div>
      </div>

      {/* Tableau */}
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead style={{ background: "#FAFCFB" }}>
            <tr>
              {["Date", "Heure", "Client", "Plat", "Qté", "Prix", "Statut"].map(
                (h) => (
                  <th
                    key={h}
                    style={{
                      padding: "12px",
                      textAlign: "left",
                      fontSize: "11px",
                      color: "#6B7280",
                    }}
                  >
                    {h}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody>
            {filtered.map((item) => (
              <tr key={item.id} style={{ borderTop: "1px solid #F0F4F1" }}>
                <td style={{ padding: "12px", fontSize: "12px" }}>
                  {item.date}
                </td>
                <td style={{ padding: "12px", fontSize: "12px" }}>
                  {item.heure}
                </td>
                <td
                  style={{ padding: "12px", fontSize: "12px", fontWeight: 500 }}
                >
                  {item.client}
                </td>
                <td style={{ padding: "12px", fontSize: "12px" }}>
                  {item.plat}
                </td>
                <td
                  style={{
                    padding: "12px",
                    fontSize: "12px",
                    textAlign: "center",
                  }}
                >
                  {item.quantite}
                </td>
                <td style={{ padding: "12px", fontSize: "12px" }}>
                  {item.prix.toFixed(2)} €
                </td>
                <td style={{ padding: "12px" }}>
                  <span
                    style={{
                      background:
                        item.statut === "RETIREE"
                          ? "#DCFCE7"
                          : item.statut === "EN_ATTENTE"
                            ? "#FEF3C7"
                            : "#FEE2E2",
                      color:
                        item.statut === "RETIREE"
                          ? "#166534"
                          : item.statut === "EN_ATTENTE"
                            ? "#92400E"
                            : "#991B1B",
                      padding: "4px 8px",
                      borderRadius: "20px",
                      fontSize: "10px",
                      fontWeight: 600,
                    }}
                  >
                    {item.statut === "RETIREE"
                      ? "✓ Retirée"
                      : item.statut === "EN_ATTENTE"
                        ? "⏳ En attente"
                        : "✗ Non retirée"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div
            style={{ textAlign: "center", padding: "40px", color: "#9CA3AF" }}
          >
            Aucune commande trouvée
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoriquePage;
