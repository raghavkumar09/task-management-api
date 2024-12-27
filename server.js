const app = require('./app');
const dotenv = require('dotenv').config();
const connectDB = require('./config/database');
const http = require('http');

// connectDB();

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});