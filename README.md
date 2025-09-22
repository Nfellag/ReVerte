# 🌱 ReVerte  
Projet fil rouge W3 – Application fullstack de surveillance des îlots de chaleur urbains  

---

## 📌 Description
ReVerte est une application composée de :  
- **Frontend** : React + Chakra UI  
- **Backend** : Node.js (Express.js, MQTT, PostgreSQL)  

Elle permet de surveiller les **îlots de chaleur urbains** grâce à des capteurs connectés, de visualiser les mesures (température, humidité) et de générer des alertes.  

---

## 🚀 Fonctionnalités principales
- Visualisation en temps réel des capteurs (carte interactive, heatmap)  
- Historique des mesures et alertes  
- Réception des données depuis les capteurs (via API REST ou MQTT)  
- Enregistrement des mesures dans PostgreSQL  
- Détection des seuils critiques (température, humidité)  
- Génération d'alertes automatiques  
- Gestion des préférences utilisateur (notifications, profil, etc.)  

---

## 🛠️ Installation & lancement

### 1. Cloner le projet
```bash
git clone <url-du-repo>
cd reverte
```

### 2. Installer les dépendances
```bash
npm install
```

### 3. Variables d’environnement
Copier le fichier `.env.example` vers `.env` puis renseigner les valeurs nécessaires.

```bash
cp backend/.env.example backend/.env
```

Exemple de configuration (`backend/.env`) :
```env
PORT=3001

# Base de données PostgreSQL
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=reverte

# Broker MQTT
MQTT_BROKER=mqtt://broker.hivemq.com
MQTT_TOPIC=reverte/capteurs

# Seuils critiques
TEMP_THRESHOLD=30
HUMIDITY_THRESHOLD=80
```

### 4. Lancer le projet
```bash
npm start
```
👉 Cela lance **frontend + backend** en parallèle.  

- Frontend accessible sur : [http://localhost:3000](http://localhost:3000)  
- Backend accessible sur : [http://localhost:3001](http://localhost:3001)  

---

## 📁 Structure du projet
```
reverte/
├── frontend/             # Application React (Chakra UI)
│   ├── src/              # Composants & pages
│   └── public/           # Assets
│
├── backend/              # API Express.js
│   ├── index.js          # Point d’entrée du serveur
│   ├── routes/           # Routes API REST (sensors, alertes, etc.)
│   ├── mqtt/             # Connexion MQTT
│   ├── db/               # Connexion PostgreSQL
│   ├── services/         # Logique métier
│   └── init_db.sql       # Script SQL d’initialisation
│
├── package.json          # Scripts et dépendances communs
└── README.md             # Documentation
```

---

## 🐘 Base de données PostgreSQL

### 1. Création de la base
Depuis `/backend` :
```bash
psql -U postgres -f init_db.sql
```

Ce script crée :
- La base `reverte`
- L’utilisateur `postgres` (`mot de passe : postgres`)
- Les tables : `capteurs`, `mesures`, `alertes`, `utilisateurs`

### 2. Connexion
```bash
psql -U postgres -d reverte
```

Commandes utiles dans `psql` :
```sql
\c reverte;
\d
SELECT * FROM alertes;
```

---

## 💻 Technologies utilisées
- **Frontend** : React, Chakra UI, React Router, Chart.js, Leaflet  
- **Backend** : Node.js, Express.js, PostgreSQL, MQTT, Nodemailer  
- **Base de données** : PostgreSQL  

---

## 📄 Licence
Projet ReVerte – à usage pédagogique uniquement.  
