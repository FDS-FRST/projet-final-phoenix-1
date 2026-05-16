/**
 * StatistiquesPage.jsx - Graphiques et statistiques
 */
import "react";
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

// Police à utiliser sur tous les graphiques
const CHART_FONT =
  "system-ui, 'Segoe UI', 'Roboto', 'Helvetica Neue', sans-serif";

const VENTES_PAR_JOUR = [
  { jour: "Lun", commandes: 12, chiffre: 48 },
  { jour: "Mar", commandes: 15, chiffre: 62 },
  { jour: "Mer", commandes: 18, chiffre: 75 },
  { jour: "Jeu", commandes: 22, chiffre: 92 },
  { jour: "Ven", commandes: 25, chiffre: 108 },
  { jour: "Sam", commandes: 8, chiffre: 32 },
  { jour: "Dim", commandes: 4, chiffre: 16 },
];

const PLATS_POPULAIRES = [
  { nom: "Pâtes Carbonara", quantite: 45, couleur: "#2D7A4F" },
  { nom: "Quiche Lorraine", quantite: 28, couleur: "#4CAF7D" },
  { nom: "Salade César", quantite: 24, couleur: "#8BC34A" },
  { nom: "Croissant", quantite: 18, couleur: "#FFC107" },
];

const STATUTS = [
  { nom: "Retirées", valeur: 68, couleur: "#2D7A4F" },
  { nom: "Non retirées", valeur: 12, couleur: "#EF4444" },
  { nom: "En attente", valeur: 20, couleur: "#F97316" },
];

const EVOLUTION = [
  { mois: "Jan", ventes: 120, chiffre: 480 },
  { mois: "Fév", ventes: 135, chiffre: 540 },
  { mois: "Mar", ventes: 150, chiffre: 600 },
  { mois: "Avr", ventes: 175, chiffre: 700 },
  { mois: "Mai", ventes: 210, chiffre: 840 },
];

// Style personnalisé pour le Tooltip
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
  const totalCommandes = VENTES_PAR_JOUR.reduce((s, d) => s + d.commandes, 0);
  const totalChiffre = VENTES_PAR_JOUR.reduce((s, d) => s + d.chiffre, 0);

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
            {totalChiffre} €
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
            Pâtes Carbonara
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
            85%
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
          }}
        >
          <ChartColumn size={16} />
          <p>Ventes de la semaine</p>
        </h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={VENTES_PAR_JOUR}>
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
            }}
          >
            <Salad size={16} />
            <p>Plats populaires</p>
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={PLATS_POPULAIRES}
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
                {PLATS_POPULAIRES.map((e, i) => (
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
            }}
          >
            <ListTodo size={16} />
            <p>Statut commandes</p>
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={STATUTS}
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
                {STATUTS.map((e, i) => (
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
          }}
        >
          <ChartSpline size={16} />
          <p>Évolution mensuelle</p>
        </h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={EVOLUTION}>
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
