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

// Get monthly total expenses for a specific user
exports.getMonthlyExpensesByUser = (req, res) => {
  const { id_user } = req.params;

  if (!id_user) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  const sql = `
    SELECT 
      YEAR(date) AS year,
      MONTH(date) AS month,
      CONCAT(MONTHNAME(MIN(date)), ' ', YEAR(MIN(date))) AS month_name,
      SUM(amount) AS total_amount 
    FROM 
      expenses 
    WHERE 
      id_user = ? 
    GROUP BY 
      YEAR(date), MONTH(date) 
    ORDER BY 
      YEAR(date) DESC, MONTH(date) DESC
  `;

  db.query(sql, [id_user], (err, results) => {
    if (err) {
      console.error("Error getting monthly expenses: ", err.message);
      return res.status(500).json({ error: err.message });
    }

    // Check if data exists
    if (results && results.length > 0) {
      res.json(results);
    } else {
      res.json([]); // Return empty array instead of 404 error
    }
  });
};

// Get monthly total expenses for all users (admin function)
exports.getAllMonthlyExpenses = (req, res) => {
  const sql = `
    SELECT 
      id_user,
      YEAR(date) AS year,
      MONTH(date) AS month,
      CONCAT(MONTHNAME(MIN(date)), ' ', YEAR(MIN(date))) AS month_name,
      SUM(amount) AS total_amount 
    FROM 
      expenses 
    GROUP BY 
      id_user, YEAR(date), MONTH(date) 
    ORDER BY 
      id_user, YEAR(date) DESC, MONTH(date) DESC
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error getting all monthly expenses: ", err.message);
      return res.status(500).json({ error: err.message });
    }

    if (results && results.length > 0) {
      res.json(results);
    } else {
      res.json([]);
    }
  });
};

// Get monthly expenses by category for a specific user
exports.getMonthlyExpensesByCategory = (req, res) => {
  const { id_user } = req.params;

  if (!id_user) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  const sql = `
    SELECT 
      YEAR(date) AS year,
      MONTH(date) AS month,
      CONCAT(MONTHNAME(MIN(date)), ' ', YEAR(MIN(date))) AS month_name,
      category,
      SUM(amount) AS total_amount 
    FROM 
      expenses 
    WHERE 
      id_user = ? 
    GROUP BY 
      YEAR(date), MONTH(date), category
    ORDER BY 
      YEAR(date) DESC, MONTH(date) DESC, category
  `;

  db.query(sql, [id_user], (err, results) => {
    if (err) {
      console.error("Error getting monthly expenses by category: ", err.message);
      return res.status(500).json({ error: err.message });
    }

    if (results && results.length > 0) {
      res.json(results);
    } else {
      res.json([]);
    }
  });
};

