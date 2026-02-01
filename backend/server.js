const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./config/swagger');
require('dotenv').config();

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ extended: true, limit: '100mb' }));
app.use(cors());

// Define Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/projects', require('./routes/projectRoutes'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// Serve static assets in production
// (Placeholder for future build steps)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
