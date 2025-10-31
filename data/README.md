# 📦 Système de Stockage des Commandes - Pari D'Or

## 🎯 Vue d'ensemble

Ce projet utilise un système de stockage **local basé sur JSON** pour gérer les commandes, éliminant toute dépendance à MongoDB.

---

## 📂 Structure des Données

### `orders.json`

Fichier JSON contenant toutes les commandes sous forme de tableau d'objets.

**Exemple de structure :**

```json
[
  {
    "id": "cs_test_a1B2c3D4e5F6g7H8i9J0k1L2m3N4o5P6q7R8s9T0u1V2w3X4y5Z6",
    "customerName": "Youssef El Mansouri",
    "customerEmail": "youssef@gmail.com",
    "customerPhone": "+212 6 12 34 56 78",
    "customerAddress": "123 Rue Mohammed V, Casablanca",
    "totalAmount": 4500,
    "paymentMethod": "stripe",
    "status": "payée",
    "date": "2025-10-29T23:11:00Z",
    "articles": [
      {
        "name": "Canapé Velours Doré",
        "quantity": 1,
        "price": 4500,
        "size": "3 places",
        "color": "Doré"
      }
    ]
  }
]
```

---

## 🔑 Champs Obligatoires

| Champ | Type | Description | Exemple |
|-------|------|-------------|---------|
| `id` | String | Identifiant unique (session Stripe ou généré) | `"cs_test_a1B2c3..."` |
| `customerName` | String | Nom du client | `"Youssef El Mansouri"` |
| `customerEmail` | String | Email du client | `"youssef@gmail.com"` |
| `totalAmount` | Number | Montant total en MAD | `4500` |
| `paymentMethod` | String | Mode de paiement | `"stripe"` ou `"whatsapp"` |
| `status` | String | Statut de la commande | `"en attente"`, `"payée"`, `"livrée"`, `"annulée"` |
| `date` | String (ISO) | Date de création | `"2025-10-29T23:11:00Z"` |
| `articles` | Array | Liste des articles | Voir structure ci-dessous |

### Structure d'un Article

```json
{
  "name": "Canapé Velours Doré",
  "quantity": 1,
  "price": 4500,
  "size": "3 places",
  "color": "Doré"
}
```

---

## 🔄 Flux des Données

### 1️⃣ **Création d'une Commande (Stripe)**

**Route :** `POST /api/checkout`

**Processus :**
1. Client envoie le panier + infos client
2. Création de la session Stripe
3. Ajout de la commande dans `orders.json` avec status `"en attente"`
4. Redirection vers Stripe Checkout

**Code (extrait) :**
```javascript
const newOrder = {
  id: session.id,
  customerName: customerInfo?.name || "Client",
  customerEmail: customerInfo?.email || "client@paridor.com",
  totalAmount: totalAmount,
  paymentMethod: "stripe",
  status: "en attente",
  date: new Date().toISOString(),
  articles: items.map(...)
};

orders.unshift(newOrder); // Ajouter au début
await fs.writeFile(filePath, JSON.stringify(orders, null, 2));
```

---

### 2️⃣ **Mise à Jour du Statut (Après Paiement)**

**Route :** `POST /api/orders/update-status`

**Processus :**
1. Page `/success` envoie le `sessionId`
2. Recherche de la commande dans `orders.json`
3. Mise à jour du statut à `"payée"`
4. Sauvegarde du fichier

**Code (extrait) :**
```javascript
const orderIndex = orders.findIndex(order => order.id === sessionId);
orders[orderIndex].status = "payée";
await fs.writeFile(filePath, JSON.stringify(orders, null, 2));
```

---

### 3️⃣ **Modification du Statut (Dashboard Admin)**

**Route :** `PUT /api/orders/[id]`

**Processus :**
1. Admin change le statut via le menu déroulant
2. Conversion statut anglais → français
3. Mise à jour dans `orders.json`
4. Confirmation visuelle

**Statuts Disponibles :**
- `"en attente"` (jaune)
- `"payée"` (vert)
- `"livrée"` (bleu)
- `"annulée"` (rouge)

---

### 4️⃣ **Lecture des Commandes (Dashboard Admin)**

**Route :** `GET /api/admin/orders`

