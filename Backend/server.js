//const express = require('express');
import express from 'express';
import dotenv from 'dotenv';
import { sql } from './config/db.js';
import rateLimiter from './middleware/rateLimiter.js';

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



app.get("/api/transactions/:userId", async (req, res) => {
    
    try {
         const { userId } = req.params;
        const transactions = await sql`SELECT * FROM TRANSACTIONS WHERE user_id = ${userId}`;
        res.status(200).json(transactions);

    } catch (error) {
      console.error('Error getting transaction:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    
    });


app.post('/api/transactions', async (req, res) => {

    try {
        const { user_id, title, amount, category } = req.body;       // Access the parsed JSON body 

        if (!user_id || !title || !amount || !category) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const transaction = await sql`INSERT INTO TRANSACTIONS (user_id, title, amount, category) 
            VALUES (${user_id}, ${title}, ${amount}, ${category})
            RETURNING *`;

        console.log(transaction[0]);
        res.status(201).json(transaction[0]); // Return the created transaction
                  



    } catch (error) {
        console.error('Error creating transaction:', error);
        res.status(500).json({ error: 'Internal server error' });

    }
});

app.delete('/api/transactions/:id', async (req, res) => {
    try {
        const { id } = req.params;
        if(isNaN(parseInt(id))) {
            return res.status(400).json({ error: 'Invalid transaction ID' });
        }
        await sql`DELETE FROM transactions WHERE id = ${id} RETURNING * `;

        if (result.length === 0) {
            return res.status(404).json({ error: 'Transaction not found' });
        } else {
            res.status(200).json({message: 'Transaction deleted successfully'}) // No content
        }

    } catch (error) {
        console.error('Error deleting transaction:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/api/transactions/summary/:userId', async (req, res) => {
  try{
    const { userId } = req.params;
    const balanceResult = await sql`

      SELECT COALESCE(SUM(amount), 0) AS balance
      FROM transactions
      WHERE user_id = ${userId}
    `
    const incomeResult = await sql`
      SELECT COALESCE(SUM(amount), 0) AS income
      FROM transactions
      WHERE user_id = ${userId} AND amount > 0
    `
    const expenseResult = await sql`  
      SELECT COALESCE(SUM(amount), 0) AS expense
      FROM transactions
      WHERE user_id = ${userId} AND amount < 0    
    `
    res.status(200).json({
      balance: parseFloat(balanceResult[0].balance),
      income: parseFloat(incomeResult[0].income),
      expense: parseFloat(expenseResult[0].expense)
    });

        



  }
  catch (error) {

                    console.error('Error getting the summary:', error);
                     res.status(500).json({ error: 'Internal server error' });




    }});



initDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});