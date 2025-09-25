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

### 📄 Création des tables et de l’utilisateur

Le fichier init_db.sql (présent à la racine du projet) permet de créer :
	•	La base de données reverte
	•	L’utilisateur postgres avec le mot de passe postgres
	•	Les 4 tables nécessaires : capteurs, mesures, alertes, utilisateurs

### Étapes :
#### 1.	Ouvrir un terminal

#### 2.	Se placer dans le dossier /ReVerte :

```bash
cd ReVerte
```

#### 3.	Lancer la commande suivante pour initialiser la base :

```bash
psql -U postgres -f init_db.sql
```

#### 4.	Copier le fichier .env.example vers .env :

```bash
cp .env.example .env
```

#### 5.	Installer les dépendances et lancer le backend :

```bash
npm install
npm start
```

---

## 💻 Connexion à la base de données PostgreSQL (selon votre système)

### 🔵 macOS (avec Homebrew ou Postgres.app)

#### ➤ Vérifiez si `psql` est installé :

```bash
psql --version
```

Si la commande ne fonctionne pas, installez PostgreSQL avec Homebrew :

```bash
brew install postgresql
brew services start postgresql
```

Ou utilisez Postgres.app : [https://postgresapp.com/](https://postgresapp.com/)

#### ➤ Connectez-vous à PostgreSQL :

```bash
psql -U postgres
```

Si nécessaire, créez l’utilisateur :

```bash
createuser -s postgres
```

#### ➤ Connexion à la base déjà créée :

```bash
psql -U postgres -d reverte
```

#### ➤ Commandes utiles dans le prompt :

```sql
\c reverte;
\d
SELECT * FROM alertes;
```

---

### 🟢 Windows / Linux

#### ➤ Connectez-vous à PostgreSQL :

```bash
psql -U postgres
```

#### ➤ Exécutez le script de création si ce n’est pas encore fait :

```bash
psql -U postgres -f init_db.sql
```

#### ➤ Connexion à la base :

```bash
psql -U postgres -d reverte
```

#### ➤ Commandes utiles dans le prompt :

```sql
\c reverte;
\d
SELECT * FROM alertes;
```

## 🧪 Tester les alertes avec MQTT Explorer + HiveMQ

Cette section explique comment simuler une alerte en utilisant MQTT Explorer connecté au broker public HiveMQ.

### 1. 📥 Installer MQTT Explorer

Télécharger et installer depuis : [https://mqtt-explorer.com/](https://mqtt-explorer.com/)

### 2. 🔗 Créer une connexion vers HiveMQ

Dans MQTT Explorer, cliquez sur **“+”** pour ajouter une nouvelle connexion, et entrez les informations suivantes :

| Champ              | Valeur                          |
|-------------------|----------------------------------|
| Nom               | ReVerte (ou autre nom)           |
| Host              | `broker.hivemq.com`              |
| Port              | `1883`                           |
| Client ID         | `reverte-tester` (ou unique)     |

Laissez le login/mot de passe vide. Cliquez sur **Connect**.

### 3. 📤 Publier un message simulé (alerte température)

- Allez dans l'onglet **"Publish"**
- Renseignez :
  - **Topic** : `reverte/capteurs`
  - **Payload (JSON)** :

```json
{
  "capteur_id": "test-salle",
  "temperature": 35.7,
  "humidite": 60.2
}
```

Cela générera une alerte si `TEMP_THRESHOLD` est défini à 30.

### 4. 📤 Publier un message simulé (alerte humidité)

```json
{
  "capteur_id": "test-salle",
  "temperature": 27.5,
  "humidite": 87.1
}
```

Cela générera une alerte si `HUMIDITY_THRESHOLD` est défini à 80.

### 5. 🖥️ Vérification dans le terminal

Dans le terminal où le backend tourne, vous verrez :

```
📥 Données reçues MQTT: ...
⚠️ Alerte générée: ...
📧 Alerte envoyée par e-mail: ...
```

### 6. 🐘 Vérifier l’alerte dans PostgreSQL

Lancez :

```sql
SELECT * FROM alertes ORDER BY date DESC LIMIT 5;
```

Cela permet de confirmer que l'alerte a bien été enregistrée en base.

---

## 💻 Technologies utilisées
- **Frontend** : React, Chakra UI, React Router, Chart.js, Leaflet  
- **Backend** : Node.js, Express.js, PostgreSQL, MQTT, Nodemailer  
- **Base de données** : PostgreSQL  

---

## 📄 Licence
Projet ReVerte – à usage pédagogique uniquement.  
