# 📍 Où se trouve le Loader ?

## ✅ Emplacement du Loader

### Fichier
- **`components/Loader.jsx`** - Composant loader luxueux

### Intégration
- **`app/LayoutClient.jsx`** (ligne 56) - Loader rendu dans le layout principal

### Logo
- **`public/logo.png`** - Logo utilisé dans le loader

---

## 🎨 Design du Loader

- **Fond** : Noir profond `#0F0F0F`
- **Logo** : Doré avec drop-shadow lumineux
- **Texte** : "L'ART DU CONFORT" en Playfair Display, couleur dorée `#C7A451`
- **Ligne** : Fine ligne dorée dégradée
- **Barre** : Barre de chargement subtile

---

## ⏱️ Durée d'Affichage

- **Temps minimum** : 1.5 secondes (1500ms)
- **Temps maximum** : 2.5 secondes (2500ms)
- **Animation de sortie** : 0.8 secondes (fade + slide up)

---

## 🔍 Comment Voir le Loader

### 1. Hard Refresh
- **Windows/Linux** : `Ctrl + Shift + R`
- **Mac** : `Cmd + Shift + R`

### 2. Navigation Privée
- Ouvrir une fenêtre de navigation privée
- Accéder à `http://localhost:3000`

### 3. Vider le Cache
- Ouvrir les outils de développement (F12)
- Clic droit sur le bouton de rafraîchissement
- Sélectionner "Vider le cache et actualiser"

### 4. Redémarrer le Serveur
```bash
# Arrêter le serveur (Ctrl + C)
npm run dev
```

---

## 🚨 Notes Importantes

1. **Le loader s'affiche uniquement sur les pages publiques**
   - Masqué sur les pages admin (`/admin*`)
   - Affiché sur toutes les autres pages

2. **En développement avec hot reload**
   - Le loader peut ne pas s'afficher si la page est déjà chargée
   - Utiliser un hard refresh pour forcer le rechargement

3. **Le loader est optimisé pour la performance**
   - Ne bloque pas l'hydratation React
   - Ne ralentit pas le chargement
   - Se désactive automatiquement après le chargement

---

## 🔧 Vérifications

### Le loader est présent si :
- ✅ `components/Loader.jsx` existe
- ✅ `app/LayoutClient.jsx` importe et rend `<Loader />`
- ✅ `public/logo.png` existe
- ✅ Le serveur de développement est démarré

### Le loader s'affiche si :
- ✅ Vous êtes sur une page publique (pas `/admin*`)
- ✅ Vous faites un hard refresh ou une navigation privée
- ✅ Le serveur vient d'être démarré
- ✅ La page n'est pas déjà chargée en cache

---

## 🎯 Résumé

Le loader **est bien présent et intégré** dans le projet. Il s'affiche automatiquement au chargement de la page et disparaît après 1.5 à 2.5 secondes.

Pour le voir, faites un **hard refresh** (`Ctrl + Shift + R`) ou ouvrez le site dans une **fenêtre de navigation privée**.

---

**Status** : ✅ Loader présent et fonctionnel

