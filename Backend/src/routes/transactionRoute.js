import express from 'express';
import { sql } from '../config/db.js';
import { createTransaction, deleteTransaction, getTransactionByUserId , getTransactionSummary } from '../controllers/transactionsController.js';



const router = express.Router();



router.get("/:userId", getTransactionByUserId);


router.post('/', createTransaction);

router.delete('/:id', deleteTransaction);
router.get('/summary/:userId', getTransactionSummary);







export default router;
