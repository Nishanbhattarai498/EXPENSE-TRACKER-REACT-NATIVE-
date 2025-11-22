import {neon} from "@neondatabase/serverless";
import dotenv from "dotenv";

dotenv.config();

//Creates a sql connection using our database url from .env file
export const sql = neon(process.env.DATABASE_URL);


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
export { initDb };