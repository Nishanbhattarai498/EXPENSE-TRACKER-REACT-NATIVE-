import {neon} from "@neondatabase/serverless";
import dotenv from "dotenv";

dotenv.config();

//Creates a sql connection using our database url from .env file
export const sql = neon(process.env.DATABASE_URL);