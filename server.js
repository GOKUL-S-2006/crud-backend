const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const dbConnect = require('./config/db');

const app = express();
// Load environment variables
dotenv.config();


dbConnect();


app.use(cors({
  origin: ['http://localhost:5173', 'https://crud-front-end-tan.vercel.app'],
  credentials: true
}));

// Middleware
app.use(express.json());

// Routes
const dataRoutes = require('./routes/data');
app.use('/api', dataRoutes); // optional to prefix with /api

// Server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
