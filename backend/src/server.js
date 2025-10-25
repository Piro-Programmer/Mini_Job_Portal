const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const jobRoutes = require('./routes/jobRoutes');
const applicationRoutes = require('./routes/applicationRoutes');
const { protect } = require('./middleware/auth');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/jobs', jobRoutes);
app.use('/applications', applicationRoutes);

// Example protected route
app.get('/employer/dashboard', protect(['employer']), (req, res) => {
  res.send(`Hello Employer ${req.user.id}`);
});

app.get('/', (req, res) => {
  res.send('Server is running successfully 🚀');
});

// Sync DB and start server
sequelize.sync({ alter: true }).then(() => {
  console.log('Database synced');
  app.listen(5000, () => console.log('Server running on port 5000'));
});

