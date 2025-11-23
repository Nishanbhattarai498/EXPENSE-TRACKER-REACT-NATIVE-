import { sql } from '../config/db.js';



async function  getTransactionByUserId(req, res)  {
    
    try {
         const { userId } = req.params;
        const transactions = await sql`SELECT * FROM TRANSACTIONS WHERE user_id = ${userId}`;
        res.status(200).json(transactions);

    } catch (error) {
      console.error('Error getting transaction:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    
    }
export { getTransactionByUserId };


async function createTransaction (req, res) {
  try {
    const { user_id, title, amount, category } = req.body;       // Access the parsed JSON body 

    console.log('Create transaction request body:', req.body);

    if (!user_id || !title || !amount || !category) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const transaction = await sql`INSERT INTO TRANSACTIONS (user_id, title, amount, category) 
      VALUES (${user_id}, ${title}, ${amount}, ${category})
      RETURNING *`;

    console.log('Transaction created:', transaction[0]);
    res.status(201).json(transaction[0]); // Return the created transaction
  } catch (error) {
    console.error('Error creating transaction:', {
      message: error.message,
      stack: error.stack,
      body: req.body,
    });
    res.status(500).json({ error: 'Internal server error' });
  }
}
export { createTransaction };

async function deleteTransaction (req, res) {
    try {
        const { id } = req.params;
        if(isNaN(parseInt(id))) {
            return res.status(400).json({ error: 'Invalid transaction ID' });
        }
        const result = await sql`DELETE FROM transactions WHERE id = ${id} RETURNING * `;

        if (result.length === 0) {
            return res.status(404).json({ error: 'Transaction not found' });
        } else {
            res.status(200).json({message: 'Transaction deleted successfully'}) // No content
        }

    } catch (error) {
        console.error('Error deleting transaction:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
export { deleteTransaction };

async function getTransactionSummary (req, res)  {
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




    }}
export { getTransactionSummary };