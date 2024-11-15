import dotenv from 'dotenv';
dotenv.config();

import pg from 'pg';
import { QueryResult } from 'pg';
const { Pool } = pg;

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: 'localhost',
  database: process.env.DB_NAME,
  port: 5432,
});


const connectToDb = async () => {
  try {
    await pool.connect();
    console.log('Connected to the database.');
  } catch (err) {
    console.error('Error connecting to database:', err);
    process.exit(1);
  }
};

//DATA HANDLING
await connectToDb();
// Function to fetch table data
function fetchTableData(tableName: string): void {
  pool.query('SELECT id, name FROM $1', [tableName], (err: Error, result: QueryResult) => {
    if (err) {
      console.log(err)
      return;
    }
    const { rows } = result;
    console.table(rows);
  });;
}

export { pool, connectToDb, fetchTableData };
