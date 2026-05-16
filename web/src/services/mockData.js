/**
 * mockData.js - Fausses données pour tester le front-end
 */

export const MOCK_OFFRES = [
  {
    id: 1,
    titre: "Pâtes Carbonara",
    description:
      "Délicieuses pâtes faites maison avec des œufs frais et du parmesan",
    quantiteInitiale: 10,
    quantiteRestante: 4,
    prix: 3.5,
    debutRetrait: "12:00",
    finRetrait: "14:00",
    lieu: "Resto Universitaire - RDC",
  },
  {
    id: 2,
    titre: "Quiche Lorraine",
    description: "Quiche fraîche du jour, servie avec salade verte",
    quantiteInitiale: 5,
    quantiteRestante: 2,
    prix: 2.5,
    debutRetrait: "12:00",
    finRetrait: "14:00",
    lieu: "Cafétéria A - Niveau 1",
  },
  {
    id: 3,
    titre: "Salade César",
    description: "Salade verte avec poulet grillé, parmesan et sauce césar",
    quantiteInitiale: 8,
    quantiteRestante: 1,
    prix: 4.0,
    debutRetrait: "18:00",
    finRetrait: "19:30",
    lieu: "Resto Universitaire - RDC",
  },
  {
    id: 4,
    titre: "Croissant",
    description: "Viennoiserie fraîche du matin",
    quantiteInitiale: 15,
    quantiteRestante: 0,
    prix: 0,
    debutRetrait: "08:00",
    finRetrait: "10:00",
    lieu: "Boulangerie Campus",
  },
];

export const MOCK_RESERVATIONS = [
  {
    id: 1,
    etudiantNom: "Alice Martin",
    offreTitre: "Pâtes Carbonara",
    debutRetrait: "12:00",
    finRetrait: "14:00",
    dateReservation: "2025-05-07",
    statut: "EN_ATTENTE",
  },
  {
    id: 2,
    etudiantNom: "Thomas Dubois",
    offreTitre: "Quiche Lorraine",
    debutRetrait: "12:00",
    finRetrait: "14:00",
    dateReservation: "2025-05-07",
    statut: "RETIREE",
  },
  {
    id: 3,
    etudiantNom: "Sophie Bernard",
    offreTitre: "Salade César",
    debutRetrait: "18:00",
    finRetrait: "19:30",
    dateReservation: "2025-05-07",
    statut: "NON_RETIREE",
  },
  {
    id: 4,
    etudiantNom: "Lucas Petit",
    offreTitre: "Pâtes Carbonara",
    debutRetrait: "12:00",
    finRetrait: "14:00",
    dateReservation: "2025-05-06",
    statut: "EN_ATTENTE",
  },
];
