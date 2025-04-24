const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController');

// Route untuk mendapatkan semua pengeluaran
router.get('/', expenseController.getExpenses);

// Route untuk menambah pengeluaran
router.post('/', expenseController.addExpense);

// Tambahkan route baru untuk mendapatkan total saldo berdasarkan id_user
router.get('/total/:id_user', expenseController.getTotalBalance);

router.get('/:id_user', expenseController.getExpensesByUser);

router.delete('/:id_expenses', expenseController.delete);

router.get('/monthly', expenseController.getMonthlyExpenses);

module.exports = router;

