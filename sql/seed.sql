-- Example seed: admin user (password: admin123)
INSERT INTO users (name, email, password_hash, role, organization)
VALUES (
  'Admin',
  'admin@reverte.local',
  '$2a$10$w2BR5A3q0e8kAHq1oL2fUuZJ9o7F5M8D6qvBfY3hE5N2uYkq7m9qW', -- bcrypt for 'admin123'
  'admin',
  'ReVerte'
)
ON CONFLICT DO NOTHING;
