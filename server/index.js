  const express = require('express');
  const cors = require('cors'); 
  const connectDB = require('./config/db.js');
  const authRoutes = require('./routes/auth.js');
  const pollRoutes = require('./routes/pollRoutes.js');
  const app = express();
  connectDB();
  const PORT = 5000; 
  app
// middleware
  app.use(express.json()); 
  app.use(cors()); 

  //routes

  app.get('/api/test', (req, res) => {
    res.json({
      message: 'API is working!',
      timestamp: new Date().toLocaleTimeString()
    });
  });

  app.use('/api/auth', authRoutes);
  app.use('/api/polls', pollRoutes);

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });