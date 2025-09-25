const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { Pool } = require("pg");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Connexion PostgreSQL
const pool = new Pool({
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "root",
  database: process.env.DB_NAME || "reverte",
});

// --- Santé du serveur ---
app.get("/api/health", (_req, res) => {
  res.json({ ok: true, message: "API en ligne 🚀" });
});

// --- GET : liste des utilisateurs ---
app.get("/api/utilisateurs", async (_req, res) => {
  console.log("📥 Requête GET /api/utilisateurs reçue");
  try {
    const result = await pool.query(
      "SELECT id, nom, email, age, gender FROM utilisateurs ORDER BY id ASC"
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Erreur GET /api/utilisateurs:", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// --- POST : inscription utilisateur ---
app.post("/api/utilisateurs", async (req, res) => {
  const { nom, email, age, gender, password } = req.body;

  if (!nom || !email || !password) {
    return res.status(400).json({ error: "Champs requis manquants" });
  }

  try {
    const existing = await pool.query("SELECT * FROM utilisateurs WHERE email = $1", [email]);
    if (existing.rows.length > 0) {
      return res.status(400).json({ error: "Cet email est déjà utilisé" });
    }

    const result = await pool.query(
      `INSERT INTO utilisateurs (nom, email, age, gender, password)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, nom, email, age, gender`,
      [nom, email, age, gender, password]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Erreur POST /api/utilisateurs:", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// --- POST : login ---
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query(
      "SELECT id, nom, email, age, gender FROM utilisateurs WHERE email = $1 AND password = $2",
      [email, password]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: "Identifiants invalides" });
    }

    res.json({ token: "fake-jwt-token", user: result.rows[0] });
  } catch (err) {
    console.error("Erreur POST /api/login:", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// --- GET : toutes les alertes ---
app.get("/api/alertes", async (_req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, capteur_id, type, valeur, date FROM alertes ORDER BY date DESC"
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Erreur GET /api/alertes:", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// --- GET : alertes par capteur ---
app.get("/api/alertes/:capteur_id", async (req, res) => {
  const { capteur_id } = req.params;
  try {
    const result = await pool.query(
      "SELECT id, capteur_id, type, valeur, date FROM alertes WHERE capteur_id = $1 ORDER BY date DESC",
      [capteur_id]
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Erreur GET /api/alertes/:capteur_id:", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// --- Lancer le serveur ---
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`✅ API en ligne sur http://localhost:${PORT}`));
