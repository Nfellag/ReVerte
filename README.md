# ReVerte
Projet fil rouge W3

# 🛠️ Backend – ReVerte

Ce répertoire contient le **serveur backend** du projet ReVerte.  
Il est développé en **Node.js** avec **Express.js** et permet de gérer les capteurs, les alertes, et la base de données PostgreSQL.

---

## 🚀 Fonctionnalités principales

- Réception des données depuis les capteurs (via API REST ou MQTT)
- Enregistrement des mesures dans PostgreSQL
- Détection des seuils critiques (température, humidité)
- Génération d'alertes automatiques
- API REST publique pour le frontend (`/api/sensors`, `/api/alertes`)

---

## 📦 Installation

1. Cloner le projet et accéder au dossier backend :
```bash
cd backend
```

2. Installer les dépendances :
```bash
npm install
```

3. Copier le fichier `.env.example` et le renommer :
```bash
cp .env.example .env
```

4. Remplir les variables d’environnement dans le fichier `.env`.

5. Lancer le serveur :
```bash
npm start
```

---

## ⚙️ Fichier `.env.example`

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

---

## 📁 Structure des dossiers

```
backend/
├── index.js               # Point d’entrée du serveur
├── routes/                # Routes API REST
│   ├── sensors.js
│   └── alertes.js
├── mqtt/                  # Connexion MQTT
│   └── mqttClient.js
├── db/                    # Connexion PostgreSQL
│   └── pool.js
├── services/              # Logique métier (alertes)
│   └── alerts.js
├── .env.example           # Variables d’environnement (modèle)
└── package.json
```

---

## Base des Données
```

## 🛠️ Initialisation de la base de données PostgreSQL

1. Assurez-vous que PostgreSQL est installé sur votre machine.
2. Dans le terminal, exécutez :

```bash
psql -U postgres -f init_db.sql




## 📄 Licence

Projet ReVerte – à usage pédagogique uniquement.