const express = require('express');
const app = express();
const port = 80;
const userRoutes = require('./routes/userRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const expenseRoutes = require('./routes/expenseRoutes');

app.use(express.json());

app.use('/users', userRoutes);
app.use('/categories', categoryRoutes);
app.use('/expenses', expenseRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

