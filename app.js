const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv').config();
const cors = require('cors');
const connectDB = require('./config/database');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRouters');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const { generalRateLimit } = require('./middleware/rateLimitMiddleware');

// Load swagger documentation
const swaggerDocument = YAML.load('./swagger.yaml');

const app = express();

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/auth', authRoutes);
app.use('/api/tasks', generalRateLimit, taskRoutes);
app.use('/api/users', generalRateLimit, userRoutes);
app.use('/api/admin', adminRoutes);


module.exports = app;