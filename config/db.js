const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');

const connectDB = asyncHandler(async (req, res, next) => {
  const dbUser = process.env.DB_USER;
  const dbPwd = process.env.DB_PASSWORD;
  const dbHost = process.env.DB_HOST;
  const dbName = process.env.DB_NAME;

  const MONGO_URI = `mongodb://${dbUser}:${dbPwd}@${dbHost}:27017/${dbName}?authSource=admin`;

  const conn = await mongoose.connect(MONGO_URI, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  console.log(`MongoDB connected: ${conn.connection.host}`.cyan.bold);
});

module.exports = connectDB;