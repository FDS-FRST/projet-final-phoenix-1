/**
 * StatistiquesPage.jsx - Graphiques et statistiques
 */
import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { ChartColumn, Salad, ChartSpline, ListTodo } from "lucide-react";
import { fetchAllReservations, fetchOffres } from "../services/api";

const CHART_FONT =
  "system-ui, 'Segoe UI', 'Roboto', 'Helvetica Neue', sans-serif";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          background: "white",
          padding: "8px 12px",
          borderRadius: "8px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          fontFamily: CHART_FONT,
          fontSize: "11px",
          border: "1px solid #E5EDE9",
        }}
      >
        <p style={{ margin: 0, fontWeight: 700, color: "#1B4332" }}>{label}</p>
        {payload.map((item, index) => (
          <p key={index} style={{ margin: "4px 0 0 0", color: item.color }}>
            {item.name}: {item.value} {item.name === "CA (€)" ? "€" : ""}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const StatistiquesPage = () => {
  const [ventesParJour, setVentesParJour] = useState([
    { jour: "Lun", commandes: 0, chiffre: 0 },
    { jour: "Mar", commandes: 0, chiffre: 0 },
    { jour: "Mer", commandes: 0, chiffre: 0 },
    { jour: "Jeu", commandes: 0, chiffre: 0 },
    { jour: "Ven", commandes: 0, chiffre: 0 },
    { jour: "Sam", commandes: 0, chiffre: 0 },
    { jour: "Dim", commandes: 0, chiffre: 0 },
  ]);
  const [platsPopulaires, setPlatsPopulaires] = useState([]);
  const [statuts, setStatuts] = useState([]);
  const [evolution, setEvolution] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalCommandes, setTotalCommandes] = useState(0);
  const [totalChiffre, setTotalChiffre] = useState(0);

  useEffect(() => {
    const loadStats = async () => {
      setLoading(true);
      try {
        const [reservationsRes] = await Promise.all([fetchAllReservations()]);

        const reservations = reservationsRes.data || [];

        // Calcul des ventes par jour
        const joursMap = {
          1: "Lun",
          2: "Mar",
          3: "Mer",
          4: "Jeu",
          5: "Ven",
          6: "Sam",
          0: "Dim",
        };

        const ventesParJourCalc = [
          { jour: "Lun", commandes: 0, chiffre: 0 },
          { jour: "Mar", commandes: 0, chiffre: 0 },
          { jour: "Mer", commandes: 0, chiffre: 0 },
          { jour: "Jeu", commandes: 0, chiffre: 0 },
          { jour: "Ven", commandes: 0, chiffre: 0 },
          { jour: "Sam", commandes: 0, chiffre: 0 },
          { jour: "Dim", commandes: 0, chiffre: 0 },
        ];

        let totalCmd = 0;
        let totalCA = 0;

        reservations.forEach((r) => {
          totalCmd++;
          totalCA += r.prix || 0;

          if (r.dateReservation) {
            const date = new Date(r.dateReservation);
            const jourIndex = date.getDay();
            const jourNom = joursMap[jourIndex];
            const jourData = ventesParJourCalc.find((v) => v.jour === jourNom);
            if (jourData) {
              jourData.commandes++;
              jourData.chiffre += r.prix || 0;
            }
          }
        });

        setTotalCommandes(totalCmd);
        setTotalChiffre(totalCA);
        setVentesParJour(ventesParJourCalc);

        // Calcul des plats populaires
        const platCount = {};
        reservations.forEach((r) => {
          const platNom = r.titreOffre || "Offre";
          platCount[platNom] = (platCount[platNom] || 0) + 1;
        });

        const platsPopulairesCalc = Object.entries(platCount)
          .map(([nom, quantite], index) => ({
            nom,
            quantite,
            couleur: ["#2D7A4F", "#4CAF7D", "#8BC34A", "#FFC107"][index % 4],
          }))
          .slice(0, 4);

        setPlatsPopulaires(platsPopulairesCalc);

        // Calcul des statuts
        const retires = reservations.filter(
          (r) => r.statut === "RETIREE",
        ).length;
        const nonRetires = reservations.filter(
          (r) => r.statut === "NON_RETIREE",
        ).length;
        const enAttente = reservations.filter(
          (r) => r.statut === "EN_ATTENTE",
        ).length;

        setStatuts([
          { nom: "Retirées", valeur: retires, couleur: "#2D7A4F" },
          { nom: "Non retirées", valeur: nonRetires, couleur: "#EF4444" },
          { nom: "En attente", valeur: enAttente, couleur: "#F97316" },
        ]);

        // Évolution mensuelle (exemple basé sur les données)
        const moisMap = {};
        reservations.forEach((r) => {
          if (r.dateReservation) {
            const mois = new Date(r.dateReservation).toLocaleString("fr", {
              month: "short",
            });
            if (!moisMap[mois]) {
              moisMap[mois] = { commandes: 0, chiffre: 0 };
            }
            moisMap[mois].commandes++;
            moisMap[mois].chiffre += r.prix || 0;
          }
        });

        const evolutionCalc = Object.entries(moisMap).map(([mois, data]) => ({
          mois,
          ventes: data.commandes,
          chiffre: data.chiffre,
        }));

        setEvolution(
          evolutionCalc.length > 0
            ? evolutionCalc
            : [
                { mois: "Jan", ventes: 0, chiffre: 0 },
                { mois: "Fév", ventes: 0, chiffre: 0 },
                { mois: "Mar", ventes: 0, chiffre: 0 },
                { mois: "Avr", ventes: 0, chiffre: 0 },
                { mois: "Mai", ventes: 0, chiffre: 0 },
              ],
        );
      } catch (error) {
        console.error("Erreur chargement statistiques:", error);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  const tauxRetrait =
    totalCommandes > 0
      ? Math.round(
          ((statuts.find((s) => s.nom === "Retirées")?.valeur || 0) /
            totalCommandes) *
            100,
        )
      : 0;

  if (loading) {
    return (
      <div
        style={{
          background: "#fff",
          borderRadius: "12px",
          padding: "60px",
          textAlign: "center",
          color: "#9CA3AF",
        }}
      >
        Chargement des statistiques...
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        fontFamily: CHART_FONT,
      }}
    >
      {/* Cartes KPI */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "12px",
        }}
      >
        <div
          style={{
            background: "#fff",
            borderRadius: "12px",
            padding: "16px",
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontSize: "11px",
              color: "#6B7280",
              fontFamily: CHART_FONT,
            }}
          >
            Commandes totales
          </p>
          <p
            style={{
              fontSize: "24px",
              fontWeight: 800,
              color: "#1B4332",
              fontFamily: CHART_FONT,
            }}
          >
            {totalCommandes}
          </p>
        </div>
        <div
          style={{
            background: "#fff",
            borderRadius: "12px",
            padding: "16px",
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontSize: "11px",
              color: "#6B7280",
              fontFamily: CHART_FONT,
            }}
          >
            Chiffre d'affaires
          </p>
          <p
            style={{
              fontSize: "24px",
              fontWeight: 800,
              color: "#1B4332",
              fontFamily: CHART_FONT,
            }}
          >
            {totalChiffre.toFixed(2)} €
          </p>
        </div>
        <div
          style={{
            background: "#fff",
            borderRadius: "12px",
            padding: "16px",
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontSize: "11px",
              color: "#6B7280",
              fontFamily: CHART_FONT,
            }}
          >
            Plat star
          </p>
          <p
            style={{
              fontSize: "14px",
              fontWeight: 800,
              color: "#2D7A4F",
              fontFamily: CHART_FONT,
            }}
          >
            {platsPopulaires[0]?.nom || "Aucun"}
          </p>
        </div>
        <div
          style={{
            background: "#fff",
            borderRadius: "12px",
            padding: "16px",
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontSize: "11px",
              color: "#6B7280",
              fontFamily: CHART_FONT,
            }}
          >
            Taux retrait
          </p>
          <p
            style={{
              fontSize: "24px",
              fontWeight: 800,
              color: "#4CAF7D",
              fontFamily: CHART_FONT,
            }}
          >
            {tauxRetrait}%
          </p>
        </div>
      </div>

      {/* Graphique ventes par jour */}
      <div
        style={{ background: "#fff", borderRadius: "12px", padding: "16px" }}
      >
        <h3
          style={{
            fontSize: "14px",
            fontWeight: 700,
            color: "#1B4332",
            marginBottom: "16px",
            fontFamily: CHART_FONT,
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <ChartColumn size={16} />
          Ventes de la semaine
        </h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={ventesParJour}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5EDE9" />
            <XAxis
              dataKey="jour"
              tick={{ fontSize: 11, fill: "#6B7280", fontFamily: CHART_FONT }}
            />
            <YAxis
              tick={{ fontSize: 11, fill: "#6B7280", fontFamily: CHART_FONT }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              wrapperStyle={{ fontFamily: CHART_FONT, fontSize: "11px" }}
            />
            <Bar
              dataKey="commandes"
              name="Commandes"
              fill="#2D7A4F"
              radius={[13, 13, 0, 0]}
            />
            <Bar
              dataKey="chiffre"
              name="CA (€)"
              fill="#F97316"
              radius={[13, 13, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Double graphique */}
      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}
      >
        <div
          style={{ background: "#fff", borderRadius: "12px", padding: "16px" }}
        >
          <h3
            style={{
              fontSize: "14px",
              fontWeight: 700,
              color: "#1B4332",
              marginBottom: "16px",
              fontFamily: CHART_FONT,
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <Salad size={16} />
            Plats populaires
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={platsPopulaires}
                dataKey="quantite"
                nameKey="nom"
                cx="50%"
                cy="50%"
                outerRadius={70}
                label={({ nom, quantite }) => `${nom}: ${quantite}`}
                labelLine={false}
                label={{
                  fontFamily: CHART_FONT,
                  fontSize: "9px",
                  fill: "#374151",
                }}
              >
                {platsPopulaires.map((e, i) => (
                  <Cell key={i} fill={e.couleur} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div
          style={{ background: "#fff", borderRadius: "12px", padding: "16px" }}
        >
          <h3
            style={{
              fontSize: "14px",
              fontWeight: 700,
              color: "#1B4332",
              marginBottom: "16px",
              fontFamily: CHART_FONT,
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <ListTodo size={16} />
            Statut commandes
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={statuts}
                dataKey="valeur"
                nameKey="nom"
                cx="50%"
                cy="50%"
                outerRadius={70}
                label={({ nom, valeur }) => `${nom}: ${valeur}`}
                labelLine={false}
                label={{
                  fontFamily: CHART_FONT,
                  fontSize: "9px",
                  fill: "#374151",
                }}
              >
                {statuts.map((e, i) => (
                  <Cell key={i} fill={e.couleur} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Évolution mensuelle */}
      <div
        style={{ background: "#fff", borderRadius: "12px", padding: "16px" }}
      >
        <h3
          style={{
            fontSize: "14px",
            fontWeight: 700,
            color: "#1B4332",
            marginBottom: "16px",
            fontFamily: CHART_FONT,
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <ChartSpline size={16} />
          Évolution mensuelle
        </h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={evolution}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5EDE9" />
            <XAxis
              dataKey="mois"
              tick={{ fontSize: 11, fill: "#6B7280", fontFamily: CHART_FONT }}
            />
            <YAxis
              tick={{ fontSize: 11, fill: "#6B7280", fontFamily: CHART_FONT }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              wrapperStyle={{ fontFamily: CHART_FONT, fontSize: "11px" }}
            />
            <Line
              type="monotone"
              dataKey="ventes"
              name="Commandes"
              stroke="#2D7A4F"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="chiffre"
              name="CA (€)"
              stroke="#F97316"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StatistiquesPage;
