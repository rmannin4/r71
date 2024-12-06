const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2/promise');
require('dotenv').config();

const app = express();
const PORT = 3000;

// Secret key for JWT
const SECRET_KEY = 'your_jwt_secret';

// Middleware
app.use(bodyParser.json());
app.use(cors({
    origin: 'http://165.22.7.42>',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));


// MySQL Database connection
const db = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'clean_energy',
});

// Hardcoded credentials
const userCredentials = { username: 'Ryan', password: 'Ryan' };

// Login route
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    console.log(`Received: Username=${username}, Password=${password}`);

    if (username === userCredentials.username && password === userCredentials.password) {
        // Generate a JWT
        const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
        res.status(200).json({ token });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

// Middleware to verify JWT
const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(403).json({ message: 'Token required' });
    }

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid token' });
        }
        req.user = decoded;
        next();
    });
};

// Endpoint for Summary chart data (Clean Tech Venture Capital and Interest Rates)
app.get('/summary-data', verifyToken, async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM summary_data');
        res.json(rows);
    } catch (error) {
        console.error('Error fetching summary data:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Endpoint for Reports chart data (Geothermal Potential vs. Installed Capacity)
app.get('/reports-data', verifyToken, async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM reports_data');
        res.json(rows);
    } catch (error) {
        console.error('Error fetching reports data:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Start server
app.listen(PORT, '0.0.0.0', () => console.log(`Backend running on port ${PORT}`));
