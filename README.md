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

A ferramenta de edição direta no arquivo foi desativada no momento, então não consigo atualizar o README.md diretamente. No entanto, aqui está o conteúdo formatado que você pode colar no seu README.md na seção Première installation du projet:

---

## ✅ Première installation du projet ReVerte

Voici les étapes à suivre après avoir téléchargé le projet pour la première fois.

---

### 📁 1. Cloner le dépôt et accéder au dossier

git clone <url-du-repo>
cd ReVerte


---

### 📦 2. Installer toutes les dépendances (backend + mailer inclus)

npm install

Cela installe également nodemailer, utilisé pour l’envoi d’e-mails d’alerte.

---

### ⚙️ 3. Créer et configurer le fichier .env

Copier le fichier .env.example et le renommer :

cp .env.example .env

Puis, remplir le fichier .env avec ce contenu :

PORT=3001

# PostgreSQL
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=reverte

# MQTT
MQTT_BROKER_URL=mqtt://broker.hivemq.com
MQTT_TOPIC=reverte/capteurs

# Seuils critiques
TEMP_THRESHOLD=30
HUMIDITY_THRESHOLD=80

# E-mail de l'application
MAIL_USER=pharosi.raphael@gmail.com
MAIL_PASS=aohk wama vhdv bghf
MAIL_TO=pharosi.raphael@gmail.com,nourfellag@outlook.fr,rafikzeffane59@gmail.com,nene.almeida78@gmail.com


---

### 🐘 4. Créer la base de données PostgreSQL

Le script init_db.sql permet de créer la base reverte avec les tables nécessaires :

psql -U postgres -f init_db.sql

✅ Cette étape crée également l’utilisateur postgres.
⚠️ Déjà effectuée si vous avez récupéré une base prête. À faire uniquement si besoin.

---

### 🟢 5. Lancer le backend

Dans le dossier ReVerte/ :

npm start

Le backend sera accessible sur :
👉 http://localhost:3001

---

### 🔵 6. Lancer le frontend

Dans un autre terminal, dans le même dossier ReVerte/ :

npm run frontend

Le frontend sera accessible sur :
👉 http://localhost:3000

---

### ✅ Résumé rapide

Étape	Commande	Dossier
Installer dépendances	npm install	ReVerte/
Configurer .env	cp .env.example .env puis modifier	ReVerte/
Créer BDD	psql -U postgres -f init_db.sql	ReVerte/
Lancer backend	npm start	ReVerte/
Lancer frontend	npm run frontend	ReVerte/

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

Perfeito, obrigado pela atualização.
Como frontend e backend estão agora juntos na même racine (ReVerte/), vou adaptar le résumé.

Também vou explicar claramente que le backend écoute sur le port 3001 et le frontend sur le port 3000, ce qui est normal pour des apps fullstack en local.

---

## ✅ Résumé – Lancer l’application ReVerte (structure unifiée)

### 💡 Prérequis :
– npm install déjà exécuté
– fichier .env bien rempli
– base de données PostgreSQL initialisée (init_db.sql)

---

### 📦 Étape 1 – Lancer le backend (port 3001)

📁 Dans le dossier ReVerte/ :

cd ReVerte
npm start

	•	Cela démarre le backend Express.js
	•	Terminal affiche :

✅ Backend ReVerte démarré sur le port 3001
📡 Connecté au broker MQTT



---

### 🌐 Étape 2 – Lancer le frontend (port 3000)

📁 Dans le même dossier ReVerte/, ouvrir un deuxième terminal (ou un nouvel onglet) :

npm run frontend

Cela démarre le serveur React (Vite ou CRA selon config) sur http://localhost:3000

⚠️ Assurez-vous que le script "frontend" est bien défini dans le package.json
Sinon, lancez manuellement :

cd ReVerte
cd frontend
npm install
npm start


---

⚠️ Comment ça fonctionne ?
	•	Le frontend (React) est sur http://localhost:3000
	•	Il envoie les requêtes API vers le backend sur http://localhost:3001

🔁 Cette séparation est normale : React est un client qui communique via HTTP avec le backend Express.

---

### 🐘 PostgreSQL (vérification)

psql -U postgres -d reverte

### Puis dans psql :

SELECT * FROM alertes ORDER BY date DESC LIMIT 5;


---

## 🔁 Résumé rapide (Mac ou Windows)

### ✅ Backend (Terminal 1)

cd ReVerte
npm start

### ✅ Frontend (Terminal 2)

cd ReVerte
npm run frontend

### ✅ PostgreSQL (vérification)

psql -U postgres -d reverte

### Puis dans psql :

SELECT * FROM alertes ORDER BY date DESC LIMIT 5;

### ✅ Tester les alertes avec MQTT Explorer + HiveMQ (instructions à la ligne 212)

---

## 📄 Licence
Projet ReVerte – à usage pédagogique uniquement.  
