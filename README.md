# ReVerte – Backend (Express.js + PostgreSQL)

Backend conforme aux spécifications du projet **ReVerte** : ingestion des mesures RuuviTag via passerelles (Raspberry Pi/Linux), analyse des seuils (> 30°C par défaut), enregistrement en base PostgreSQL, émission d’alertes (Telegram, e‑mail) et API publique pour le frontend.

## Périmètre (résumé)
- **Ingestion**: `POST /api/sensors` — réception de mesures depuis les passerelles.
- **Dashboard**: `GET /api/dashboard` — API publique pour le frontend (carte/graphes).
- **Alertes**: création automatique en cas de dépassement de seuil, envoi Telegram/e‑mail et anti‑spam (throttle) par capteur/type.
- **Sécurité**: clé d’ingestion (`x-api-key`) pour les passerelles; JWT pour endpoints protégés.
- **Base**: PostgreSQL avec tables `sensors`, `measurements`, `alerts`, `users`.

> Seuil par défaut **30°C** (paramétrable par env `ALERT_TEMP_THRESHOLD_C`).

## Démarrage
1. Copier `.env.example` en `.env` et renseigner les variables.
2. Installer les dépendances :
   ```bash
   npm install
   ```
3. Créer la base et appliquer le schéma/migrations :
   ```bash
   npm run migrate
   npm run seed   # optionnel (utilisateur admin de démo)
   ```
4. Lancer le serveur :
   ```bash
   npm run dev
   # ou
   npm start
   ```

## Endpoints principaux
- `POST /api/sensors` (protégé par `x-api-key`)  
  Body JSON exemple :
  ```json
  {
    "sensor_id": "ruuvi-001",
    "type": "RuuviTag",
    "lat": 48.8566,
    "lng": 2.3522,
    "temperature": 31.7,
    "humidity": 52.1,
    "pressure": 1012.3,
    "timestamp": "2025-08-21T16:23:10Z"
  }
  ```
- `GET /api/dashboard` (public) — renvoie les dernières mesures par capteur + agrégats récents.
- `POST /api/auth/login` — JWT pour rôle admin/ONG.
- `GET /api/alerts` — liste des alertes récentes (JWT requis).

## Performances & Qualité
- Index adaptés sur `measurements(sensor_id, recorded_at)` et `alerts(sensor_id, created_at)`.
- Réponses < 2s avec pool PostgreSQL, requêtes agrégées et pagination.
- Endpoint `GET /health` pour supervision.
- Tests unitaires *light* sous Node’s test runner (exemples à ajouter selon le besoin).

## Sécurité & Données
- Pas de PII; géolocalisation capteurs stockée (lat/lng).
- Authentification JWT pour endpoints sensibles (utilisateurs ONG/admin).
- Ingestion protégée par clé partagée (passerelles).

## Structure
```
src/
  server.js
  app.js
  config.js
  db/pool.js
  middlewares/
    auth.js
    error.js
    apiKey.js
  routes/
    sensors.js
    dashboard.js
    alerts.js
    auth.js
    health.js
  services/
    alertService.js
    userService.js
  utils/
    validation.js
sql/
  schema.sql
  seed.sql
scripts/
  migrate.js
  seed.js
```

## Licence
MIT
