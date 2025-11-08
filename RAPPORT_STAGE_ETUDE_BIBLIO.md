# Étude Bibliographique - Rapport de Stage

## Conception et développement d'un site web vitrine pour Pari D'Or

---

## I. Stack Technique du Projet

### 1.1 Framework et Langages de Programmation

#### Framework Principal
- **Next.js 15.5.6** (React Framework)
  - App Router (architecture moderne basée sur les dossiers)
  - Server-Side Rendering (SSR) optimisé
  - Static Site Generation (SSG) pour certaines pages
  - API Routes intégrées pour les endpoints backend

#### Langages de Programmation
- **JavaScript/JSX** : Langage principal du projet
- **TypeScript (partiel)** : Utilisé pour certains modules (data/company.ts, lib/*.ts)
- **React 19.1.0** : Bibliothèque UI utilisée avec Next.js
  - Hooks modernes (useState, useEffect, useMemo, useCallback)
  - Context API pour la gestion globale du panier
  - Composants fonctionnels uniquement

### 1.2 Styling et Design

#### Framework CSS
- **Tailwind CSS 3.4.18** : Framework CSS utilitaire
  - Configuration personnalisée dans `tailwind.config.js`
  - Palette de couleurs spécifique :
    - Beige (#F5F0E9), Coal (#1E1E1E), Gold (#D4AF37)
    - LightGold (#F5E7B2), Bone (#F8F5F0)
  - Polices Google Fonts : Inter, Poppins, Playfair Display
  - Classes utilitaires pour responsive design (sm, md, lg breakpoints)

#### Animations
- **Framer Motion 12.23.24** : Bibliothèque d'animation React
  - Animations de page (`PageTransition`, `AnimatePresence`)
  - Hover effects sur les cartes produits
  - Parallax scrolling pour le Hero
  - Animations de scroll (whileInView)
  - Transitions de couleur pour sélecteurs produits

### 1.3 Interfaces Utilisateur et Icons

- **Lucide React 0.546.0** : Bibliothèque d'icônes SVG
  - Icons utilisées : Menu, X, ShoppingCart, Filter, ChevronLeft, ChevronRight
  - Icons d'animation et de navigation
  - Icons de catégories produits

### 1.4 Système de Paiement

#### Stripe Integration
- **Stripe ^19.1.0** (Backend)
  - Version API : 2024-12-18.acacia
  - Création de sessions de paiement
  - Gestion des webhooks (optionnel, non implémenté en production)
  - Mode test activé

- **@stripe/stripe-js ^8.1.0** (Frontend)
  - Intégration côté client pour le checkout
  - Redirection vers Stripe Checkout
  - Gestion des retours (success/cancel)

### 1.5 Outils de Développement

#### Environnement de Développement
- **IDE** : Cursor (AI-powered code editor)
- **Node.js** : Runtime JavaScript (version compatible avec Next.js 15.5.6)
- **npm** : Gestionnaire de paquets (via package-lock.json)

#### Linting et Qualité de Code
- **ESLint ^9** : Analyseur de code statique
- **eslint-config-next** : Configuration Next.js standard
- **@eslint/eslintrc ^3** : Configuration ESLint moderne

#### Build et Compilation
- **PostCSS 8.5.6** : Traitement des CSS (via Tailwind)
- **Autoprefixer 10.4.21** : Ajout automatique des préfixes CSS
- **SWC** : Compilateur rapide de Next.js (par défaut)
- Configuration : suppression automatique des console.log en production

### 1.6 Gestion des Assets

- **Images** : 
  - Format : PNG pour tous les produits (46 fichiers dans /public/assets/)
  - Images Unsplash pour placeholder et banquettes (via CDN)
  - Optimisation via `next/image` avec lazy loading

- **Icônes et Logos** :
  - Logo Pari D'Or : `/public/logo.png` (format PNG optimisé)
  - Icônes SVG via Lucide React

### 1.7 Déploiement et Hébergement

- **Vercel** : Plateforme de déploiement
  - Intégration GitHub pour déploiement continu
  - Variables d'environnement pour configuration
  - Optimisation automatique des assets
  - Domaines personnalisés supportés
  - Build : 36 pages statiques générées

- **GitHub** : Contrôle de version
  - Repository : WAS10SIM/PariDor
  - Branche principale : main
  - Commits pour versioning du code

### 1.8 Stockage et Base de Données

- **Stockage Local** :
  - `localStorage` (navigateur) pour :
    - Panier d'achat : clé "paridor-cart"
    - Données client : clé "paridor-customer"
    - Commandes : clé "paridor-orders"
  
- **Fichiers JSON** :
  - `/data/products.json` : Catalogue produits
  - `/data/productVariants.json` : Variantes de couleurs
  - `/data/orders.json` : Commandes enregistrées
  - `/data/company.ts` : Informations de l'entreprise

---

## II. Méthodologie et Étapes de Développement

### 2.1 Méthodologie de Développement

#### Approche Agile/Itérative
- **Développement incrémental** : Fonctionnalités ajoutées une par une
- **Prototypage rapide** : Interface testée en continu via `npm run dev`
- **Tests itératifs** : Vérification après chaque modification majeure
- **Refactoring continu** : Amélioration du code au fur et à mesure

#### Étapes Principales

1. **Analyse et Conception** (Phase 1)
   - Analyse des besoins de Pari D'Or
   - Définition de l'architecture technique
   - Création de la structure de dossiers
   - Configuration de l'environnement de développement

2. **Maquette et Design** (Phase 2)
   - Définition de la palette de couleurs (doré/beige/noir)
   - Création des layouts de base (Hero, Navbar, Footer)
   - Design des cartes produits et variantes
   - Responsive design (mobile-first approach)

3. **Développement Frontend** (Phase 3)
   - Implémentation des pages statiques (Accueil, À propos, Contact)
   - Développement des composants réutilisables
   - Intégration des animations Framer Motion
   - Responsive design complet (mobile/tablet/desktop)

4. **Fonctionnalités Interactives** (Phase 4)
   - Système de panier avec Context API
   - Sélection de variantes de couleurs
   - Toast notifications pour feedback utilisateur
   - Gestion des commandes (ajout, suppression, mise à jour)

5. **Intégration Paiement** (Phase 5)
   - Configuration Stripe (clés test)
   - API routes pour checkout
   - Page de succès/annulation
   - Sauvegarde des commandes

6. **Admin Panel** (Phase 6)
   - Interface de connexion sécurisée
   - Dashboard de gestion des commandes
   - Visualisation des statistiques
   - Mise à jour des statuts

7. **Optimisation et Finalisation** (Phase 7)
   - Nettoyage du code (suppression fichiers inutilisés)
   - Optimisation des performances
   - Correction des bugs
   - Tests finaux

### 2.2 Architecture du Projet

#### Structure des Dossiers

```
paridor/
├── app/                          # Pages Next.js (App Router)
│   ├── layout.jsx               # Layout racine
│   ├── LayoutClient.jsx         # Layout client-side
│   ├── globals.css              # Styles globaux
│   ├── page.jsx                 # Page d'accueil
│   ├── a-propos/                # Page à propos
│   ├── admin-2025-secret/       # Dashboard admin
│   ├── api/                     # Routes API
│   │   ├── admin/
│   │   │   ├── login/          # Authentification admin
│   │   │   └── orders/         # Gestion commandes
│   │   ├── checkout/           # Paiement Stripe
│   │   └── orders/             # CRUD commandes
│   ├── catalogue/              # Catalogue complet
│   ├── checkout/               # Page checkout
│   ├── contact/                # Contact
│   ├── creations/              # Galerie/showroom
│   ├── mes-commandes/          # Commandes client
│   ├── notre-histoire/         # Histoire entreprise
│   ├── panier/                 # Panier
│   ├── produits/               # Liste produits
│   └── products/[slug]/        # Détail produit
│
├── components/                  # Composants React
│   ├── ChoisirNous.jsx        # Section "Pourquoi nous"
│   ├── Contact.jsx             # Section contact
│   ├── Footer.jsx              # Pied de page
│   ├── Hero.jsx                # Hero section
│   ├── OurStory.jsx            # Notre histoire
│   ├── Showroom.jsx            # Showroom produits
│   ├── Testimonials.jsx        # Témoignages
│   ├── NavbarPublic.jsx        # Navbar publique
│   ├── NavbarAdmin.jsx         # Navbar admin
│   ├── PageTransition.jsx      # Transitions page
│   ├── Preloader.jsx           # Chargement initial
│   ├── MobileButtons.jsx       # Boutons mobile
│   ├── ScrollToTop.jsx         # Retour en haut
│   ├── HamburgerMenu.jsx       # Menu mobile
│   ├── MobileDrawer.jsx        # Drawer mobile
│   └── toast/                  # Système notifications
│       ├── Toast.jsx
│       └── ToastProvider.jsx
│
├── context/                     # Context React
│   └── CartContext.jsx         # Gestion panier global
│
├── data/                        # Données statiques
│   ├── company.ts              # Infos entreprise
│   ├── products.json           # Catalogue
│   ├── productVariants.json    # Variantes couleurs
│   └── orders.json             # Commandes (mock)
│
├── lib/                         # Utilitaires
│   ├── mergeProducts.js        # Fusion produits/variantes
│   ├── money.ts                # Formatage prix
│   ├── orders.ts               # Gestion commandes
│   ├── phone.ts                # Utilitaires téléphone
│   └── storage.ts              # localStorage helpers
│
├── public/                      # Assets statiques
│   ├── assets/                 # Images produits
│   ├── logo.png                # Logo entreprise
│   └── *.svg                   # Icônes SVG
│
├── next.config.js              # Configuration Next.js
├── tailwind.config.js          # Configuration Tailwind
├── package.json                # Dépendances
├── tsconfig.json               # Configuration TypeScript
├── jsconfig.json               # Configuration JavaScript
└── README.md                   # Documentation
```

### 2.3 Principes de Développement

#### Composants Réutilisables
- Composants atomiques (Navbar, Footer, Toast)
- Composants de page (Hero, Showroom, Testimonials)
- Composants dynamiques (MobileDrawer, PageTransition)
- Hooks personnalisés via Context API

#### Gestion d'État
- **Context API** : Panier global accessible partout
- **useState local** : État des composants individuels
- **localStorage** : Persistance des données client

#### Routing
- **Next.js App Router** : Navigation basée sur la structure de dossiers
- Routes dynamiques : `/products/[slug]`
- Routes API : `/api/checkout`, `/api/admin/login`
- Navigation côté client optimisée

#### Optimisations
- Images optimisées avec `next/image`
- Lazy loading des composants
- SSR pour SEO
- Code splitting automatique
- Cache intelligent des assets

---

## III. Ressources et Références

### 3.1 Documentation Officielle

#### Next.js
- **Site officiel** : https://nextjs.org/docs
- **Documentation App Router** : https://nextjs.org/docs/app
- **API Routes** : https://nextjs.org/docs/app/building-your-application/routing/route-handlers
- **Image Optimization** : https://nextjs.org/docs/app/building-your-application/optimizing/images
- **Deployment on Vercel** : https://nextjs.org/docs/app/building-your-application/deploying

#### React
- **Site officiel** : https://react.dev/
- **Hooks Documentation** : https://react.dev/reference/react
- **Context API** : https://react.dev/learn/passing-data-deeply-with-context
- **Component Best Practices** : https://react.dev/learn/thinking-in-react

#### Tailwind CSS
- **Documentation** : https://tailwindcss.com/docs
- **Utility Classes** : https://tailwindcss.com/docs/utility-first
- **Responsive Design** : https://tailwindcss.com/docs/responsive-design
- **Custom Configuration** : https://tailwindcss.com/docs/configuration

#### Framer Motion
- **Documentation** : https://www.framer.com/motion/
- **Animation Documentation** : https://www.framer.com/motion/animation/
- **Hooks** : https://www.framer.com/motion/motion-value/
- **Examples** : https://www.framer.com/motion/examples/

### 3.2 Tutoriels et Ressources

#### Sites de Référence
- **MDN Web Docs** : https://developer.mozilla.org/
  - JavaScript moderne (ES6+)
  - Web APIs (localStorage, fetch)
  - Responsive design principles

- **W3Schools** : https://www.w3schools.com/
  - HTML5, CSS3 références
  - JavaScript tutorials
  - Responsive design patterns

#### Tutoriels Vidéo et Articles
- **YouTube Next.js Tutorials** : https://www.youtube.com/results?search_query=next.js+15+tutorial
- **JavaScript.info** : https://javascript.info/
- **freeCodeCamp** : https://www.freecodecamp.org/
- **Medium** : Articles Next.js 15 et React 19

### 3.3 Stripe et Paiements

- **Stripe Documentation** : https://stripe.com/docs
- **Checkout Integration** : https://stripe.com/docs/payments/checkout
- **API Reference** : https://stripe.com/docs/api
- **Testing** : https://stripe.com/docs/testing

### 3.4 Design et UI/UX

- **Unsplash** : https://unsplash.com/ (banques d'images)
- **Google Fonts** : https://fonts.google.com/
- **Tailwind UI** : https://tailwindui.com/ (inspiration)
- **Color Palette Tools** : Coolors.co, Adobe Color

### 3.5 Outils de Développement

- **Cursor IDE** : https://cursor.sh/
- **Vercel** : https://vercel.com/docs
- **GitHub** : https://docs.github.com/
- **npm Docs** : https://docs.npmjs.com/

---

## IV. Captures d'Écran et Illustrations

### 4.1 Interface du Site

#### Figure 1 : Page d'Accueil - Hero Section
**Description** : Section héro avec image de fond parrallaxée, titre animé "Pari D'Or - Élégance Marocaine", call-to-action "Découvrir nos créations".

**Localisation** : `app/page.jsx` → `components/Hero.jsx`

**Caractéristiques** :
- Parallax scrolling via Framer Motion
- Gradient overlay sur image de fond
- Animations d'entrée fade-in
- Scroll indicator animé

---

#### Figure 2 : Section Showroom - Grille de Produits
**Description** : Affichage des 3 produits vedettes en grille responsive (3 colonnes desktop, 2 tablet, 1 mobile).

**Localisation** : `components/Showroom.jsx`

**Caractéristiques** :
- Cartes avec image, titre, prix, catégorie
- Hover effects : scale + shadow
- Sélecteurs de couleur en mini cercles
- Boutons "Découvrir" et "Ajouter au panier"

---

#### Figure 3 : Page Catalogue Complet
**Description** : Liste complète des produits avec filtres (catégorie, prix) et pagination.

**Localisation** : `app/catalogue/page.jsx`

**Caractéristiques** :
- Filtres : Catégories (Tous, Matelas, Canapés, Banquettes, Têtes de lit)
- Barres de prix : Tranches personnalisables
- Accordéon mobile pour filtres
- Pagination avec boutons précédent/suivant

---

#### Figure 4 : Détail Produit avec Variantes
**Description** : Page produit individuelle avec zoom image, sélecteurs de couleurs, options taille/fermeté, ajout panier.

**Localisation** : `app/products/[slug]/page.jsx`

**Caractéristiques** :
- Hero image full-width en haut
- Transitions fade entre variantes
- Prix dynamique selon sélection
- Bouton "Ajouter au panier" avec toast notification

---

#### Figure 5 : Panier d'Achat
**Description** : Affichage du panier avec produits, quantités, totaux, formulaires client, options paiement Stripe/WhatsApp.

**Localisation** : `app/panier/page.jsx`

**Caractéristiques** :
- Liste déroulable des articles
- Quantité ajustable (+/-)
- Suppression d'articles
- Formulaire : nom, email, téléphone, adresse, ville
- Deux boutons : "Payer par Carte" et "Commander par WhatsApp"

---

#### Figure 6 : Page Checkout Stripe
**Description** : Redirection vers Stripe Checkout (interface Stripe hébergée) avec options de paiement.

**Localisation** : `app/checkout/page.jsx` + Stripe Checkout

**Caractéristiques** :
- Redirection automatique vers Stripe
- Interface Stripe sécurisée
- Support cartes de crédit/débit
- Retour success/cancel

---

#### Figure 7 : Page Admin Dashboard
**Description** : Interface d'administration pour visualiser les commandes, statistiques, gestion des statuts.

**Localisation** : `app/admin-2025-secret/page.jsx`

**Caractéristiques** :
- Connexion sécurisée (username/password)
- Tableau des commandes : ID, date, client, montant, statut
- Filtres : Tous, En attente, Payées, Livrées
- Actions : Voir détails, Mettre à jour statut
- Boutons : Actualiser, Déconnexion

---

#### Figure 8 : Navigation Responsive Mobile
**Description** : Menu hamburger animé avec drawer latéral sur mobile, navigation fluide.

**Localisation** : `components/NavbarPublic.jsx` + `components/MobileDrawer.jsx`

**Caractéristiques** :
- Icône hamburger animée (3 lignes → X)
- Drawer slide-in depuis la gauche
- Overlay sombre au-dessus
- Fermeture au clic extérieur

---

### 4.2 Animations et Micro-interactions

#### Animation 1 : Preloader Initial
**Description** : Animation de chargement au démarrage du site (0.5s) avec logo et fade-out.

**Localisation** : `components/Preloader.jsx`

---

#### Animation 2 : Transitions de Page
**Description** : Transitions fade-in/out entre pages (200ms) pour navigation fluide.

**Localisation** : `components/PageTransition.jsx`

---

#### Animation 3 : Hover sur Produits
**Description** : Au survol d'une carte produit : scale (1.03), translation Y (-8px), shadow dorée.

**Localisation** : Tous les composants de produits

---

#### Animation 4 : Sélecteur de Couleur
**Description** : Changement d'image avec fade (300ms) lors du clic sur un cercle couleur.

**Localisation** : `components/Showroom.jsx`, `app/catalogue/page.jsx`

---

### 4.3 Structure des Données

#### Schéma Product JSON
```json
{
  "id": "string",
  "slug": "string",
  "title": "string",
  "category": "string",
  "price": "number",
  "image": "string",
  "excerpt": "string",
  "description": "string",
  "options": { ... },
  "variants": [
    {
      "name": "string",
      "key": "string",
      "code": "#hex",
      "price": "number",
      "image": "string"
    }
  ]
}
```

---

## V. Spécificités Techniques

### 5.1 Gestion des Variantes de Produits

**Problématique** : Chaque produit a plusieurs variantes de couleurs avec images différentes.

**Solution** :
- Fichier `/data/productVariants.json` séparé
- Fonction `enrichProductsWithVariants()` pour fusion
- État local `selectedBySlug` par produit
- Transition fade lors du changement

### 5.2 Système de Panier

**Architecture** :
- Context API (`CartContext.jsx`) pour état global
- `localStorage` pour persistance
- Clé unique : `id + couleur + taille`
- Toast notifications pour feedback

### 5.3 Optimisations de Performance

- **Images** : `next/image` avec optimisation automatique
- **Code Splitting** : Lazy loading des routes
- **Compilation** : SWC pour builds rapides (58-70s)
- **Cache** : Service Worker optionnel via Vercel
- **Bundle Analysis** : Vérification des tailles de chunks

### 5.4 Sécurité

- **Admin** : Connexion simple avec identifiants
- **Stripe** : Clés API en variables d'environnement
- **Validation** : Vérification des champs obligatoires
- **Sanitization** : Échappement des inputs utilisateur

---

## VI. Métriques et Résultats

### 6.1 Performance du Build

- **Temps de compilation** : 58-70 secondes
- **Taille des fichiers statiques** : ~300 KB
- **Nombre de pages générées** : 36 pages
- **First Load JS** : 102 KB (partagé)

### 6.2 Statistiques du Projet

- **Composants** : 20+ composants réutilisables
- **Pages** : 27 routes (statiques + dynamiques)
- **API Routes** : 6 endpoints
- **Images produits** : 41 PNG uniques
- **Variantes de couleurs** : 37 variantes au total

### 6.3 Qualité du Code

- **Linting** : Aucune erreur ESLint
- **Type Safety** : TypeScript partiel
- **Documentation** : Commentaires dans le code
- **Organisation** : Architecture modulaire claire

---

## VII. Conclusion de l'Étude Bibliographique

### 7.1 Technologies Retenues

Le choix de **Next.js 15** s'est révélé optimal pour ce projet :
- Performance : SSR + SSG mixte
- Développement : Hot reload rapide
- SEO : Meta tags automatiques
- Déploiement : Intégration Vercel native

**Tailwind CSS** a permis un développement rapide du design :
- Utilitaires prêts à l'emploi
- Responsive facile (prefixes sm/md/lg)
- Personnalisation simple (palette couleurs)

**Framer Motion** a apporté la fluidité demandée :
- Animations performantes
- API simple et intuitive
- Animations complexes faciles

### 7.2 Apprentissages Techniques

- Maîtrise du **Server Components** vs **Client Components**
- Compréhension de l'**App Router** de Next.js 15
- Utilisation avancée de **Context API** et hooks
- Intégration **Stripe** avec gestion erreurs
- Optimisation des **performances** web modernes

### 7.3 Difficultés Rencontrées et Solutions

- **Problème** : Mémoire insuffisante au build
  - Solution : Optimisation des imports, suppression code mort

- **Problème** : Erreurs Stripe au build Vercel
  - Solution : Initialisation conditionnelle de l'objet Stripe

- **Problème** : Logo affiché en bleu au lieu de doré
  - Solution : Suppression des filtres CSS `invert()`

- **Problème** : Cartes de tailles différentes
  - Solution : `flex` avec `min-height` uniforme

### 7.4 Améliorations Futures Possibles

- Migration complète TypeScript
- Tests unitaires (Jest + React Testing Library)
- Storybook pour documentation composants
- PWA (Progressive Web App) pour installation mobile
- CMS headless pour gestion du contenu par le client
- Analytics (Google Analytics, Vercel Analytics)
- Optimisation images : conversion WebP/AVIF
- Compression gzip des assets
- Mise en cache avancée

---

## Annexe : Commandes Utiles

```bash
# Installation des dépendances
npm install

# Lancement en mode développement
npm run dev

# Build de production
npm run build

# Démarrage du serveur de production
npm run start

# Linting
npm run lint

# Nettoyage du cache
Remove-Item -Recurse -Force .next
```

---

**Document généré le** : $(date)  
**Projet** : Site vitrine Pari D'Or  
**Version** : 1.0  
**Statut** : Production-ready












