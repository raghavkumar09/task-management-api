const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const connectDB = require('./config/database');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const userRoutes = require('./routes/userRoutes');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const { generalRateLimit } = require('./middleware/rateLimitMiddleware');

// Load swagger documentation
const swaggerDocument = YAML.load('./swagger.yaml');

const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/auth', authRoutes);
app.use('/api/tasks', generalRateLimit, taskRoutes);
app.use('/api/users', generalRateLimit, userRoutes);


const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));