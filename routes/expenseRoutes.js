const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController');

// Route untuk mendapatkan semua pengeluaran
router.get('/', expenseController.getExpenses);

// Route untuk menambah pengeluaran
router.post('/', expenseController.addExpense);

// Route untuk mendapatkan total saldo berdasarkan id_user
router.get('/total/:id_user', expenseController.getTotalBalance);

// Route untuk mendapatkan semua pengeluaran berdasarkan id_user
router.get('/user/:id_user', expenseController.getExpensesByUser);

// Route untuk menghapus pengeluaran berdasarkan id_expenses
router.delete('/:id_expenses', expenseController.delete);

// Route untuk mendapatkan pengeluaran bulanan berdasarkan id_user
router.get('/monthly/user/:id_user', expenseController.getMonthlyExpensesByUser);

// Route untuk mendapatkan semua pengeluaran bulanan (untuk admin)
router.get('/monthly/all', expenseController.getAllMonthlyExpenses);

// Route untuk mendapatkan pengeluaran bulanan berdasarkan kategori dan id_user
router.get('/monthly/category/:id_user', expenseController.getMonthlyExpensesByCategory);

module.exports = router;