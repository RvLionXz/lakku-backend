const db = require('../db');
const moment = require('moment-timezone');

// Get all expenses
exports.getExpenses = (req, res) => {
  db.query('SELECT * FROM expenses', (err, results) => {
    if (err) {
      console.error("Error getting expenses: ", err.message);
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
};

// Add a new expense
exports.addExpense = (req, res) => {
  const { id_user, category, description, amount } = req.body;

  console.log('Category:', category);

  if (!id_user || !category || !amount) {
    return res.status(400).json({ error: 'Data tidak lengkap!' });
  }

  // Validasi amount agar angka
  if (isNaN(amount) || amount <= 0) {
    return res.status(400).json({ error: 'Amount harus berupa angka positif!' });
  }

  // Jika date kosong, gunakan tanggal Asia/Jakarta
  const currentDate = moment().tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss');

  const sql = 'INSERT INTO expenses (id_user, category, description, amount, date) VALUES (?, ?, ?, ?, ?)';
  const values = [id_user, category, description, amount, currentDate];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error adding expense: ", err.message);
      return res.status(500).json({ error: err.message });
    }
    res.json({
      message: 'Pengeluaran berhasil ditambahkan!',
      id_expenses: result.insertId,
    });
  });
};

// Get total balance for user
exports.getTotalBalance = (req, res) => {
  const { id_user } = req.params;

  db.query(
    'SELECT SUM(amount) AS total FROM expenses WHERE id_user = ?',
    [id_user],
    (err, results) => {
      if (err) {
        console.error("Error getting total balance: ", err.message);
        return res.status(500).json({ error: err.message });
      }

      const totalBalance = results[0].total || 0;
      res.json({ total: totalBalance });
    }
  );
};

// Get expenses by user ID
exports.getExpensesByUser = (req, res) => {
  const { id_user } = req.params;

  db.query(
    'SELECT * FROM expenses WHERE id_user = ?',
    [id_user],
    (err, results) => {
      if (err) {
        console.error("Error getting expenses by user: ", err.message);
        return res.status(500).json({ error: err.message });
      }

      res.json(results);
    }
  );
};

// Delete expense
exports.delete = (req, res) => {
  const { id_expenses } = req.params;

  db.query(
    'DELETE FROM expenses WHERE id_expenses = ?',
    [id_expenses],
    (err, result) => {
      if (err) {
        console.error("Error deleting expense: ", err.message);
        return res.status(500).json({ error: err.message });
      }

      res.status(200).json({ message: 'Expense deleted successfully!', result: result });
    }
  );
};

// Get monthly total expenses for each user
exports.getMonthlyExpenses = (req, res) => {
  const sql = `
    SELECT 
      id_user, 
      DATE_FORMAT(MIN(date), '%M %Y') AS bulan, 
      SUM(amount) AS total_pengeluaran 
    FROM 
      expenses 
    GROUP BY 
      id_user, YEAR(date), MONTH(date) 
    ORDER BY 
      id_user, YEAR(date), MONTH(date)
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error getting monthly expenses: ", err.message);
      return res.status(500).json({ error: err.message });
    }

    // Periksa apakah ada data yang ditemukan
    if (results && results.length > 0) {
      res.json(results);
    } else {
      res.status(404).json({ message: "Tidak ada data pengeluaran bulan ini." });
    }
  });
};

