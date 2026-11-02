const mongoose = require('mongoose');
const dbgr = require('debug')("development:mongoose");

const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017';  // Fallback if .env is not set

mongoose.connect(mongoURI)
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((error) => {
    console.log(`MongoDB connection error: ${error}`);
  });
