const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const dbConnect = require('./config/db');

const app = express();

// Load environment variables
dotenv.config();

// Connect to MongoDB
dbConnect();

// Enable CORS for specific origins (localhost + Vercel frontend)
app.use(cors({
    origin: ['http://localhost:5173', 'https://crud-front-end-tan.vercel.app']
}));

// Middleware to parse JSON request bodies
app.use(express.json());

// Use your routes
const dataRoutes = require('./routes/data');
app.use(dataRoutes);

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server Up on port ${PORT}`);
});
