const path = require('path');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const errorHandlre = require('./middleware/errorHandler');
const connectDB = require('./config/db');
require('colors');
require('dotenv').config({ path: './config/config.env' });

// Include resource routes
const authRoute = require('./routes/auth');

const app = express();

// Connect mongo database
connectDB();

if(process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Enable cors
app.use(cors());


// Mount routes
app.use('/api/auth', authRoute);

// Handle error middleware
app.use(errorHandlre);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running ${process.env.NODE_ENV} mode in ${PORT} port`.yellow.bold);
});

// Handler unhandlr promise rejection
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
});