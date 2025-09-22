-- Création de l'utilisateur PostgreSQL
CREATE USER postgres WITH PASSWORD 'postgres';
ALTER USER postgres CREATEDB;
ALTER USER postgres WITH SUPERUSER;

-- Création de la base de données (si elle n'existe pas déjà)
CREATE DATABASE reverte;

-- Connexion à la base
\c reverte;

-- Table : capteurs
CREATE TABLE capteurs (
  id SERIAL PRIMARY KEY,
  type TEXT,
  localisation TEXT,
  derniere_activite TIMESTAMP
);

-- Table : mesures
CREATE TABLE mesures (
  id SERIAL PRIMARY KEY,
  id_capteur TEXT,
  temperature NUMERIC,
  humidite NUMERIC,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table : alertes
CREATE TABLE alertes (
  id SERIAL PRIMARY KEY,
  capteur_id TEXT,
  type TEXT,
  valeur NUMERIC,
  date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table : utilisateurs
CREATE TABLE utilisateurs (
  id SERIAL PRIMARY KEY,
  nom TEXT,
  type TEXT,
  preferences JSONB,
  notifications BOOLEAN
);