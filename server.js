const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const pool = mysql.createPool({
  host: 'localhost',      // seu host MySQL
  user: 'root',           // seu usuário MySQL
  password: 'sua_senha',  // sua senha MySQL
  database: 'emails_db',  // seu banco de dados
  waitForConnections: true,
  connectionLimit: 10
});

// GET - buscar todos os emails
app.get('/api/emails', async (req, res) => {
  try {
    const conn = await pool.getConnection();
    const [rows] = await conn.execute('SELECT * FROM emails');
    conn.release();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST - adicionar email
app.post('/api/emails', async (req, res) => {
  const { name, email, category, created_at } = req.body;
  try {
    const conn = await pool.getConnection();
    await conn.execute(
      'INSERT INTO emails (name, email, category, created_at) VALUES (?, ?, ?, ?)',
      [name, email, category, created_at]
    );
    conn.release();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE - excluir email
app.delete('/api/emails/:id', async (req, res) => {
  try {
    const conn = await pool.getConnection();
    await conn.execute('DELETE FROM emails WHERE id = ?', [req.params.id]);
    conn.release();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});