const db = require('../db');

exports.register = (req, res) => {
  const { username, email, password } = req.body;

  // Validasi data
  if (!username || username.trim() === '') {
    return res.status(400).json({ error: "Username tidak boleh kosong!" });
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: "Format email tidak valid!" });
  }

  if (!password || password.length < 6) {
    return res.status(400).json({ error: "Password minimal 6 karakter!" });
  }

  // Periksa apakah email sudah terdaftar
  db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (results.length > 0) {
      return res.status(400).json({ error: "Email sudah terdaftar!" });
    }

    // Simpan ke database
    db.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
      [username, email, password],
      (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.status(201).json({ message: 'User berhasil terdaftar!', id_user: result.insertId });
      });
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email dan Password tidak boleh kosong!" });
  }

  db.query('SELECT * FROM users WHERE email = ? AND password = ?',
    [email, password],
    (err, results) => {
      if (err) return res.status(500).json({ error: err });
      if (results.length > 0) {
        res.json({ message: 'Login berhasil!', user: results[0] });
      } else {
        res.status(401).json({ message: 'Email atau Password salah!' });
      }
    });
};

exports.getUsers = (req, res) => {
  db.query('SELECT id_user, username, email FROM users', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

