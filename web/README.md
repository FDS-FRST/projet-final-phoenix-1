Documentation du Dashboard FoodShare - Guide Complet 

Table des matières 

Introduction 

Installation et démarrage 

Structure du projet 

Composants principaux 

Utilisation de l'IA 

Guide de réutilisation 

Dépannage 

 

Introduction 

Ce dashboard a été développé pour la plateforme FoodShare dans le cadre d'un projet BTS SIO/SLAM. L'objectif est de permettre aux offreurs (restaurants, cafétérias) de gérer leurs invendus alimentaires. 

Technologies utilisées 

Technologie 

Version 

Utilisation 

React 

18+ 

Framework principal 

Vite 

5+ 

Build tool 

Lucide React 

- 

Icônes 

Recharts 

- 

Graphiques statistiques 

React Router DOM 

6+ 

Navigation 

 

Installation et démarrage 

Prérequis 

Node.js 18+ et npm installés 
  

Installation 

# Cloner le projet 
git clone [https://github.com/FDS-FRST/projet-final-phoenix-1.git] 
 
# Aller dans le dossier 
cd foodshare-web 
 
# Installer les dépendances 
npm install 
 
# Installer les dépendances supplémentaires 
npm install react-router-dom lucide-react recharts 
  

Démarrage 

npm run dev 

Le dashboard est accessible sur http://localhost:5173 

 

Structure du projet 

src/ 
├── components/ 
│   ├── Navbar/ 
│   │   └── Navbar.jsx          # Barre de navigation 
│   ├── NotificationPanel/ 
│   │   └── NotificationPanel.jsx  # Panneau de notifications 
│   ├── OfferCard/ 
│   │   └── OfferCard.jsx       # Carte d'une offre 
│   ├── OfferModal/ 
│   │   └── OfferModal.jsx      # Modal création/édition offre 
│   ├── ReservationTable/ 
│   │   └── ReservationTable.jsx # Tableau des réservations 
│   └── Sidebar/ 
│       └── Sidebar.jsx         # Barre latérale (non utilisée) 
│ 
├── context/ 
│   └── AuthContext.jsx         # Gestion authentification (mock) 
│ 
├── hooks/ 
│   ├── useOffres.js            # Gestion des offres  
│   ├── useReservations.js      # Gestion réservations  
│   └── useNotifications.js     # Gestion notifications  
│ 
├── pages/ 
│   ├── DashboardPage.jsx       # Page principale 
│   ├── LoginPage.jsx           # Page de connexion 
│   ├── HistoriquePage.jsx      # Historique commandes 
│   └── StatistiquesPage.jsx    # Statistiques avec graphiques 
│ 
├── services/ 
│   ├── authService.js          # API auth 
│   └── mockData.js             # Fausses données mockées 
│ 
├── App.jsx                     # Composant principal 
├── index.css                   # Styles globaux 
└── main.jsx                    # Point d'entrée 
  

 

Composants principaux 

1. DashboardPage.jsx 

Page principale avec : 

Tabs : Mes offres, Réservations, Historique, Statistiques 

Sidebar : Statistiques rapides + filtres 

Grille d'offres : Affichage des offres du offreur 

Tableau réservations : Liste des commandes reçues 

2. Navbar.jsx 

Barre de navigation avec : 

Logo FoodShare 

Nom du restaurant connecté 

Badge OFFREUR 

Icône notification avec compteur 

Bouton déconnexion 

3. OfferModal.jsx 

Formulaire de création/édition d'offre avec : 

Titre, description 

Quantité, prix 

Créneau horaire (début/fin retrait) 

Lieu 

4. ReservationTable.jsx 

Tableau des réservations avec : 

Actions "Retirée" / "Non retirée" 

Statuts colorés 

Loading state 

5. StatistiquesPage.jsx 

Graphiques avec Recharts : 

BarChart : Ventes par semaine 

PieChart : Plats populaires / Statuts 

LineChart : Évolution mensuelle 

 

Utilisation de l'IA 

Outils IA utilisés 

Outil 

Utilisation 

ChatGPT/Deepseek 

Gestion d'erreur, amelioration du code, 

GitHub Copilot 

Autocomplétion, suggestions de code 

Méthodologie 

Analyse des besoins → Prompt détaillé à l'IA 

Génération du squelette → Création des fichiers de base 

Itérations → Corrections et améliorations 

Validation → Test et ajustements manuels 

Exemple de prompt utilisé 

"Ameliorer ce design [on donne le code initial...] j'ai crée un composant React pour un modal d'ajout d'offre avec : 
- Champs : titre, description, quantité, prix, début retrait, fin retrait, lieu 
- Validation des champs obligatoires 
- Style en inline CSS (bleu/vert) 
- Fermeture au clic sur overlay" 
  

Journal de bord IA 

Tâche 

Prompt 

Résultat 

AuthContext 

"Gère l'authentification avec localStorage" 

✅ fonctionnel 

Notifications 

"Panneau notifications avec cloche" 

✅ fonctionnel 

Statistiques 

"Graphiques avec Recharts" 

✅ fonctionnel 

 

Guide de réutilisation 

Pour reprendre ce projet 

Clone le dépôt 

npm install 

npm run dev 

Pour remplacer les données mockées par une vraie API 

1. Modifier services/authService.js : 

// Avant (mock) 
const API_URL = 'http://localhost:8080/api'; 
 
// Après (API réelle) 
const API_URL = 'https://ton-api.com/api'; 
 
// Remplacer les fonctions mock par de vrais fetch 
export const login = async (email, password) => { 
  const response = await fetch(`${API_URL}/auth/login`, { 
    method: 'POST', 
    headers: { 'Content-Type': 'application/json' }, 
    body: JSON.stringify({ email, password }) 
  }); 
  return response.json(); 
}; 
  

2. Modifier hooks/useOffres.js : 

// Remplacer MOCK_OFFRES par des appels API 
const loadOffres = async () => { 
  const response = await authFetch('/offres'); 
  const data = await response.json(); 
  setOffres(data); 
}; 
  

3. Variables d'environnement 

Créer .env à la racine : 

VITE_API_URL=http://localhost:8080/api 
  

Utiliser dans les services : 

const API_URL = import.meta.env.VITE_API_URL; 
  

Pour personnaliser les couleurs 

Modifier les variables dans index.css ou directement dans les composants : 

:root { 
  --primary: #2D7A4F;    /* Vert principal */ 
  --primary-dark: #1B4332; /* Vert foncé */ 
  --secondary: #4CAF7D;    /* Vert clair */ 
  --danger: #EF4444;       /* Rouge */ 
  --warning: #F97316;      /* Orange */ 
} 
  

Pour ajouter une nouvelle page 

Créer le fichier dans pages/ 

Ajouter l'import dans DashboardPage.jsx 

Ajouter le tab dans TABS array 

Ajouter la condition d'affichage 

// DashboardPage.jsx 
import MaNouvellePage from "./MaNouvellePage"; 
 
const TABS = ["Mes offres", "Réservations", "Historique", "Statistiques", "Nouvel onglet"]; 
 
{activeTab === "Nouvel onglet" && <MaNouvellePage />} 
  

 

Dépannage 

Problèmes courants 

Problème 

Solution 

Les flèches d'input number/time invisibles 

Ajouter ce CSS dans index.css 

Le modal ne s'ouvre pas 

Vérifier isOpen state et OfferModal import 

Les notifications n'apparaissent pas 

Vérifier useNotifications hook 

Les graphiques ne s'affichent pas 

Vérifier recharts installé : npm install recharts 

Erreur CORS 

Ajouter dans le backend Spring Boot : @CrossOrigin(origins = "http://localhost:5173") 

Commandes utiles 

# Nettoyer le cache 
npm cache clean --force 
 
# Réinstaller les dépendances 
rm -rf node_modules package-lock.json && npm install 
 
# Build pour production 
npm run build 
 
# Prévisualiser le build 
npm run preview 

# Recuperer derniers changement 

git fetch origin duallydagobert 
  

 

Contact 

Pour toute question sur ce dashboard : 

Développeur : [Dually Dagobert] 

Projet : FoodShare BTS SIO 

 

Licence 

Ce projet est développé dans le cadre pédagogique du BTS SIO/SLAM. 
