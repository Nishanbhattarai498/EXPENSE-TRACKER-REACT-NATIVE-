//const express = require('express');
import express from 'express';
import dotenv from 'dotenv';
import { sql } from './config/db.js';

dotenv.config();

const app = express();
app.use(express.json()); // Middleware to parse JSON bodies

//our custom simple middleware to log requests
// app.use((req, res, next) => {
//     console.log("Received request:", req.method);
//     next();
// });


const PORT = process.env.PORT;  

async function initDb() {
   
  try {
    await sql`CREATE TABLE IF NOT EXISTS TRANSACTIONS ( 
        id SERIAL PRIMARY KEY,
        user_id VARCHAR(255) NOT NULL,
        title VARCHAR(255) NOT NULL,
        amount DECIMAL(10, 2) NOT NULL,
        category VARCHAR(100) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`



  console.log('Database connected and TRANSACTIONS table ensured.');

  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);// Exit the application if the database connection fails
  }
}

console.log("My PORT:", process.env.PORT );

app.post('/api/transactions', async (req, res) => {

    try {
        const { user_id, title, amount, category } = req.body;       // Access the parsed JSON body 

        if (!user_id || !title || !amount || !category) {
            return res.status(400).json({ error: 'Missing required fields' });
        }



    } catch (error) {
        console.error('Error creating transaction:', error);
        res.status(500).json({ error: 'Internal server error' });

    }
});

initDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});