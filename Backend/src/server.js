//const express = require('express');
import express from 'express';
import dotenv from 'dotenv';
import rateLimiter from './middleware/rateLimiter.js';
import transactionRoute from './routes/transactionRoute.js';
import { initDb } from './config/db.js';

dotenv.config();

const app = express();

app.use(rateLimiter);
app.use(express.json()); // Middleware to parse JSON bodies

//our custom simple middleware to log requests
// app.use((req, res, next) => {
//     console.log("Received request:", req.method);
//     next();
// });


const PORT = process.env.PORT;  



app.get("/api/health", (req, res) => {
  res.send('Expense Tracker API is running');
});


app.use("/api/transactions", transactionRoute);

initDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});