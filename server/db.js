/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import pkg from "pg";
const { Pool } = pkg;
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 8000;
const DATABASE_URL = process.env.DATABASE_URL;

const pool = new Pool({ connectionString: DATABASE_URL });

export default pool;