**Processus :**
1. Vérification du token d'authentification
2. Lecture de `orders.json`
3. Tri par date décroissante
4. Conversion des statuts français → anglais pour l'affichage

**Code (extrait) :**
```javascript
const fileData = await fs.readFile(filePath, "utf8");
const orders = JSON.parse(fileData);

const sortedOrders = orders.sort((a, b) => 
  new Date(b.date).getTime() - new Date(a.date).getTime()
);
```

---

## 🚀 Avantages de ce Système

✅ **Pas de base de données externe** → Fonctionnement 100% local  
✅ **Pas de connexion réseau requise** → Fonctionne hors ligne  
✅ **Simplicité** → Fichier JSON lisible et modifiable  
✅ **Rapidité** → Pas de latence réseau  
✅ **Portabilité** → Facile à migrer ou sauvegarder  
✅ **Débogage facile** → Inspecter directement `orders.json`  

---

## 🔒 Sécurité

### Authentification Admin

**Fichier :** `.env.local`

```env
ADMIN_USER=adminparidor
ADMIN_PASS=WF2025SuperSecure
```

**Route :** `POST /api/admin/login`

**Vérification :**
- Identifiants stockés dans les variables d'environnement
- Token généré après connexion réussie
- Token vérifié à chaque requête admin

---

## 📊 Statistiques du Dashboard

Le dashboard admin calcule automatiquement :

- **Total des commandes**
- **Commandes payées** (statut `"payée"`)
- **En attente** (statut `"en attente"`)
- **Clients uniques** (basé sur les emails)

**Code (extrait) :**
```javascript
const totalOrders = orders.length;
const paidOrders = orders.filter(o => o.status === "paid").length;
const pendingOrders = orders.filter(o => o.status === "pending").length;
const uniqueClients = new Set(orders.map(o => o.customerEmail)).size;
```

---

## 🧪 Tester le Système

### 1. Créer une Commande Test

Ajoutez manuellement dans `orders.json` :

```json
{
  "id": "TEST001",
  "customerName": "Test Client",
  "customerEmail": "test@paridor.com",
  "customerPhone": "+212 6 00 00 00 00",
  "totalAmount": 1500,
  "paymentMethod": "stripe",
  "status": "en attente",
  "date": "2025-10-29T10:00:00Z",
  "articles": [
    {
      "name": "Produit Test",
      "quantity": 1,
      "price": 1500
    }
  ]
}
```

### 2. Accéder au Dashboard

```
URL : http://localhost:3000/admin-2025-secret
Username : adminparidor
Password : WF2025SuperSecure
```

### 3. Vérifier l'Affichage

- ✅ Commande visible dans le tableau
- ✅ Badge "En attente" en jaune
- ✅ Montant affiché correctement
- ✅ Email du client visible

### 4. Changer le Statut

- Cliquer sur le menu déroulant
- Sélectionner "Payée"
- Vérifier que le badge devient vert
- Inspecter `orders.json` → statut changé en `"payée"`

---

## 🛠️ Maintenance

### Sauvegarder les Commandes

```bash
# Créer une copie de sauvegarde
cp data/orders.json data/orders.backup.json
```

### Réinitialiser

```bash
# Vider toutes les commandes
echo "[]" > data/orders.json
```

### Migrer vers MongoDB (Optionnel)

Si vous souhaitez revenir à MongoDB :

1. Lire `orders.json`
2. Parser le JSON
3. Créer les documents MongoDB
4. Restaurer les imports MongoDB dans les routes

---

## 📝 Logs de Débogage

Tous les logs sont visibles dans la console du serveur :

```
✅ Commande Stripe créée (en attente) dans orders.json - Session: cs_test_...
✅ Statut de commande mis à jour: cs_test_... → payée
✅ 3 commandes chargées depuis orders.json
```

---

## 🎉 Résultat Final

- ✅ **Système 100% local**
- ✅ **Aucune dépendance MongoDB**
- ✅ **Dashboard admin fonctionnel**
- ✅ **Modification des statuts en temps réel**
- ✅ **Commandes visibles immédiatement**
- ✅ **Prêt pour la production**

---

**Version :** 1.0  
**Date :** Octobre 2025  
**Projet :** Pari D'Or - E-commerce Luxe Marocain


